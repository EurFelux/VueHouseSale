<template>
    <div class="login-view">
        <div class="placeholder"></div>
        <div class="login-background">
            <h1>登录</h1>
            <el-form :model="loginForm" label-width="auto" :rules="rules" :size="formSize" ref="loginFormRef">
                <el-form-item label="手机号" prop="phone">
                    <el-input placeholder="请输入手机号" v-model="loginForm.phone" required></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input placeholder="请输入密码" v-model="loginForm.password" show-password required
                        @keydown="handleKeydown"></el-input>
                </el-form-item>
            </el-form>
            <div class="login-button-wrapper">
                <el-button class="login-button" round @click="submitForm(loginFormRef)">登录</el-button>
                <el-button class="login-button" round @click="fakeLogin" v-if="publicStore.debug">登录（伪）</el-button>
            </div>
            
        </div>
        <div class="placeholder"></div>
    </div>
</template>


<script setup lang="ts">
import type { LoginForm } from '@/api/request';
import { reactive, ref } from 'vue';
import { login } from '@/api/auth';
import { routesMap } from '@/router';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { usePublicStore } from '@/stores/public';

const router = useRouter()
const userStore = useUserStore()
const publicStore = usePublicStore()

const loginForm = reactive<LoginForm>({
    phone: '',
    password: '',
});
const formSize = ref('default')
const loginFormRef = ref<FormInstance>()

// 验证表单
import { type FormInstance, type FormRules } from 'element-plus';
import { allRules, changeActiveIndex, generalError } from '@/mixin';
import { defaultValues } from '@/api/model';
import { getFileUrl } from '@/api/oss';

const rules = reactive<FormRules<LoginForm>>({
    phone: allRules.phone,
    password: allRules.password,
})

// 提交表单
async function submitForm(formEl: FormInstance | undefined) {

    if (!formEl) return;

    await formEl.validate((valid, fileds) => {
        if (valid) {
            login(loginForm).then((res) => {
                ElMessage.success("登录成功")
                userStore.setAuthorization(res.data.data.access_token)
                userStore.setAvatar(res.data.data.user.avatar || defaultValues.USER_AVATAR)
                userStore.setName(res.data.data.user.name)
                userStore.setId(res.data.data.user.id)
                userStore.setRole(res.data.data.user.role)
                userStore.setPhone(res.data.data.user.phone)
                changeActiveIndex(routesMap.home.path)
                router.push(routesMap.home.path)
                // routerPush(routesMap.home.path)
            }).catch((err) => {
                generalError(err)
            })
        }
    })
}

// 添加Enter键登录
function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
        submitForm(loginFormRef.value);
    }
}

// debug login
function fakeLogin() {
    ElMessage.success("登录成功")
    userStore.setAuthorization("42")
    changeActiveIndex(routesMap.home.path)
    router.push(routesMap.home.path)
}

</script>


<style scoped>
.login-view {
    display: flex;
    flex-direction: row;
    height: 100%;
}

.placeholder {
    flex-grow: 1;
}

.login-background {
    max-width: 50%;
    height: 100%;

    text-align: center;
    /* color: aliceblue; */

    background-color: var(--color-bg-4);
    backdrop-filter: blur(10px);

    display: flex;
    flex-grow: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.login-button-wrapper {
    min-width: 35%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 8rem;
}

.el-form {
    max-width: 70%;
    padding-right: 3rem;

}

h1 {
    font-size: 3rem;
    margin-top: 8rem;
    margin-bottom: 3rem;
    user-select: none;
}

.login-button {
    margin-top: 4rem;
    width: 80%;
    max-width: 20rem;
    height: 3rem;
    font-size: 1.5rem;
    border: none;
    outline: none;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
}

@media (max-width: 1024px) {

    .login-background {
        max-width: 100%;
    }

    .el-form {
        max-width: 100%;
    }


}
</style>

<style>
.el-form-item__label {
    /* color: aliceblue; */
    user-select: none;
}
</style>