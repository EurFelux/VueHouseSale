<template>
    <div class="info-panel" v-loading.fullscreen.lock="loading" element-loading-background="transparent">
        <!-- 上传头像窗口 -->
        <el-dialog v-model="avatarDialogVisible" title="上传头像" width="50%" :before-close="handleClose" append-to-body="true">
            <template #tip>
                请选择图片上传：大小180 * 180像素支持JPG、PNG等格式，图片需小于2M
            </template>
            <template #footer>
                <el-upload>
                    <el-button>选择图片</el-button>
                </el-upload>
            </template>
        </el-dialog>

        <el-row>
            <!-- 头像 -->
            <el-col :span="8" class="avatar-wrapper">
                <el-tooltip content="修改头像" placement="top">
                    <el-avatar shape="square" :src="avatar" @click="avatarDialogVisible = true"></el-avatar>
                </el-tooltip>
                <span class="user-id-text">ID: {{ displayedUserInfo.id }}</span>
            </el-col>
            <!-- 用户信息 -->
            <el-col :span="12" class="user-info-wrapper">
                <div class="name-wrapper">
                    <el-text class="user-name">{{ displayedUserInfo.name }}</el-text>
                </div>
                <div>
                    <!-- 性别 -->
                    <span class="material-symbols-outlined user-attribute">
                        {{ sexIcon }}
                    </span>
                    <!-- 年龄 -->
                    <el-text class="user-attribute">{{ displayedUserInfo.age }}岁</el-text>
                    <!-- 地址 -->
                    <el-text class="user-attribute">{{ displayedUserInfo.location }}</el-text>
                    <!-- 身份 -->
                    <el-text class="role-name user-attribute" v-if="displayedUserInfo.role === 1">管理员</el-text>
                </div>
                <div class="user-introduction-wrapper">
                    <!-- 个人简介 -->
                    <el-text class="user-attribute introduction" truncated>{{ displayedUserInfo.introduction
                    }}</el-text>
                </div>

            </el-col>
            <el-col :span="4">
                <div class="edit-button-wrapper">
                    <el-button v-if="userId == userStore.id" @click="editMode = !editMode">
                        修改信息
                    </el-button>
                </div>
            </el-col>
        </el-row>

        <!-- 修改信息 -->
        <el-form v-show="editMode" :model="userInfoForm" label-width="auto" :rules="rules" size="default"
            ref="userInfoFormRef">
            <el-form-item label="用户名" prop="name">
                <el-input placeholder="请输入用户名" v-model="userInfoForm.name" required></el-input>
            </el-form-item>

            <el-form-item label="性别" prop="sex">
                <el-radio-group v-model="userInfoForm.sex">
                    <el-radio :label="sexValue.female">{{ sexName.female }}</el-radio>
                    <el-radio :label="sexValue.male">{{ sexName.male }}</el-radio>
                    <el-radio :label="sexValue.secret">{{ sexName.secret }}</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="年龄" prop="age">
                <el-input-number v-model="userInfoForm.age" :min="1" :max="150"></el-input-number>
            </el-form-item>

            <el-form-item label="地址" prop="locaion">
                <location-picker v-model="userInfoForm.location" />
            </el-form-item>

            <el-form-item label="个人简介" prop="introduction">
                <el-input type="textarea" placeholder="请输入个人简介" v-model="userInfoForm.introduction" :maxlength="100"
                    show-word-limit />
            </el-form-item>

            <div class="submit-button-wrapper">
                <el-button class="submit-button" @click="handleSubmit(userInfoFormRef)">
                    提交
                </el-button>
            </div>
        </el-form>

        <!-- 显示信息 -->
        <div v-show="!editMode">
            <el-row>
                <el-col :span="24">
                    <!-- 展示用户的所有出售信息 -->
                    <h2>出售信息</h2>
                    <div class="sell-info">
                        <el-scrollbar>
                            <div class="cards-wrapper">
                                <el-popover v-for="sell in sells" :key="sell.id" :width="700">
                                    <template #reference>
                                        <base-card v-for="sell in sells" :title="sell.house.location" :description="sell.description"
                                                :image="sell.pic"></base-card>
                                    </template>
                                    <el-descriptions border="true" size="large" title="房屋信息">
                                        <el-descriptions-item label="户型">{{ sell.house.layout }}</el-descriptions-item>
                                        <el-descriptions-item label="面积">{{ sell.house.area }}平方米</el-descriptions-item>
                                        <el-descriptions-item label="朝向">{{ OrientationMap[sell.house.orientation] }}</el-descriptions-item>
                                        <el-descriptions-item label="电梯">{{ ElevatorMap[sell.house.elevator] }}</el-descriptions-item>
                                        <el-descriptions-item label="装修">{{ DecorationMap[sell.house.decoration] }}</el-descriptions-item>
                                        <el-descriptions-item label="楼层">{{ sell.house.floor }}</el-descriptions-item>
                                        <el-descriptions-item label="联系方式">{{ sell.contact }}</el-descriptions-item>
                                    </el-descriptions>
                                </el-popover>
                            </div>
                        </el-scrollbar>
                    </div>
                    <el-scrollbar>
                        <div class="cards-wrapper">
                        </div>
                    </el-scrollbar>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <!-- 出租信息 -->
                    <h2>出租信息</h2>
                    <div class="rent-info">
                        <el-scrollbar>
                            <div class="cards-wrapper">
                                <el-popover v-for="rent in rents" :key="rent.id" :width="700">
                                    <template #reference>
                                        <base-card :title="rent.house.location" :description="rent.description"
                                            :image="rent.pic"></base-card>
                                    </template>
                                    <el-descriptions border="true" size="large" title="房屋要求">
                                        <el-descriptions-item label="户型">{{ rent.house.layout }}</el-descriptions-item>
                                        <el-descriptions-item label="面积">{{ rent.house.area }}平方米</el-descriptions-item>
                                        <el-descriptions-item label="朝向">{{ OrientationMap[rent.house.orientation] }}</el-descriptions-item>
                                        <el-descriptions-item label="电梯">{{ ElevatorMap[rent.house.elevator] }}</el-descriptions-item>
                                        <el-descriptions-item label="装修">{{ DecorationMap[rent.house.decoration] }}</el-descriptions-item>
                                        <el-descriptions-item label="楼层">{{ rent.house.floor }}</el-descriptions-item>
                                        <el-descriptions-item label="家具家电情况">{{ rent.furniture }}</el-descriptions-item>
                                        <el-descriptions-item label="租房方式">{{ RentTypeMap[rent.type] }}</el-descriptions-item>
                                        <el-descriptions-item label="最小租期">{{ rent.minPeriod }}个月</el-descriptions-item>
                                        <el-descriptions-item label="租金/月">{{ rent.price }}元</el-descriptions-item>
                                        <el-descriptions-item label="出租要求">{{ rent.requirement }}元</el-descriptions-item>
                                        <el-descriptions-item label="联系方式">{{ rent.contact }}</el-descriptions-item>
                                    </el-descriptions>
                                </el-popover>
                            </div>
                        </el-scrollbar>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <!-- 求购信息 -->
                    <h2>求购信息</h2>
                    <div class="buy-info">
                        <el-scrollbar>
                            <div class="cards-wrapper">
                                <el-popover v-for="buy in buys" :key="buy.id" :width="600">
                                    <template #reference>
                                        <base-card  :title="buy.location" :description="buy.description"></base-card>
                                    </template>
                                    <el-descriptions border="true" size="large" title="房屋要求">
                                        <el-descriptions-item label="户型">{{ buy.layout }}</el-descriptions-item>
                                        <el-descriptions-item label="面积">{{ buy.area }}平方米</el-descriptions-item>
                                        <el-descriptions-item label="预算">{{ buy.budget }}元</el-descriptions-item>
                                        <el-descriptions-item label="朝向">{{ OrientationMap[buy.orientation] }}</el-descriptions-item>
                                        <el-descriptions-item label="电梯">{{ ElevatorMap[buy.elevator] }}</el-descriptions-item>
                                        <el-descriptions-item label="装修">{{ DecorationMap[buy.decoration] }}</el-descriptions-item>
                                        <el-descriptions-item label="楼层">{{ buy.floor }}</el-descriptions-item>
                                        <el-descriptions-item label="联系方式">{{ buy.contact }}</el-descriptions-item>
                                    </el-descriptions>
                                </el-popover>
                            </div>
                        </el-scrollbar>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <!-- 求租信息 -->
                    <h2>求租信息</h2>
                    <div class="seek-info">
                        <el-scrollbar>
                            <div class="cards-wrapper">
                                <el-popover v-for="seek in seeks" :key="seek.id" :width="700">
                                    <template #reference>
                                        <base-card :title="seek.location"
                                            :description="seek.description"></base-card>
                                    </template>
                                    <el-descriptions border="true" size="large" title="房屋要求">
                                        <el-descriptions-item label="户型">{{ seek.layout }}</el-descriptions-item>
                                        <el-descriptions-item label="面积">{{ seek.area }}平方米</el-descriptions-item>
                                        <el-descriptions-item label="装修">{{ DecorationMap[seek.decoration] }}</el-descriptions-item>
                                        <el-descriptions-item label="朝向">{{ OrientationMap[seek.orientation] }}</el-descriptions-item>
                                        <el-descriptions-item label="电梯">{{ ElevatorMap[seek.elevator] }}</el-descriptions-item>
                                        <el-descriptions-item label="楼层">{{ seek.floor }}</el-descriptions-item>
                                        <el-descriptions-item label="租房方式">{{ RentTypeMap[seek.type] }}</el-descriptions-item>
                                        <el-descriptions-item label="预算">{{ seek.budget }}元</el-descriptions-item>
                                        <el-descriptions-item label="租期">{{ seek.period }}个月</el-descriptions-item>
                                        <el-descriptions-item label="要求">{{ seek.requirement }}</el-descriptions-item>
                                        <el-descriptions-item label="联系方式">{{ seek.contact }}</el-descriptions-item>
                                    </el-descriptions>
                                </el-popover>
                            </div>
                        </el-scrollbar>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>


