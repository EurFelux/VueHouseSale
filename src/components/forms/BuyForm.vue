<template>
    <el-form>
        <div class="form-wrapper">
            <el-form :model="buyForm" label-width="auto" :rules="rules" ref="buyFormRef">

                <h2>房屋要求</h2>

                <!-- 位置 -->
                <el-form-item label="位置" prop="location">
                    <el-input v-model="buyForm.location" placeholder="请输入位置"></el-input>
                </el-form-item>

                <!-- 面积 -->
                <el-form-item label="面积" prop="area">
                    <el-input type="number" v-model.number="buyForm.area" placeholder="请输入面积"></el-input>
                </el-form-item>

                <!-- 楼层 -->
                <el-form-item label="楼层" prop="floor">
                    <el-input type="text" v-model="buyForm.floor" placeholder="请输入楼层"></el-input>
                </el-form-item>

                <!-- 装修 -->
                <el-form-item label="装修" prop="decoration">
                    <el-radio-group v-model="buyForm.decoration">
                        <el-radio-button :label="Decoration.Any">不限</el-radio-button>
                        <el-radio-button :label="Decoration.Simple">简装</el-radio-button>
                        <el-radio-button :label="Decoration.Fine">精装</el-radio-button>
                    </el-radio-group>
                </el-form-item>

                <!-- 户型 -->
                <el-form-item label="户型" prop="layout">
                    <el-input type="text" v-model="buyForm.layout" placeholder="请输入户型"></el-input>
                </el-form-item>

                <!-- 朝向 -->
                <el-form-item label="朝向" prop="orientation">
                    <el-select v-model="buyForm.orientation" placeholder="请选择朝向">
                        <el-option label="不限" :value="Orientation.Any"></el-option>
                        <el-option label="东" :value="Orientation.East"></el-option>
                        <el-option label="南" :value="Orientation.South"></el-option>
                        <el-option label="西" :value="Orientation.West"></el-option>
                        <el-option label="北" :value="Orientation.North"></el-option>
                        <el-option label="东南" :value="Orientation.EastSouth"></el-option>
                        <el-option label="东北" :value="Orientation.EastNorth"></el-option>
                        <el-option label="西南" :value="Orientation.WestSouth"></el-option>
                        <el-option label="西北" :value="Orientation.WestNorth"></el-option>
                    </el-select>
                </el-form-item>

                <!-- 电梯 -->
                <el-form-item label="电梯" prop="elevator">
                    <el-radio-group v-model="buyForm.elevator">
                        <el-radio-button :label="Elevator.Any">不限</el-radio-button>
                        <el-radio-button :label="Elevator.Yes">有</el-radio-button>
                        <el-radio-button :label="Elevator.No">无</el-radio-button>
                    </el-radio-group>
                </el-form-item>

                <!-- 描述 -->
                <el-form-item label="描述" prop="description">
                    <el-input type="textarea" v-model="buyForm.description" placeholder="请输入描述"></el-input>
                </el-form-item>
                
                <!-- 预算 -->
                <el-form-item label="预算" prop="budget">
                    <el-input type="number" v-model.number="buyForm.budget" placeholder="请输入预算"></el-input>
                </el-form-item>

                <!-- 联系方式 -->
                <el-form-item label="联系方式" prop="contact">
                    <el-input type="text" v-model="buyForm.contact" placeholder="请输入联系方式"></el-input>
                </el-form-item>
            </el-form>
            <div class="button-wrapper">
                <el-button class="submit-button" round @click="submitBuy(buyFormRef)">提交</el-button>
                <el-button @click="console.log(buyForm)" v-if="publicStore.debug">show form</el-button>
            </div>
        </div>
    </el-form>
</template>


<script setup lang="ts">
import { getAuditedAuditsByUser } from '@/api/audit';
import { addBuy } from '@/api/buy';
import { type House, RentType, type Buy, Decoration, Orientation, Elevator } from '@/api/model';
import { addRent } from '@/api/rent';
import type { BuyForm, RentForm, SellForm } from '@/api/request';
import { allRules, generalError } from '@/mixin';
import { usePublicStore } from '@/stores/public';
import { useUserStore } from '@/stores/user';
import type { FormInstance, FormRules } from 'element-plus';

const publicStore = usePublicStore()
const userStore = useUserStore()


// 提交表单
const buyFormRef = ref<FormInstance>()

const buyForm = reactive<BuyForm>({
    userId: userStore.id,
    description: '',
    budget: 0,
    contact: userStore.phone,

    // BasicHouse
    location: '',
    area: 0,
    floor: '1F',
    decoration: Decoration.Any,
    layout: '',
    orientation: Orientation.Any,
    elevator: Elevator.Any
})

const rules = reactive<FormRules<BuyForm>>({
    description: allRules.description,
    budget: allRules.budget,
    contact: allRules.phone,

    location: allRules.houseLocation,
    area: allRules.area,
    floor: allRules.floor,
    decoration: allRules.decoration,
    layout: allRules.layout,
    orientation: allRules.orientation,
    elevator: allRules.elevator
})

function resetBuyForm() {
    buyForm.description = ''
    buyForm.budget = 0
    buyForm.contact = userStore.phone

    buyForm.location = ''
    buyForm.area = 0
    buyForm.floor = '1F'
    buyForm.decoration = Decoration.Any
    buyForm.layout = ''
    buyForm.orientation = Orientation.Any
    buyForm.elevator = Elevator.Any
    
}

async function submitBuy(formEl: FormInstance | undefined) {

    if (!formEl) return;

    buyForm.userId = userStore.id
    await formEl.validate(async (valid, fileds) => {
        if (valid) {
            await addBuy(buyForm).then((res) => {
                ElMessage.success('发布成功')
                resetBuyForm()
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