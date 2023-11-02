<!-- https://www.jianshu.com/p/83fbf8d17832 -->

<template>
    <div>
        <el-select
            clearable
            v-model="province"
            placeholder="请选择省份"
            style="margin: 0 0.1rem"
        >
            <el-option
                v-for="item in allAreasList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
            ></el-option>
        </el-select>
        <el-select
            clearable
            v-model="city"
            :disabled="!province"
            placeholder="请选择城市"
            style="margin: 0 0.1rem"
        >
            <el-option
                v-for="item in selectCityList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
            ></el-option>
        </el-select>
        <el-select
            clearable
            v-model="area"
            :disabled="!province || !city"
            placeholder="请选择区域"
            style="margin: 0 0.1rem"
        >
            <el-option
                v-for="item in selectAreaList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
            ></el-option>
        </el-select>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import allAreas from '@/assets/pca-code.json'

// 实现v-model
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

//创建一个类型接口
export interface TypeAreas {
    code: string
    name: string
    children?: Array<TypeAreas>
}

export interface TypeArea {
    code: string
    name: string
}
//所有数据
const allAreasList = ref(allAreas)
//下拉框选择省份的值
const province = ref<string>('')
//下拉框选择城市的值
const city = ref<string>('')
//下拉框选择区域的值
const area = ref<string>('')

//城市下拉框内容所有值
const selectCityList = ref<TypeAreas[]>([])

//区域下拉框内容所有值
const selectAreaList = ref<TypeAreas[]>([])

//监听选择省份
watch(
    () => province.value,
    val => {
        if (val) {
            let cities = allAreasList.value.find(
                item => item.code === province.value
            )!.children

            selectCityList.value = cities
        }

        city.value = ''
        area.value = ''
    }
)

//监听选择城市
watch(
    () => city.value,
    val => {
        if (val) {
            let areas = selectCityList.value.find(
                item => item.code === city.value
            )!.children!
            selectAreaList.value = areas
        }
        area.value = ''
    }
)
//监听选择区域
watch(
    () => area.value,
    val => {
        if (val) {
            //下拉框选择省份的值
            let provinceData: TypeArea = {
                code: province.value,
                name:
                    province.value &&
                    allAreasList.value.find(
                        (item) => item.code === province.value
                    )!.name,
            }
            //下拉框选择城市的值
            let cityData: TypeArea = {
                code: city.value,
                name:
                    city.value &&
                    selectCityList.value.find(item => item.code === city.value)!
                        .name,
            }
            //下拉框选择区域的值
            let areaData: TypeArea = {
                code: val,
                name:
                    val &&
                    selectAreaList.value.find(item => item.code === val)!.name,
            }
            // // console.log(provinceData, cityData, areaData)
            // emit('change', {
            //     province: provinceData,
            //     city: cityData,
            //     area: areaData,
            // })
            emit('update:modelValue', `${provinceData.name}${cityData.name}${areaData.name}`)
        }
    }
)
</script>

<style lang="scss" scoped></style>