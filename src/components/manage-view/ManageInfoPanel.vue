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
            <el-table-column fixed="right" width="100px">
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
            <el-table-column fixed="right" width="100px">
                <template #default="scope">
                    <!-- <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button> -->
                    <el-button size="small" type="danger"
                        @click="handleDeleteRent(scope.$index, scope.row)">Delete</el-button>
                </template>
            </el-table-column>
        </el-table>

        <h2>求购信息管理</h2>
        <el-table :data="buys" style="width: 100%">
            <el-table-column label="ID" prop="id"></el-table-column>
            <el-table-column label="发布用户ID" prop="userId"></el-table-column>
            <el-table-column label="位置" prop="location"></el-table-column>
            <el-table-column label="装修">
                <template #default="scope">
                    {{ DecorationMap[scope.row.decoration] }}
                </template>
            </el-table-column>
            <el-table-column label="户型" prop="layout"></el-table-column>
            <el-table-column label="朝向">
                <template #default="scope">
                    {{ OrientationMap[scope.row.orientation] }}
                </template>
            </el-table-column>
            <el-table-column label="楼层" prop="floor"></el-table-column>
            <el-table-column label="电梯">
                <template #default="scope">
                    {{ ElevatorMap[scope.row.elevator] }}
                </template>
            </el-table-column>
            <el-table-column label="面积" prop="area"></el-table-column>
            <el-table-column label="预算" prop="budget"></el-table-column>
            <el-table-column label="联系方式" prop="contact"></el-table-column>
            <el-table-column label="描述" prop="description"></el-table-column>
            <el-table-column fixed="right" width="100px">
                <template #default="scope">
                    <!-- <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button> -->
                    <el-button size="small" type="danger"
                        @click="handleDeleteBuy(scope.$index, scope.row)">Delete</el-button>
                </template>
            </el-table-column>
        </el-table>

        <h2>求租信息管理</h2>
        <el-table :data="seeks" style="width: 100%">
            <el-table-column label="ID" prop="id"></el-table-column>
            <el-table-column label="发布用户ID" prop="userId"></el-table-column>

            <el-table-column label="位置" prop="location"></el-table-column>
            <el-table-column label="装修">
                <template #default="scope">
                    {{ DecorationMap[scope.row.decoration] }}
                </template>
            </el-table-column>
            <el-table-column label="户型" prop="layout"></el-table-column>
            <el-table-column label="朝向">
                <template #default="scope">
                    {{ OrientationMap[scope.row.orientation] }}
                </template>
            </el-table-column>
            <el-table-column label="楼层" prop="floor"></el-table-column>
            <el-table-column label="电梯">
                <template #default="scope">
                    {{ ElevatorMap[scope.row.elevator] }}
                </template>
            </el-table-column>
            <el-table-column label="面积" prop="area"></el-table-column>

            <el-table-column label="租房类型">
                <template #default="scope">
                    {{ RentTypeMap[scope.row.type] }}
                </template>
            </el-table-column>
            <el-table-column label="预算" prop="budget"></el-table-column>
            <el-table-column label="租期/月" prop="period"></el-table-column>
            <el-table-column label="要求" prop="requirement"></el-table-column>
            <el-table-column label="联系方式" prop="contact"></el-table-column>
            <el-table-column label="描述" prop="description"></el-table-column>
            <el-table-column fixed="right" width="100px">
                <template #default="scope">
                    <!-- <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button> -->
                    <el-button size="small" type="danger"
                        @click="handleDeleteSeek(scope.$index, scope.row)">Delete</el-button>
                </template>
            </el-table-column>
        </el-table>
        
    </div>
</template>


<script setup lang="ts">
import { deleteBuyInfoById, getAllBuyInfo } from '@/api/buy';
import { RentTypeMap, DecorationMap, OrientationMap, ElevatorMap } from '@/api/model';
import { deleteRentInfoById, getAllRentInfo } from '@/api/rent';
import type { BuyResponse, RentResponse, SeekResponse, SellResponse } from '@/api/response';
import { deleteSeekInfoById, getAllSeekInfo } from '@/api/seek';
import { deleteSellInfoById, getAllSellInfo, getAllSellInfoByUserId } from '@/api/sell';
import { generalError } from '@/mixin';
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

function handleDeleteRent(index: number, row: RentResponse) {
    deleteRentInfoById(row.id).then((res) => {
        ElMessage.success('删除成功')
        getRents()
    }).catch((err) => {
        generalError(err)
    })
}

function handleDeleteBuy(index: number, row: BuyResponse) {
    deleteBuyInfoById(row.id).then((res) => {
        ElMessage.success('删除成功')
        getBuys()
    }).catch((err) => {
        generalError(err)
    })
}

function handleDeleteSeek(index: number, row: SeekResponse) {
    deleteSeekInfoById(row.id).then((res) => {
        ElMessage.success('删除成功')
        getSeeks()
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
    getAllBuyInfo().then((res) => {
        buys.value = res.data.data
    }).catch((err) => {
        generalError(err)
    })
}

function getSeeks() {
    getAllSeekInfo().then((res) => {
        seeks.value = res.data.data
    }).catch((err) => {
        generalError(err)
    })
}

onMounted(() => {
    getSells()
    getRents()
    getBuys()
    getSeeks()
})

</script>


<style scoped lang="scss">
.el-table {
    margin-bottom: 1rem;
}

h2 {
    padding: 1rem 0;
}

h2:first-child {
    padding-top: 0;
}

</style>