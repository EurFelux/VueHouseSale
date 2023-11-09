<template>
    <div class="settings-panel">
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
                    <el-input placeholder="请确认密码" v-model="passwordForm.confirmPassword" show-password required></el-input>
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
            <iframe width="110" height="100" src="https://www.myinstants.com/instant/aughhhhh-aughhhhh-7905/embed/"
                frameborder="0" scrolling="no"></iframe>
        </div>
        <div>
            <h2>塞点垃圾</h2>
            <p>
                啊啊啊啊啊啊啊啊啊！啊啊啊啊啊啊啊啊啊！啊啊啊啊啊啊啊啊啊！啊啊啊啊啊啊啊啊啊！啊啊啊啊啊啊啊啊啊！啊啊啊啊啊啊啊啊啊！啊啊啊啊啊啊啊啊啊！啊啊啊啊啊啊啊啊啊！啊啊啊啊啊啊啊啊啊！啊啊啊啊啊啊啊啊啊！啊啊啊啊啊啊啊啊啊！啊啊啊啊啊啊啊啊啊！啊啊啊啊啊啊啊啊啊！啊啊啊啊啊啊啊啊啊！啊啊啊啊啊啊啊啊啊！
            </p>
        </div>
        <div>
            <h2>塞点垃圾</h2>
            <p>
                啊啊啊啊啊啊啊啊啊！啊啊啊啊啊啊啊啊啊！啊啊啊啊啊啊啊啊啊！啊啊啊啊啊啊啊啊啊！啊啊啊啊啊啊啊啊啊！啊啊啊啊啊啊啊啊啊！啊啊啊啊啊啊啊啊啊！啊啊啊啊啊啊啊啊啊！啊啊啊啊啊啊啊啊啊！啊啊啊啊啊啊啊啊啊！啊啊啊啊啊啊啊啊啊！啊啊啊啊啊啊啊啊啊！啊啊啊啊啊啊啊啊啊！啊啊啊啊啊啊啊啊啊！啊啊啊啊啊啊啊啊啊！
            </p>
        </div>
        <div>
            <h2>塞点垃圾</h2>
            <p>
                啊啊啊啊啊啊啊啊啊！啊啊啊啊啊啊啊啊啊！啊啊啊啊啊啊啊啊啊！啊啊啊啊啊啊啊啊啊！啊啊啊啊啊啊啊啊啊！啊啊啊啊啊啊啊啊啊！啊啊啊啊啊啊啊啊啊！啊啊啊啊啊啊啊啊啊！啊啊啊啊啊啊啊啊啊！啊啊啊啊啊啊啊啊啊！啊啊啊啊啊啊啊啊啊！啊啊啊啊啊啊啊啊啊！啊啊啊啊啊啊啊啊啊！啊啊啊啊啊啊啊啊啊！啊啊啊啊啊啊啊啊啊！
            </p>
        </div>
    </div>
</template>


<script setup lang="ts">
import { logout } from '@/api/auth';
import type { UpdatePasswordForm } from '@/api/request';
import { updatePassword } from '@/api/user';
import { allRules, generalError } from '@/mixin';
import { routesMap } from '@/router';
import { usePublicStore } from '@/stores/public';
import { useUserStore } from '@/stores/user';
import type { FormInstance, FormRules } from 'element-plus';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter()

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
                ElMessage.success("修改成功，请重新登录")
                logout(userStore.id).then(() => {
                    userStore.$reset()
                    router.push(routesMap.login.path)
                }).catch((err) => {
                    userStore.$reset()
                    generalError(err)
                })
            }).catch((err) => {
                generalError(err)
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
.settings-panel {
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
</style>