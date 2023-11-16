<template>
    <div class='info-view'>
        <el-row>
            <el-col :span="2"></el-col>
            <el-col :span="20" class="panel">
                <h1>{{ displayText }}</h1>
                <el-row>
                    <!-- TODO：图片显示 -->
                    <el-col :span="12" v-if="displayImage">
                        <div class="carousel-wrapper">
                            <div style="width: 100%">
                                <el-carousel height="3xl">
                                    <el-carousel-item v-for="item in pics" :key="item">
                                        <el-image :src="item" class="image" fit="contain">
                                            <template #error>
                                                <el-empty description="无图片"></el-empty>
                                            </template>
                                        </el-image>
                                    </el-carousel-item>
                                </el-carousel>
                            </div>
                        </div>
                    </el-col>
                    <!-- 信息显示 -->
                    <el-col :span="displayImage ? 12 : 24">
                        <!-- 编辑对话框 -->
                        <el-dialog :append-to-body=true :model-value="displayDialog" @close="onBeforeDialogClose">
                            <template #header>
                                <h1>编辑信息</h1>
                            </template>
                            <template #default>
                                <component :is="updateForm" :origin="origin" @success="onEditSuccess"></component>
                            </template>

                        </el-dialog>
                        <!-- 求购信息 -->
                        <div v-if="infoType == InfoType.Buy" class="panel">
                            <el-descriptions :column="1" :border="true">
                                <el-descriptions-item label="发布者">
                                    <router-link :to="`/user/${buy?.userId}`">
                                        <el-text type="primary">
                                            {{ publisher?.name }}
                                        </el-text>
                                    </router-link>
                                </el-descriptions-item>
                                <el-descriptions-item label="描述">{{ buy?.description }}</el-descriptions-item>
                                <el-descriptions-item label="预算">{{ buy?.budget }}元</el-descriptions-item>
                                <el-descriptions-item label="联系方式">{{ buy?.contact }}</el-descriptions-item>
                                <el-descriptions-item label="地址">{{ buy?.location }}</el-descriptions-item>
                                <el-descriptions-item label="面积">{{ buy?.area }}</el-descriptions-item>
                                <el-descriptions-item label="装修">
                                    {{ DecorationMap[buy?.decoration ?? Decoration.Unknown] }}
                                </el-descriptions-item>
                                <el-descriptions-item label="电梯">
                                    {{ ElevatorMap[buy?.elevator ?? Elevator.Unknown] }}
                                </el-descriptions-item>
                                <el-descriptions-item label="楼层">{{ buy?.floor }}</el-descriptions-item>
                                <el-descriptions-item label="户型">{{ buy?.layout }}</el-descriptions-item>
                                <el-descriptions-item label="朝向">
                                    {{ OrientationMap[buy?.orientation ?? Orientation.Unknown] }}
                                </el-descriptions-item>
                            </el-descriptions>

                        </div>
                        <!-- 出售信息 -->
                        <div v-if="infoType == InfoType.Sell" class="panel">
                            <el-descriptions :column="1" :border="true">
                                <el-descriptions-item label="发布者">
                                    <router-link :to="`/user/${sell?.userId}`">
                                        <el-text type="primary">
                                            {{ publisher?.name }}
                                        </el-text>
                                    </router-link>
                                </el-descriptions-item>
                                <el-descriptions-item label="描述">{{ sell?.description }}</el-descriptions-item>
                                <el-descriptions-item label="价格">{{ sell?.price }}元</el-descriptions-item>
                                <el-descriptions-item label="联系方式">{{ sell?.contact }}</el-descriptions-item>
                                <el-descriptions-item label="地址">{{ sell?.house.location }}</el-descriptions-item>
                                <el-descriptions-item label="面积">{{ sell?.house.area }}</el-descriptions-item>
                                <el-descriptions-item label="装修">
                                    {{ DecorationMap[sell?.house.decoration ?? Decoration.Unknown] }}
                                </el-descriptions-item>
                                <el-descriptions-item label="电梯">
                                    {{ ElevatorMap[sell?.house.elevator ?? Elevator.Unknown] }}
                                </el-descriptions-item>
                                <el-descriptions-item label="楼层">{{ sell?.house.floor }}</el-descriptions-item>
                                <el-descriptions-item label="户型">{{ sell?.house.layout }}</el-descriptions-item>
                                <el-descriptions-item label="朝向">
                                    {{ OrientationMap[sell?.house.orientation ?? Orientation.Unknown] }}
                                </el-descriptions-item>
                            </el-descriptions>

                        </div>
                        <!-- 出租信息 -->
                        <div v-if="infoType == InfoType.Rent" class="panel">
                            <el-descriptions :column="1" :border="true">
                                <el-descriptions-item label="发布者">
                                    <router-link :to="`/user/${rent?.userId}`">
                                        <el-text type="primary">
                                            {{ publisher?.name }}
                                        </el-text>
                                    </router-link>
                                </el-descriptions-item>
                                <el-descriptions-item label="描述">{{ rent?.description }}</el-descriptions-item>
                                <el-descriptions-item label="联系方式">{{ rent?.contact }}</el-descriptions-item>
                                <el-descriptions-item label="租金">{{ rent?.price }}元/月</el-descriptions-item>
                                <el-descriptions-item label="最短租期">{{ rent?.minPeriod }}个月</el-descriptions-item>
                                <el-descriptions-item label="出租要求">{{ rent?.requirement }}</el-descriptions-item>
                                <el-descriptions-item label="家具家电情况">{{ rent?.furniture }}</el-descriptions-item>

                                <el-descriptions-item label="地址">{{ rent?.house.location }}</el-descriptions-item>
                                <el-descriptions-item label="面积">{{ rent?.house.area }}平方米</el-descriptions-item>
                                <el-descriptions-item label="装修">
                                    {{ DecorationMap[rent?.house.decoration ?? Decoration.Unknown] }}
                                </el-descriptions-item>
                                <el-descriptions-item label="电梯">
                                    {{ ElevatorMap[rent?.house.elevator ?? Elevator.Unknown] }}
                                </el-descriptions-item>
                                <el-descriptions-item label="楼层">{{ rent?.house.floor }}</el-descriptions-item>
                                <el-descriptions-item label="户型">{{ rent?.house.layout }}</el-descriptions-item>
                                <el-descriptions-item label="朝向">
                                    {{ OrientationMap[rent?.house.orientation ?? Orientation.Unknown] }}
                                </el-descriptions-item>
                            </el-descriptions>
                        </div>
                        <!-- 求租信息 -->
                        <div v-if="infoType == InfoType.Seek" class="panel">
                            <el-descriptions :column="1" :border="true">
                                <el-descriptions-item label="发布者">
                                    <router-link :to="`/user/${seek?.userId}`">
                                        <el-text type="primary">
                                            {{ publisher?.name }}
                                        </el-text>
                                    </router-link>
                                </el-descriptions-item>
                                <el-descriptions-item label="描述">{{ seek?.description }}</el-descriptions-item>
                                <el-descriptions-item label="地址">{{ seek?.location }}</el-descriptions-item>
                                <el-descriptions-item label="面积">{{ seek?.area }}平方米</el-descriptions-item>
                                <el-descriptions-item label="装修">
                                    {{ DecorationMap[seek?.decoration ?? Decoration.Unknown] }}
                                </el-descriptions-item>
                                <el-descriptions-item label="电梯">
                                    {{ ElevatorMap[seek?.elevator ?? Elevator.Unknown] }}
                                </el-descriptions-item>
                                <el-descriptions-item label="楼层">{{ seek?.floor }}</el-descriptions-item>
                                <el-descriptions-item label="户型">{{ seek?.layout }}</el-descriptions-item>
                                <el-descriptions-item label="朝向">
                                    {{ OrientationMap[seek?.orientation ?? Orientation.Unknown] }}
                                </el-descriptions-item>
                                <el-descriptions-item label="租房类型">{{ RentTypeMap[seek?.type ?? RentType.Any]
                                }}</el-descriptions-item>
                                <el-descriptions-item label="预算/月">{{ seek?.budget }}</el-descriptions-item>
                                <el-descriptions-item label="租期/月">{{ seek?.period }}</el-descriptions-item>
                                <el-descriptions-item label="其他要求">{{ seek?.requirement }}</el-descriptions-item>
                            </el-descriptions>
                        </div>

                        <div class="button-wrapper" v-if="publisher?.id == userStore.id || userStore.role == Role.Admin">
                            <el-button type="primary" @click="onEditButton">编辑</el-button>
                            <el-popconfirm title="确定要删除吗？" @confirm="onDeleteButton">
                                <template #reference>
                                    <el-button type="danger">删除</el-button>
                                </template>
                            </el-popconfirm>
                        </div>

                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="2"></el-col>
        </el-row>
    </div>