<script setup lang="ts">
import { getAuditsByUser } from '@/api/audit';
import { getAllBuyInfoByUserId } from '@/api/buy';
import { type BasicUser, defaultValues, sexName, sexValue, OrientationMap, ElevatorMap, DecorationMap, RentTypeMap } from '@/api/model';
import { getAllRentInfoByUserId } from '@/api/rent';
import type { UpdateUserForm } from '@/api/request';
import { ResponseCode, type BuyResponse, type RentResponse, type SeekResponse, type SellResponse } from '@/api/response';
import { getAllSeekInfoByUserId } from '@/api/seek';
import { getAllSellInfoByUserId } from '@/api/sell';
import { getUser, updateUser } from '@/api/user';
import { generalError, allRules } from '@/mixin';
import { routesMap } from '@/router';
import { useUserStore } from '@/stores/user';
import type { FormInstance, FormRules } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';
import BaseCard from '../BaseCard.vue';

const router = useRouter()
const userStore = useUserStore();
const loading = ref(true)

// 获取个人信息
const avatar = computed(() => userStore.avatar)
const userId = computed(() => Number(router.currentRoute.value.params.id))

interface DisplayedUserInfo extends BasicUser {
    id: number;
    avatar: string;
    role: number;
}

const displayedUserInfo: DisplayedUserInfo = reactive({
    id: defaultValues.USER_ID,
    name: defaultValues.USER_NAME,
    avatar: defaultValues.USER_AVATAR,
    sex: defaultValues.USER_SEX,
    age: defaultValues.USER_AGE,
    location: defaultValues.USER_LOCATION,
    introduction: defaultValues.USER_INTRODUCTION,
    role: defaultValues.USER_ROLE,
})

