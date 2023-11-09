<template>
    <div class="manage-info-panel">
        <h2>出售信息管理</h2>
        <el-table :data="sells" style="width: 100%">
            <el-table-column label="ID" prop="id"></el-table-column>
            <el-table-column label="发布用户ID" prop="userId"></el-table-column>
            <el-table-column label="房产证号" prop="house.houseId"></el-table-column>
            <el-table-column label="价格" prop="price"></el-table-column>
            <el-table-column label="联系方式" prop="contact"></el-table-column>
            <el-table-column label="描述" prop="description"></el-table-column>
            <el-table-column align="right">
                <template #default="scope">
                    <!-- <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button> -->
                    <el-button size="small" type="danger"
                        @click="handleDeleteSell(scope.$index, scope.row)">Delete</el-button>
                </template>
            </el-table-column>
        </el-table>

        <h2>出租信息管理</h2>
        <el-table :data="rents" style="width: 100%">
            <el-table-column label="ID" prop="id"></el-table-column>
            <el-table-column label="发布用户ID" prop="userId"></el-table-column>
            <el-table-column label="房产证号" prop="house.houseId"></el-table-column>
            <el-table-column label="出租类型" prop="type">
                <template #default="scope">
                    {{ RentTypeMap[scope.row.type] }}
                </template>
            </el-table-column>
            <el-table-column label="租金/月" prop="price"></el-table-column>
            <el-table-column label="最短租期/月" prop="minPeriod"></el-table-column>
            <el-table-column label="出租要求" prop="requirement"></el-table-column>
            <el-table-column label="家具家电情况" prop="furniture"></el-table-column>
            <el-table-column label="联系方式" prop="contact"></el-table-column>
            <el-table-column label="描述" prop="description"></el-table-column>
            <el-table-column align="right">
                <template #default="scope">
                    <!-- <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button> -->
                    <el-button size="small" type="danger"
                        @click="handleDeleteRent(scope.$index, scope.row)">Delete</el-button>
                </template>
            </el-table-column>
        </el-table>

        <h2>求购信息管理</h2>
        
    </div>
</template>


<script setup lang="ts">
import { RentTypeMap } from '@/api/model';
import { getAllRentInfo } from '@/api/rent';
import type { BuyResponse, RentResponse, SeekResponse, SellResponse } from '@/api/response';
import { deleteSellInfoById, getAllSellInfo, getAllSellInfoByUserId } from '@/api/sell';
import { generalError } from '@/mixin';
import type { el } from 'element-plus/lib/locale/index.js';
import { useRouter } from 'vue-router';

const router = useRouter()

const userId = computed(() => Number(router.currentRoute.value.params.id))

const rents = ref<Array<RentResponse>>([])
const buys = ref<Array<BuyResponse>>([])
const seeks = ref<Array<SeekResponse>>([])
const sells = ref<Array<SellResponse>>([])


function handleDeleteSell(index: number, row: SellResponse) {
    deleteSellInfoById(row.id).then((res) => {
        ElMessage.success('删除成功')
        getSells()
    }).catch((err) => {
        generalError(err)
    })
}

function getSells() {
    getAllSellInfo().then((res) => {
        sells.value = res.data.data
    }).catch((err) => {
        generalError(err)
    })
}

function getRents() {
    getAllRentInfo().then((res) => {
        rents.value = res.data.data
    }).catch((err) => {
        generalError(err)
    })
}

function getBuys() {
    
}

onMounted(() => {
    getSells()
    getRents()

})

</script>


<style scoped lang="scss"></style>