</template>


<script setup lang="ts">
import { deleteBuyInfoById, getBuyInfoById } from '@/api/buy';
import { deleteRentInfoById, getRentInfoById } from '@/api/rent';
import { type SellResponse, type BuyResponse, type RentResponse, type SeekResponse } from '@/api/response';
import { deleteSeekInfoById, getSeekInfoById } from '@/api/seek';
import { deleteSellInfoById, getSellInfoById } from '@/api/sell';
import { generalError } from '@/mixin';
import { useRoute, useRouter } from 'vue-router';
import { getFileUrl } from '@/api/oss';
import { useUserStore } from '@/stores/user';
import type { User } from '@/api/model';
import { getUserById } from '@/api/user';
import { Decoration, DecorationMap, Elevator, ElevatorMap, Orientation, OrientationMap, RentType, RentTypeMap, Role } from '@/api/model';

enum InfoType {
    Sell = 'sell',
    Buy = 'buy',
    Rent = 'rent',
    Seek = 'seek',
}

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()

const infoType = ref<InfoType>()
const displayImage = computed(() => {
    return infoType.value == InfoType.Sell || infoType.value == InfoType.Rent
})
const displayText = computed(() => {
    if (infoType.value == InfoType.Sell) {
        return '出售信息'
    } else if (infoType.value == InfoType.Buy) {
        return '求购信息'
    } else if (infoType.value == InfoType.Rent) {
        return '出租信息'
    } else if (infoType.value == InfoType.Seek) {
        return '求租信息'
    } else {
        return '信息'
    }
})

