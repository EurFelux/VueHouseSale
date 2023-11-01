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
            <el-col :span="5"></el-col>
            <el-col :span="14" class="plane">
                <el-row>
                    <el-col :span="8" class="avatar-wrapper">
                        <el-tooltip content="修改头像" placement="top">
                            <el-avatar shape="square" :src="avatar" @click="avatarDialogVisible = true"></el-avatar>
                        </el-tooltip>

                    </el-col>
                    <el-col :span="4"></el-col>
                    <el-col :span="8">
                        <div class="name-wrapper">
                            <el-text class="user-name">{{ userStore.name }}</el-text>
                            <el-text class="role-name text-up" v-if="userStore.role === 1">管理员</el-text>
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
                            <el-radio :label=0>女</el-radio>
                            <el-radio :label=1>男</el-radio>
                            <el-radio :label=2>保密</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="年龄" prop="age">
                        <el-input-number v-model="userInfoForm.age" :min="1" :max="150"></el-input-number>
                    </el-form-item>

                    <el-form-item label="地址" prop="locaion">
                        <location-picker v-model="userInfoForm.location" />
                    </el-form-item>

                    <el-form-item label="个人简介" prop="introduction">
                        <el-input type="textarea" placeholder="请输入个人简介" v-model="userInfoForm.introduction" />
                    </el-form-item>

                    <div class="submit-button-wrapper">
                        <el-button class="submit-button" @click="handleSubmit">
                            提交
                        </el-button>
                    </div>
                </el-form>

                <!-- 显示信息 -->
                <div v-show="!editMode">
                    <el-row>
                        <el-col :span="24">
                            <label>ID:</label>
                            <span>{{ displayedUserInfo.id }}</span>
                        </el-col>
                    </el-row>
                </div>
            </el-col>

            <el-col :span="5" class="placeholder"></el-col>
        </el-row>
    </div>
</template>


<script setup lang="ts">
import type { UpdateUserForm } from '@/api/request';
import { getUser, updateUser } from '@/api/user';
import { useUserStore } from '@/stores/user';
import { httpError, serverError, defaultAvatar, allRules } from '@/mixin';
import { useRouter } from 'vue-router';
import { ResponseCode } from '@/api/response';
import type { BasicUser } from '@/api/model';
import { routesMap } from '@/router';
import LocationPicker from '@/components/LocationPicker.vue';
import type { FormInstance, FormRules } from 'element-plus';

const router = useRouter()
const userStore = useUserStore();

// 获取个人信息
const avatar = computed(() => userStore.avatar)
const userId = router.currentRoute.value.params.id as unknown as number
console.log('userId', userId)

interface DisplayedUserInfo extends BasicUser {
    id: number;
    avatar: string;
    role: number;
}

const displayedUserInfo: DisplayedUserInfo = reactive({
    id: -1,
    name: '',
    avatar: '',
    sex: -1,
    age: 0,
    location: '',
    introduction: '',
    role: -1,
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
    await getUser(userId).then((res) => {
        if (res.data.code === ResponseCode.SUCCESS) {
            if (res.data.data.id === userStore.id) {
                userStore.setName(res.data.data.name)
                userStore.setRole(res.data.data.role)
                userStore.setAvatar(res.data.data.avatar || defaultAvatar)
            }

            userInfoForm.id = res.data.data.id
            userInfoForm.name = res.data.data.name
            userInfoForm.sex = res.data.data.sex
            userInfoForm.age = res.data.data.age
            userInfoForm.introduction = res.data.data.introduction
            userInfoForm.location = res.data.data.location

            displayedUserInfo.id = res.data.data.id
            displayedUserInfo.name = res.data.data.name
            displayedUserInfo.avatar = res.data.data.avatar || defaultAvatar
            displayedUserInfo.sex = res.data.data.sex
            displayedUserInfo.age = res.data.data.age
            displayedUserInfo.introduction = res.data.data.introduction
            displayedUserInfo.location = res.data.data.location
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

</script>


<style scoped lang="scss">
.user-view {
    height: 100%;
}

.row-wrapper {
    height: 100%;
}

.plane {
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
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.user-name {
    font-size: 4rem;
}

.role-name {
    font-size: 2rem;
}

.text-up {
    position: relative;
    top: -2rem;
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
    --el-button-text-color: var(--color-text-on-glass);
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
</style>

<style>
.el-form-item__label,
.el-radio__label {
    color: var(--color-text-on-glass)
}
</style>