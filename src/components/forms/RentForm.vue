<template>
    <el-form>
        <div class="form-wrapper">
            <el-form :model="rentForm" label-width="auto" :rules="rules" ref="rentFormRef">
                <!-- 选择房产 -->
                <el-form-item label="选择房产" prop="house.houseId">
                    <el-select v-model="rentForm.house" placeholder="请选择房产">
                        <el-option
                            v-for="house in houses"
                            :key="house.houseId"
                            :label="house.location"
                            :value="house"
                        ></el-option>
                    </el-select>
                </el-form-item>

                <!-- 租房类型 -->
                <el-form-item label="租房类型" prop="rentType">
                    <el-radio-group v-model="rentForm.type">
                        <el-radio-button :label="RentType.Any">不限</el-radio-button>
                        <el-radio-button :label="RentType.Entire">整租</el-radio-button>
                        <el-radio-button :label="RentType.Joint">合租</el-radio-button>
                    </el-radio-group>
                </el-form-item>

                <!-- 房屋图片 -->
                <el-form-item label="房屋图片" prop="pic">
                    haha还没做呢
                </el-form-item>

                <!-- 最短租期 -->
                <el-form-item label="最短租期/月" prop="minPeriod">
                    <el-input
                        type="number"
                        v-model.number="rentForm.minPeriod"
                        placeholder="请输入最短租期"
                    ></el-input>
                </el-form-item>

                <!-- 家具 -->
                <el-form-item label="家具家电情况" prop="furniture">
                    <el-input
                        type="text"
                        v-model="rentForm.furniture"
                        placeholder="请输入家具家电情况"
                    ></el-input>
                </el-form-item>

                <!-- 租客要求 -->
                <el-form-item label="租客要求" prop="requirement">
                    <el-input
                        type="text"
                        v-model="rentForm.requirement"
                        placeholder="请输入对租客的要求"
                    ></el-input>
                </el-form-item>



                <!-- 描述 -->
                <el-form-item label="描述" prop="description">
                    <el-input
                        type="textarea"
                        v-model="rentForm.description"
                        placeholder="请输入描述"
                    ></el-input>
                </el-form-item>
                <!-- 价格 -->
                <el-form-item label="价格" prop="price">
                    <el-input
                        type="number"
                        v-model.number="rentForm.price"
                        placeholder="请输入价格"
                    ></el-input>
                </el-form-item>
                <!-- 联系方式 -->
                <el-form-item label="联系方式" prop="contact">
                    <el-input
                        type="text"
                        v-model="rentForm.contact"
                        placeholder="请输入联系方式"
                    ></el-input>
                </el-form-item>
            </el-form>
            <div class="button-wrapper">
                <el-button class="submit-button" round @click="submitRent(rentFormRef)">提交</el-button>
                <el-button @click="console.log(rentForm)">show form</el-button>
            </div>
        </div>
    </el-form>
</template>


<script setup lang="ts">
import { getAuditedAuditsByUser } from '@/api/audit';
import { type House, RentType } from '@/api/model';
import { addRent } from '@/api/rent';
import type { RentForm, SellForm } from '@/api/request';
import { allRules, generalError } from '@/mixin';
import { useUserStore } from '@/stores/user';
import type { FormInstance, FormRules } from 'element-plus';


const userStore = useUserStore()

// 获取数据
const houses = ref<House[]>([])

function getHouses() {
    getAuditedAuditsByUser(userStore.id).then((res) => {
        houses.value = res.data.data.map((audit) => {
            return audit.house
        })
        rentForm.house = houses?.value[0]
    }).catch((err) => {
        generalError(err)
    })
}

onMounted(() => {
    getHouses()
})


// 提交表单
const rentFormRef = ref<FormInstance>()

const rentForm = reactive<RentForm>({
    userId: userStore.id,
    house: houses?.value[0],
    type: RentType.Any,
    description: '',
    price: 0,
    contact: userStore.phone,
    minPeriod: 0,
    furniture: '',
    requirement: '',
    pic: '',
})

const rules = reactive<FormRules<RentForm>>({
    description: allRules.description,
    price: allRules.price,
    contact: allRules.phone,
    minPeriod: allRules.minPeriod,
    furniture: allRules.furniture,
    type: allRules.rentType,
    

    
})

function resetRentForm() {
    rentForm.pic = ''
    rentForm.house = houses?.value[0]
}

async function submitRent(formEl: FormInstance | undefined) {

    if (!formEl) return;

    rentForm.userId = userStore.id
    await formEl.validate((valid, fileds) => {
        if (valid) {
            addRent(rentForm).then((res) => {
                ElMessage.success('提交成功')
                resetRentForm()
            }).catch((err) => {
                generalError(err)
            })
        }
    })
}
</script>


<style scoped lang="scss">
.button-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 1rem;

}
</style>