const sexIcon = computed(() => {
    if (displayedUserInfo.sex == 1) {
        return 'male'
    } else if (displayedUserInfo.sex == 0) {
        return 'female'
    } else {
        return 'question_mark'
    }
})

const userInfoForm: UpdateUserForm = reactive({
    id: -1,
    name: '',
    sex: -1,
    age: 0,
    location: '',
    introduction: '',
})

async function refreshUser() {
    try {
        loading.value = true;
        await getUser(userId.value).then((res) => {
            if (res.data.code === ResponseCode.SUCCESS) {
                loading.value = false;
                if (res.data.data.id === userStore.id) {
                    userStore.setName(res.data.data.name || defaultValues.USER_NAME)
                    userStore.setRole(res.data.data.role || defaultValues.USER_ROLE)
                    userStore.setAvatar(res.data.data.avatar || defaultValues.USER_AVATAR)
                    userStore.setPhone(res.data.data.phone || defaultValues.USER_PHONE)
                }

                userInfoForm.id = res.data.data.id
                userInfoForm.name = res.data.data.name
                userInfoForm.sex = res.data.data.sex
                userInfoForm.age = res.data.data.age
                userInfoForm.introduction = res.data.data.introduction || defaultValues.USER_INTRODUCTION
                userInfoForm.location = res.data.data.location || defaultValues.USER_LOCATION

                displayedUserInfo.id = res.data.data.id
                displayedUserInfo.name = res.data.data.name
                displayedUserInfo.avatar = res.data.data.avatar || defaultValues.USER_AVATAR
                displayedUserInfo.sex = res.data.data.sex
                displayedUserInfo.age = res.data.data.age
                displayedUserInfo.introduction = res.data.data.introduction || defaultValues.USER_INTRODUCTION
                displayedUserInfo.location = res.data.data.location || defaultValues.USER_LOCATION
                displayedUserInfo.role = res.data.data.role
            } else {
                console.log(res)
            }
        }).catch((err) => {
            router.push(routesMap.notFound)
            generalError(err)
        })
    } catch (err: any) {
        generalError(err)
        router.push(routesMap.notFound)
        return
    }
}

