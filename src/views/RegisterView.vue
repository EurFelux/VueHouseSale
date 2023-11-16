<template>
    <div class="register-view">
        <div class="placeholder"></div>
        <div class="register-background">
            <h1>注册</h1>
            <el-form :model="registerForm" label-width="auto" :rules="rules" :size="formSize" ref="registerFormRef">

                <el-form-item label="用户名" prop="name">
                    <el-input placeholder="请输入用户名" v-model="registerForm.name" required></el-input>
                </el-form-item>

                <el-form-item label="密码" prop="password">
                    <el-input placeholder="请输入密码" v-model="registerForm.password" show-password required></el-input>
                </el-form-item>

                <el-form-item label="确认密码" prop="confirmPassword">
                    <el-input placeholder="请确认密码" v-model="registerForm.confirmPassword" show-password required></el-input>
                </el-form-item>

                <el-form-item label="手机号" prop="phone">
                    <el-input placeholder="请输入手机号" v-model="registerForm.phone" required></el-input>
                </el-form-item>

                <el-form-item label="性别" prop="sex">
                    <el-radio-group v-model="registerForm.sex">
                        <el-radio :label=0>女</el-radio>
                        <el-radio :label=1>男</el-radio>
                        <el-radio :label=2>保密</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="年龄" prop="age">
                    <el-input-number v-model="registerForm.age" :min="1" :max="150"></el-input-number>
                </el-form-item>


            </el-form>
            <div class="button-wrapper">
                <el-button class="submit-button" round @click="submitForm(registerFormRef)">提交</el-button>
                <el-button round @click="console.log(registerForm)" v-if="publicStore.debug">显示表单</el-button>
            </div>
        </div>
        <div class="placeholder"></div>
    </div>
</template>


<script setup lang="ts">
import type { RegisterForm } from '@/api/request';
import { reactive, ref } from 'vue';
import { register } from '@/api/auth';
import { routesMap } from '@/router';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { usePublicStore } from '@/stores/public';
import { allRules } from '@/mixin'

const router = useRouter()
const userStore = useUserStore()
const publicStore = usePublicStore()

const registerForm = reactive<RegisterForm>({
    name: '',
    password: '',
    confirmPassword: '',
    phone: '',
    sex: -1,
    age: 0,
    introduction: '',
    location: '',
});

const formSize = ref('default')
const registerFormRef = ref<FormInstance>()

// 验证表单
import { type FormInstance, type FormRules } from 'element-plus';
import { changeActiveIndex, generalError } from '@/mixin';

const rules = reactive<FormRules<RegisterForm>>({
    name: allRules.name,
    password: allRules.password,
    confirmPassword: [
        { required: true, message: '请确认密码', trigger: 'blur' },
        { min: 6, max: 20, message: '密码长度应为6-20位', trigger: 'blur' },
        {
            validator: (rule, value, callback) => {
                if (value !== registerForm.password) { // 这里的 registerForm 是注册表单的引用
                    callback(new Error('两次输入密码不一致'));
                } else {
                    callback();
                }
            }, trigger: 'blur'
        }
    ],
    phone: allRules.phone,
    sex: allRules.sex,
})

// 提交表单
async function submitForm(formEl: FormInstance | undefined) {

    if (!formEl) return;

    await formEl.validate((valid, fileds) => {
        if (valid) {
            register(registerForm).then((res) => {
                ElMessage.success("注册成功")
                changeActiveIndex(routesMap.login.path)
                router.push(routesMap.login.path)
            }).catch((err) => {
                generalError(err)
            })
        }
    })
}
</script>


<style scoped>
.register-view {
    display: flex;
    flex-direction: row;
    height: 100%;
}

.placeholder {
    flex-grow: 1;
}

.register-background {
    max-width: 50%;
    height: 100%;
    border-radius: 1rem;

    text-align: center;

    background-color: var(--color-bg-4);
    backdrop-filter: blur(10px);

    display: flex;
    flex-grow: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.button-wrapper {
    min-width: 35%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 2rem;
}

.el-form {
    max-width: 70%;
    padding-right: 3rem;

}

h1 {
    font-size: 3rem;
    margin-top: 4rem;
    margin-bottom: 3rem;
    user-select: none;
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



@media (max-width: 1024px) {

    .register-background {
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