const sell = ref<SellResponse>();
const buy = ref<BuyResponse>();
const rent = ref<RentResponse>();
const seek = ref<SeekResponse>();
const pics = ref<Array<string>>();
const publisher = ref<User>();

const getSell = async () => {
    await getSellInfoById(Number(route.params.id)).then((res) => {
        sell.value = res.data.data
        pics.value = sell.value.pic
        pics.value = pics.value.map((item) => {
            return getFileUrl(item)
        })
    }).catch((err) => {
        generalError(err)
    })
}

const getBuy = async () => {
    await getBuyInfoById(Number(route.params.id)).then((res) => {
        buy.value = res.data.data
    }).catch((err) => {
        generalError(err)
    })
}

const getRent = async () => {
    await getRentInfoById(Number(route.params.id)).then((res) => {
        rent.value = res.data.data
        pics.value = rent.value.pic
        pics.value = pics.value.map((item) => {
            return getFileUrl(item)
        })
    }).catch((err) => {
        generalError(err)
    })
}

const getSeek = async () => {
    await getSeekInfoById(Number(route.params.id)).then((res) => {
        seek.value = res.data.data
    }).catch((err) => {
        generalError(err)
    })
}

const getPublisher = async (type: InfoType | undefined) => {
    let userId: number | undefined = -1;
    if (type == InfoType.Sell) {
        userId = sell.value?.userId
    } else if (type == InfoType.Buy) {
        userId = buy.value?.userId
    } else if (type == InfoType.Rent) {
        userId = rent.value?.userId
    } else if (type == InfoType.Seek) {
        userId = seek.value?.userId
    }

    if (!userId) {
        generalError('无法获取信息发布者')
        return
    }
    await getUserById(userId).then((res) => {
        publisher.value = res.data.data
    }).catch((err) => {
        generalError(err)
    })

}