// 修改信息
const editMode = ref(false)
const userInfoFormRef = ref<FormInstance>()

const rules = reactive<FormRules<UpdateUserForm>>({
    name: allRules.name,
    sex: allRules.sex,
    age: allRules.age,
    location: allRules.location,
    introduction: allRules.introduction
})

async function handleSubmit(formEl: FormInstance | undefined) {
    if (!formEl) return;

    await formEl.validate((valid, fileds) => {
        if (valid) {
            updateUser(userInfoForm).then((res) => {
                ElMessage.success("修改成功")
                editMode.value = false
                refreshUser()
            }).catch((err) => {
                generalError(err)
            })

        }
    })
}


// 修改头像
const avatarDialogVisible = ref(false)

function handleClose() {
    avatarDialogVisible.value = false
}


// 监听路由，刷新数据
const route = useRoute()

watch(() => route.params.id, async () => {
    if (route.params.id)
        await refreshUser()
})

// 获取用户发布的所有信息
const sells = ref<Array<SellResponse>>([])
const rents = ref<Array<RentResponse>>([])
const buys = ref<Array<BuyResponse>>([])
const seeks = ref<Array<SeekResponse>>([])

function getSells() {
    getAllSellInfoByUserId(userId.value).then((res) => {
        sells.value = res.data.data
    }).catch((err) => {
        generalError(err)
    })
}

function getRents() {
    getAllRentInfoByUserId(userId.value).then((res) => {
        rents.value = res.data.data
    }).catch((err) => {
        generalError(err)
    })
}

function getBuys() {
    getAllBuyInfoByUserId(userId.value).then((res) => {
        buys.value = res.data.data
    }).catch((err) => {
        generalError(err)
    })
}

function getSeeks() {
    getAllSeekInfoByUserId(userId.value).then((res) => {
        seeks.value = res.data.data
    }).catch((err) => {
        generalError(err)
    })
}

// 在对话框显示的信息


// 生命周期钩子
onBeforeMount(() => {
    refreshUser()
    getSells()
    getRents()
    getBuys()
    getSeeks()
})
</script>


<style scoped lang="scss">
.avatar-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // height: 100%;

    padding: 1rem;

}

.el-avatar {
    width: auto;
    height: auto;
    max-width: 10rem;

}

.avatar-text {
    position: absolute;
    bottom: 0;
    left: 0;
    opacity: 0;
    width: max-content;
}

.el-avatar:hover {
    transition: all 0.3s;
    box-shadow: 0 0 10px 5px white
}

.name-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;

}

.user-name {
    font-size: 2rem;
}

.user-attribute {
    margin-left: 1rem;
    font-size: 1rem;
    user-select: none;
}

.user-attribute:first-child {
    margin-left: 0;
}

.user-introduction-wrapper {
    flex: 1;
}

.user-info-wrapper {
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: start;
}

.edit-button-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: end;
    height: 100%;
}

.cards-wrapper {
    display: flex;
    flex-direction: row;
    padding: 1rem;
}

.el-scrollbar {
    --el-scrollbar-bg-color: var(--el-color-primary);
    --el-scrollbar-hover-bg-color: var(--el-color-primary);
    --el-scrollbar-opacity: 0.6;
    --el-scrollbar-hover-opacity: 0.9;

}
</style>