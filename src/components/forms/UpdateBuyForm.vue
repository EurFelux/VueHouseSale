<template>
    <el-form>
        <div class="form-wrapper">
            <el-form :model="updateBuyForm" label-width="auto" :rules="rules" ref="buyFormRef">

                <h2>房屋要求</h2>

                <!-- 位置 -->
                <el-form-item label="位置" prop="location">
                    <el-input v-model="updateBuyForm.location" placeholder="请输入位置"></el-input>
                </el-form-item>

                <!-- 面积 -->
                <el-form-item label="面积" prop="area">
                    <el-input type="number" v-model.number="updateBuyForm.area" placeholder="请输入面积"></el-input>
                </el-form-item>

                <!-- 楼层 -->
                <el-form-item label="楼层" prop="floor">
                    <el-input type="text" v-model="updateBuyForm.floor" placeholder="请输入楼层"></el-input>
                </el-form-item>

                <!-- 装修 -->
                <el-form-item label="装修" prop="decoration">
                    <el-radio-group v-model="updateBuyForm.decoration">
                        <el-radio-button :label="Decoration.Any">不限</el-radio-button>
                        <el-radio-button :label="Decoration.Simple">简装</el-radio-button>
                        <el-radio-button :label="Decoration.Fine">精装</el-radio-button>
                    </el-radio-group>
                </el-form-item>

                <!-- 户型 -->
                <el-form-item label="户型" prop="layout">
                    <el-input type="text" v-model="updateBuyForm.layout" placeholder="请输入户型"></el-input>
                </el-form-item>

                <!-- 朝向 -->
                <el-form-item label="朝向" prop="orientation">
                    <el-select v-model="updateBuyForm.orientation" placeholder="请选择朝向">
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
                    <el-radio-group v-model="updateBuyForm.elevator">
                        <el-radio-button :label="Elevator.Any">不限</el-radio-button>
                        <el-radio-button :label="Elevator.Yes">有</el-radio-button>
                        <el-radio-button :label="Elevator.No">无</el-radio-button>
                    </el-radio-group>
                </el-form-item>

                <!-- 描述 -->
                <el-form-item label="描述" prop="description">
                    <el-input type="textarea" v-model="updateBuyForm.description" placeholder="请输入描述"></el-input>
                </el-form-item>
                
                <!-- 预算 -->
                <el-form-item label="预算" prop="budget">
                    <el-input type="number" v-model.number="updateBuyForm.budget" placeholder="请输入预算"></el-input>
                </el-form-item>

                <!-- 联系方式 -->
                <el-form-item label="联系方式" prop="contact">
                    <el-input type="text" v-model="updateBuyForm.contact" placeholder="请输入联系方式"></el-input>
                </el-form-item>
            </el-form>
            <div class="button-wrapper">
                <el-button class="submit-button" round @click="submitUpdate(buyFormRef)">提交</el-button>
                <el-button @click="console.log(updateBuyForm)" v-if="publicStore.debug">show form</el-button>
            </div>
        </div>
    </el-form>
</template>


<script setup lang="ts">
import { getAuditedAuditsByUser } from '@/api/audit';
import { addBuy, updateBuyInfoById } from '@/api/buy';
import { type House, RentType, type Buy, Decoration, Orientation, Elevator } from '@/api/model';
import { addRent } from '@/api/rent';
import type { BuyForm, RentForm, SellForm, UpdateBuyForm } from '@/api/request';
import { allRules, generalError } from '@/mixin';
import { usePublicStore } from '@/stores/public';
import { useUserStore } from '@/stores/user';
import type { FormInstance, FormRules } from 'element-plus';


const publicStore = usePublicStore()
const userStore = useUserStore()
const props = defineProps({
    origin: {
        type: Object,
    }
})
const emit = defineEmits(['success'])


// 提交表单
const buyFormRef = ref<FormInstance>()

const updateBuyForm = reactive<UpdateBuyForm>({
    id: props.origin?.id ?? -1,
    description: props.origin?.description ?? '',
    budget: props.origin?.budget ?? 0,
    contact: props.origin?.contact ?? userStore.phone,

    // BasicHouse
    location: props.origin?.location ?? '',
    area: props.origin?.area ?? 0,
    floor: props.origin?.floor ?? '1F',
    decoration: props.origin?.decoration ?? Decoration.Any,
    layout: props.origin?.layout ?? '',
    orientation: props.origin?.orientation ?? Orientation.Any,
    elevator: props.origin?.elevator ?? Elevator.Any
})

const rules = reactive<FormRules<UpdateBuyForm>>({
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

function resetForm() {
    updateBuyForm.description = ''
    updateBuyForm.budget = 0
    updateBuyForm.contact = userStore.phone

    updateBuyForm.location = ''
    updateBuyForm.area = 0
    updateBuyForm.floor = '1F'
    updateBuyForm.decoration = Decoration.Any
    updateBuyForm.layout = ''
    updateBuyForm.orientation = Orientation.Any
    updateBuyForm.elevator = Elevator.Any
    
}

async function submitUpdate(formEl: FormInstance | undefined) {

    if (!formEl) return;

    await formEl.validate(async (valid, fileds) => {
        if (valid) {
            await updateBuyInfoById(updateBuyForm).then((res) => {
                ElMessage.success('发布成功')
                resetForm()
                emit('success')
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