<template>
    <div class="user-view">
        <!-- 上传头像窗口 -->
        <el-dialog v-model="avatarDialogVisible" title="上传头像" width="50%" :before-close="handleClose">
            <template #tip>
                请选择图片上传：大小180 * 180像素支持JPG、PNG等格式，图片需小于2M
            </template>
            <template #footer>
                <el-upload>
                    <el-button>选择图片</el-button>
                </el-upload>
            </template>
        </el-dialog>

        <!-- 主布局 -->
        <el-row class="row-wrapper">
            <!-- 侧边栏 -->
            <el-col :span="5">
                <el-aside v-if="userId == userStore.id">
                    <el-menu :default-active="asideIndex" @select="(key, path) => { asideIndex = key }">
                        <el-menu-item index="home">
                            <template #title>
                                <el-icon class="material-symbols-outlined" style="font-size: 2rem">
                                    person
                                </el-icon>
                                <span>个人主页</span>
                            </template>
                        </el-menu-item>
                        <el-menu-item index="settings">
                            <template #title>
                                <el-icon class="material-symbols-outlined" style="font-size: 2rem">
                                    settings
                                </el-icon>
                                <span>设置</span>
                            </template>
                        </el-menu-item>
                    </el-menu>
                </el-aside>
            </el-col>

            <el-col :span="14" class="panel">
                <!-- 个人主页 -->
                <div v-show="asideIndex == 'home'">

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
                            <el-input type="textarea" placeholder="请输入个人简介" v-model="userInfoForm.introduction"
                                :maxlength="100" show-word-limit />
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
                                这里应该展示一些东西
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                但是之后再说吧
                            </el-col>
                        </el-row>
                    </div>
                </div>

                <!-- 设置 -->
                <div v-show="asideIndex == 'settings'" class="settings-wrapper">
                    <div class="settings-item-wrapper">
                        <h2>修改密码</h2>
                        <el-form :model="passwordForm" label-width="auto" :rules="passwordRules" ref="passwordFormRef">
    
                            <el-form-item label="旧密码" prop="oldPassword">
                                <el-input placeholder="请输入密码" v-model="passwordForm.oldPassword" show-password required></el-input>
                            </el-form-item>
                            <el-form-item label="新密码" prop="password">
                                <el-input placeholder="请输入密码" v-model="passwordForm.password" show-password required></el-input>
                            </el-form-item>
    
                            <el-form-item label="确认密码" prop="confirmPassword">
                                <el-input placeholder="请确认密码" v-model="passwordForm.confirmPassword" show-password
                                    required></el-input>
                            </el-form-item>
    
                            <div class="submit-button-wrapper">
                                <el-button class="submit-button" @click="handlePasswordSubmit(passwordFormRef)">
                                    修改密码
                                </el-button>
                            </div>
    
                        </el-form>
                    </div>
                    <div class="settings-item-wrapper">
                        <h2>主题色</h2>
                        <div>
                            <span>选择一个主题色：</span>
                            <el-color-picker v-model="accentColorSetting" show-alpha />
                        </div>
                    </div>
                    <div class="settings-item-wrapper no-user-select">
                        <h2>这是什么？</h2>
                        <iframe width="110" height="100" src="https://www.myinstants.com/instant/aughhhhh-aughhhhh-7905/embed/" frameborder="0" scrolling="no"></iframe>
                    </div>
                </div>
            </el-col>

            <el-col :span="5" class="placeholder"></el-col>
        </el-row>
    </div>
</template>


<script setup lang="ts">
import type { UpdatePasswordForm, UpdateUserForm } from '@/api/request';
import { getUser, updatePassword, updateUser } from '@/api/user';
import { useUserStore } from '@/stores/user';
import { httpError, serverError, allRules, normalError } from '@/mixin';
import { useRoute, useRouter } from 'vue-router';
import { ResponseCode } from '@/api/response';
import { defaultValues, type BasicUser, sexName, sexValue } from '@/api/model';
import { routesMap } from '@/router';
import LocationPicker from '@/components/LocationPicker.vue';
import type { FormInstance, FormRules } from 'element-plus';
import { usePublicStore } from '@/stores/public';

const router = useRouter()
const userStore = useUserStore();

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
        await getUser(userId.value).then((res) => {
            if (res.data.code === ResponseCode.SUCCESS) {
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
            if (err.response.data.message)
                serverError(err.response)
            else
                httpError(err.response)
        })
    } catch (err: any) {
        normalError(err)
        router.push(routesMap.notFound)
        return
    }
}

onBeforeMount(async () => {
    await refreshUser()
})

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
                if (err.response.data.message)
                    serverError(err.response)
                else
                    httpError(err.response)
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
    console.log('enter!')
    await refreshUser()
})

// 设置
const asideIndex = ref('home')

//修改密码
const passwordFormRef = ref<FormInstance>()

const passwordForm: UpdatePasswordForm = reactive({
    id: userStore.id,
    phone: userStore.phone,
    oldPassword: '',
    password: '',
    confirmPassword: '',
})

const passwordRules = reactive<FormRules<UpdatePasswordForm>>({
    oldPassword: allRules.password,
    password: [
        { required: true, message: '请输入新密码', trigger: 'blur' },
        { min: 6, max: 20, message: '密码长度应为6-20位', trigger: 'blur' },
        {
            validator: (rule, value, callback) => {
                if (value === passwordForm.oldPassword) {
                    callback(new Error('新密码不能与旧密码相同'));
                } else {
                    callback();
                }
            }, trigger: 'blur'
        }
    ],
    confirmPassword: [
        { required: true, message: '请确认密码', trigger: 'blur' },
        { min: 6, max: 20, message: '密码长度应为6-20位', trigger: 'blur' },
        {
            validator: (rule, value, callback) => {
                if (value !== passwordForm.password) {
                    callback(new Error('两次输入密码不一致'));
                } else {
                    callback();
                }
            }, trigger: 'blur'
        }
    ],
})

async function handlePasswordSubmit(formEl: FormInstance | undefined) {
    if (!formEl) return;

    await formEl.validate((valid, fileds) => {
        if (valid) {
            updatePassword(passwordForm).then((res) => {
                ElMessage.success("修改成功")
            }).catch((err) => {
                if (err.response.data.message)
                    serverError(err.response)
                else
                    httpError(err.response)
            })

        }
    })
}

// 主题色设置
const publicStore = usePublicStore()
const accentColorSetting = ref(publicStore.accentColor)
watch(accentColorSetting, (newVal) => {
    publicStore.setAccentColor(newVal)
})

</script>


<style scoped lang="scss">
.user-view {
    height: 100%;
}

.row-wrapper {
    height: 100%;
}

.panel {
    padding: 2rem;
    background: var(--color-bg-glass);
    backdrop-filter: blur(6px);
}

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

.submit-button-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: end;
    height: 100%;
}

.el-button {
    // --el-button-text-color: var(--color-text-on-glass);
    margin: 1rem;
}

.submit-button {
    margin-top: 2rem;
    width: 80%;
    max-width: 20rem;
    height: 3rem;
    font-size: 1.5rem;
    border: none;
    outline: none;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);

}

.settings-wrapper {
    display: flex;
    flex-direction: column;
}

.settings-item-wrapper {
    padding-bottom: 1rem;
}

h2 {
    border-bottom: 1px solid var(--color-text);
    margin-bottom: 1rem;
}

.material-symbols-outlined {

    font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 24
}
</style>

<style>
.el-form-item__label,
.el-radio__label {
    color: var(--color-text-on-glass)
}
</style>