onMounted(async () => {
    if (route.name == InfoType.Sell) {
        infoType.value = InfoType.Sell
        await getSell()
    } else if (route.name == InfoType.Buy) {
        infoType.value = InfoType.Buy
        await getBuy()
    } else if (route.name == InfoType.Rent) {
        infoType.value = InfoType.Rent
        await getRent()
    } else if (route.name == InfoType.Seek) {
        infoType.value = InfoType.Seek
        await getSeek()
    } else {
        console.error('info type error')
        router.push('404')
    }
    getPublisher(infoType.value)
})

const displayDialog = ref(false)

function onEditButton() {
    displayDialog.value = true
}

function onDeleteButton() {
    if (infoType.value == InfoType.Sell) {
        deleteSellInfoById(sell.value?.id ?? -1).then((res) => {
            ElMessage.success('删除成功')
            router.push(`/user/${userStore.id}`)
        }).catch((err) => {
            generalError(err)
        })
    } else if (infoType.value == InfoType.Buy) {
        deleteBuyInfoById(buy.value?.id ?? -1).then((res) => {
            ElMessage.success('删除成功')
            router.push(`/user/${userStore.id}`)
        }).catch((err) => {
            generalError(err)
        })
    } else if (infoType.value == InfoType.Rent) {
        deleteRentInfoById(rent.value?.id ?? -1).then((res) => {
            ElMessage.success('删除成功')
            router.push(`/user/${userStore.id}`)
        }).catch((err) => {
            generalError(err)
        })
    } else if (infoType.value == InfoType.Seek) {
        deleteSeekInfoById(seek.value?.id ?? -1).then((res) => {
            ElMessage.success('删除成功')
            router.push(`/user/${userStore.id}`)
        }).catch((err) => {
            generalError(err)
        })
    }

}

function onBeforeDialogClose() {
    displayDialog.value = false
}

import UpdateBuyForm from '@/components/forms/UpdateBuyForm.vue';
import UpdateSellForm from '@/components/forms/UpdateSellForm.vue';
import UpdateRentForm from '@/components/forms/UpdateRentForm.vue';
import UpdateSeekForm from '@/components/forms/UpdateSeekForm.vue';

const updateForm = computed(() => {
    if (infoType.value == InfoType.Sell) {
        return UpdateSellForm
    } else if (infoType.value == InfoType.Buy) {
        return UpdateBuyForm
    } else if (infoType.value == InfoType.Rent) {
        return UpdateRentForm
    } else if (infoType.value == InfoType.Seek) {
        return UpdateSeekForm
    } else {
        return 'sell-form'
    }

})
const origin = computed(() => {
    if (infoType.value == InfoType.Sell) {
        return sell.value
    } else if (infoType.value == InfoType.Buy) {
        return buy.value
    } else if (infoType.value == InfoType.Rent) {
        return rent.value
    } else if (infoType.value == InfoType.Seek) {
        return seek.value
    } else {
        return undefined
    }
})

function onEditSuccess() {
    displayDialog.value = false
    if (infoType.value == InfoType.Sell) {
        getSell()
    } else if (infoType.value == InfoType.Buy) {
        getBuy()
    } else if (infoType.value == InfoType.Rent) {
        getRent()
    } else if (infoType.value == InfoType.Seek) {
        getSeek()
    }
}
</script>


<style scoped lang="scss">
.panel {
    padding: 1rem;
    // background-color: var(--color-bg-glass);
    backdrop-filter: blur(10px);
}

h1 {
    border-bottom: 2px solid var(--el-color-primary);
}

h1:first-child {
    margin-top: 0;
}

h3 {
    padding: 1rem 0;
}

.carousel-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}

.image {
    width: 100%;
    height: 100%;
}

.button-wrapper {
    display: flex;
    justify-content: end;
    margin: 1rem 0;
}
</style>