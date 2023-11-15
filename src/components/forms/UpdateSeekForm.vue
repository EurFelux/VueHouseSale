<template>
    <el-form>
        <div class="form-wrapper">
            <el-form :model="seekForm" label-width="auto" :rules="rules" ref="seekFormRef">

                <h2>租房要求</h2>

                <!-- 位置 -->
                <el-form-item label="地址" prop="location">
                    <el-input v-model="seekForm.location" placeholder="请输入地址"></el-input>
                </el-form-item>

                <!-- 面积 -->
                <el-form-item label="面积" prop="area">
                    <el-input type="number" v-model.number="seekForm.area" placeholder="请输入面积（平方米）"></el-input>
                </el-form-item>

                <!-- 楼层 -->
                <el-form-item label="楼层" prop="floor">
                    <el-input type="text" v-model="seekForm.floor" placeholder="请输入楼层"></el-input>
                </el-form-item>

                <!-- 装修 -->
                <el-form-item label="装修" prop="decoration">
                    <el-radio-group v-model="seekForm.decoration">
                        <el-radio-button :label="Decoration.Any">不限</el-radio-button>
                        <el-radio-button :label="Decoration.Simple">简装</el-radio-button>
                        <el-radio-button :label="Decoration.Fine">精装</el-radio-button>
                    </el-radio-group>
                </el-form-item>

                <!-- 户型 -->
                <el-form-item label="户型" prop="layout">
                    <el-input type="text" v-model="seekForm.layout" placeholder="请输入户型"></el-input>
                </el-form-item>

                <!-- 朝向 -->
                <el-form-item label="朝向" prop="orientation">
                    <el-select v-model="seekForm.orientation" placeholder="请选择朝向">
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
                    <el-radio-group v-model="seekForm.elevator">
                        <el-radio-button :label="Elevator.Any">不限</el-radio-button>
                        <el-radio-button :label="Elevator.Yes">有</el-radio-button>
                        <el-radio-button :label="Elevator.No">无</el-radio-button>
                    </el-radio-group>
                </el-form-item>

                <!-- 租房要求 -->
                <el-form-item label="其他要求" prop="requirement">
                    <el-input type="textarea" v-model="seekForm.requirement" placeholder="请输入其他要求"></el-input>
                </el-form-item>

                <h2>租房信息</h2>

                <!-- 租金 -->
                <el-form-item label="租金/月" prop="budget">
                    <el-input type="number" v-model.number="seekForm.budget" placeholder="请输入租金"></el-input>
                </el-form-item>

                <!-- 租期 -->
                <el-form-item label="租期/月" prop="period">
                    <el-input type="number" v-model.number="seekForm.period" placeholder="请输入租期"></el-input>
                </el-form-item>

                <!-- 租房类型 -->
                <el-form-item label="租房类型" prop="type">
                    <el-radio-group v-model="seekForm.type">
                        <el-radio-button :label="RentType.Any">不限</el-radio-button>
                        <el-radio-button :label="RentType.Entire">整租</el-radio-button>
                        <el-radio-button :label="RentType.Joint">合租</el-radio-button>
                    </el-radio-group>
                </el-form-item>

                <!-- 描述 -->
                <el-form-item label="描述" prop="description">
                    <el-input type="textarea" v-model="seekForm.description" placeholder="请输入描述"></el-input>
                </el-form-item>

                <!-- 联系方式 -->
                <el-form-item label="联系方式" prop="contact">
                    <el-input type="text" v-model="seekForm.contact" placeholder="请输入联系方式（手机号）"></el-input>
                </el-form-item>
            </el-form>
            <div class="button-wrapper">
                <el-button class="submit-button" round @click="submitSeek(seekFormRef)">提交</el-button>
                <el-button @click="console.log(seekForm)" v-if="publicStore.debug">show form</el-button>
            </div>
        </div>
    </el-form>
</template>


<script setup lang="ts">


import { Decoration, Elevator, Orientation, RentType } from '@/api/model';
import type { SeekForm, UpdateSeekForm } from '@/api/request';
import { addSeek, updateSeekInfo } from '@/api/seek';
import { allRules, generalError } from '@/mixin';
import { usePublicStore } from '@/stores/public';
import { useUserStore } from '@/stores/user';
import type { FormInstance, FormRules } from 'element-plus';


const userStore = useUserStore()
const publicStore = usePublicStore()
const props = defineProps({
    origin: {
        type: Object,
    }
})
const emit = defineEmits(['success'])

// 提交表单
const seekFormRef = ref<FormInstance>()

const seekForm = reactive<UpdateSeekForm>({
    id: props.origin?.id ?? -1,
    description: props.origin?.description ?? '',
    budget: props.origin?.budget ?? 0,
    contact: props.origin?.contact ?? userStore.phone,
    type: props.origin?.type ?? RentType.Any,
    period: props.origin?.period ?? 0,
    requirement: props.origin?.requirement ?? '',

    // BasicHouse
    location: props.origin?.location ?? '',
    area: props.origin?.area ?? 0,
    floor: props.origin?.floor ?? '1F',
    decoration: props.origin?.decoration ?? Decoration.Any,
    layout: props.origin?.layout ?? '',
    orientation: props.origin?.orientation ?? Orientation.Any,
    elevator: props.origin?.elevator ?? Elevator.Any,
})

const rules = reactive<FormRules<UpdateSeekForm>>({
    description: allRules.description,
    budget: allRules.budget,
    type: allRules.rentType,
    contact: allRules.phone,

    location: allRules.houseLocation,
    area: allRules.area,
    floor: allRules.floor,
    decoration: allRules.decoration,
    layout: allRules.layout,
    orientation: allRules.orientation,
    elevator: allRules.elevator
})

function resetSeekForm() {
    seekForm.description = ''
    seekForm.budget = 0
    seekForm.type = RentType.Any
    seekForm.contact = ''

    seekForm.location = ''
    seekForm.area = 0
    seekForm.floor = '1F'
    seekForm.decoration = Decoration.Any
    seekForm.layout = ''
    seekForm.orientation = Orientation.Any
    seekForm.elevator = Elevator.Any

    
}

async function submitSeek(formEl: FormInstance | undefined) {

    if (!formEl) return;

    await formEl.validate(async (valid, fileds) => {
        if (valid) {
            await updateSeekInfo(seekForm).then((res) => {
                ElMessage.success('发布成功')
                resetSeekForm()
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