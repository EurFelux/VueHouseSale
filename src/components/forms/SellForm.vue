<template>
    <el-form>
        <div class="form-wrapper">
            <el-form :model="sellForm" label-width="auto" :rules="rules" ref="sellFormRef">
                <!-- 选择房产 -->
                <el-form-item label="选择房产" prop="house.houseId">
                    <el-select v-model="sellForm.house" value-key="houseId" placeholder="请选择房产">
                        <el-option v-for="house in houses" :key="house.houseId" :label="house.location"
                            :value="house"></el-option>
                    </el-select>
                </el-form-item>
                <!-- 房屋图片 -->
                <el-form-item label="房屋图片" prop="pic">
                    <el-upload v-model:file-list="fileList"
                        :on-change="handleChange"
                        :on-success="handleSuccess"
                        :http-request="uploadImage"
                        list-type="picture"
                        multiple
                        >
                        <el-button type="primary">上传图片</el-button>
                        <template #tip>
                            <div class="el-upload__tip">
                                <p>
                                    jpg/png files with a size less than 3MB
                                </p>
                                <p>最多上传9张图片</p>
                            </div>
                        </template>
                    </el-upload>
                </el-form-item>
                <!-- 描述 -->
                <el-form-item label="描述" prop="description">
                    <el-input type="textarea" v-model="sellForm.description" placeholder="请输入描述"></el-input>
                </el-form-item>
                <!-- 价格 -->
                <el-form-item label="价格" prop="price">
                    <el-input type="number" v-model.number="sellForm.price" placeholder="请输入价格"></el-input>
                </el-form-item>
                <!-- 联系方式 -->
                <el-form-item label="联系方式" prop="contact">
                    <el-input type="text" v-model="sellForm.contact" placeholder="请输入联系方式"></el-input>
                </el-form-item>
            </el-form>
            <div class="button-wrapper">
                <el-button class="submit-button" round @click="submitSell(sellFormRef)">提交</el-button>
                <el-button @click="console.log(sellForm)" v-if="publicStore.debug">show form</el-button>
            </div>
        </div>
    </el-form>
</template>


<script setup lang="ts">
import { getAuditedAuditsByUser } from '@/api/audit';
import { OwnershipType, Decoration, Elevator, Orientation, type House } from '@/api/model';
import type { SellForm } from '@/api/request';
import { addSellInfo } from '@/api/sell';
import { allRules, generalError } from '@/mixin';
import { useUserStore } from '@/stores/user';
import type { FormInstance, FormRules, UploadProps, UploadRequestOptions, UploadUserFile } from 'element-plus';
import { usePublicStore } from '@/stores/public';

const publicStore = usePublicStore()
const userStore = useUserStore()

// 获取数据
const houses = ref<House[]>([])

function getHouses() {
    getAuditedAuditsByUser(userStore.id).then((res) => {
        houses.value = res.data.data.map((audit) => {
            return audit.house
        })
        sellForm.house = houses?.value[0]
    }).catch((err) => {
        generalError(err)
    })
}

onMounted(() => {
    getHouses()
})

// 上传图片
import { uploadFile } from '@/api/oss';
const fileList = ref<UploadUserFile[]>([])

const handleSuccess = (response: any, uploadFile: UploadUserFile, uploadFiles: UploadUserFile[]) => {
    sellForm.pic += response.name + ';'
}

const uploadImage = async (options: UploadRequestOptions) => {
    return uploadFile(options.file)
}

const handleChange: UploadProps['onChange'] = (uploadFile, uploadFiles) => {
    if (fileList.value.length > 9)
        fileList.value = fileList.value.slice(-9)
}


// 提交表单
const sellFormRef = ref<FormInstance>()

const sellForm = reactive<SellForm>({
    userId: 0,
    description: '',
    price: 0,
    pic: '',
    contact: userStore.phone,
    house: {
        houseId: "000000000",
        ownershipType: OwnershipType.Public,
        location: '',
        area: 0,
        decoration: Decoration.Any,
        floor: '1F',
        elevator: Elevator.Any,
        orientation: Orientation.East,
        layout: '',
    },
})

const rules = reactive<FormRules<SellForm>>({
    description: allRules.description,
    price: allRules.price,
    contact: allRules.phone,

})

function resetSellForm() {
    sellForm.pic = ''
    sellForm.house = houses?.value[0]
}

async function submitSell(formEl: FormInstance | undefined) {

    if (!formEl) return;

    sellForm.userId = userStore.id
    await formEl.validate(async (valid, fileds) => {
        if (valid) {
            await addSellInfo(sellForm).then((res) => {
                ElMessage.success('提交成功')
                resetSellForm()
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