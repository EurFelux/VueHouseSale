<template>
    <el-menu :mode="menuMode" :default-active="activeIndex" class="menu" :collapse="isCollapsed" :ellipsis="false" router
        :text-color="accentColor" :active-text-color="accentColor" @select="handleSelect">

        <div class="safe-area-top"></div>

        <!-- LOGO -->
        <!-- <el-image src="src/assets/logo.svg" preview-src-list='src/assets/logo.svg' fit="cover" /> -->
        <img src="@/assets/logo.svg" alt="logo image" class="logo" />
        <div class="app-name no-user-select" v-if="!mobileMode">
            {{ appName }}
        </div>

        <!-- 导航栏 -->
        <el-menu-item :index="item.path" v-for="(item, index) in navRoutes" :key="index">
            <el-icon>
                <component :is="getIcon(item)"></component>
            </el-icon>
            <template #title>
                {{ item.name }}
            </template>
        </el-menu-item>

        <div class="flex-grow"></div>

        <!-- 切换颜色模式的按钮 -->
        <div class="icon-button-wrapper" v-if="!mobileMode">
            <el-button :icon="colorModeIcon" circle size="large" @click="toggleDark()" />
        </div>

        <!-- 未登录状态显示 -->
        <el-menu-item :index="routesMap.login.path" v-if="!isLogin">
            <el-icon>
                <Key />
            </el-icon>
            <template #title>
                {{ routesMap.login.name }}
            </template>
        </el-menu-item>

        <el-menu-item :index="routesMap.register.path" v-if="!isLogin">
            <el-icon>
                <User />
            </el-icon>
            <template #title>
                {{ routesMap.register.name }}
            </template>
        </el-menu-item>

        <!-- 登陆状态显示 -->
        <el-sub-menu index="3" v-if="isLogin">
            <!-- o头像 -->
            <template #title>
                <el-icon class="avatar-icon" v-if="mobileMode">
                    <el-avatar :src="avatar" @error="userStore.setAvatar(defaultValues.USER_AVATAR)"></el-avatar>
                </el-icon>
                <el-avatar :src="avatar" v-if="!mobileMode"></el-avatar>

                <span class="no-user-select">{{ userStore.name }}</span>
            </template>

            <el-menu-item @click="goUserView">管理面板</el-menu-item>
            <el-menu-item @click="goManageView" v-if="role == 1">管理员界面</el-menu-item>
            <el-menu-item @click="goBackendDashboard" v-if="role == 1">
                <el-icon class="material-symbols-outlined">
                    link
                </el-icon>
                后端监控
            </el-menu-item>
            <el-menu-item @click="exit">退出登录</el-menu-item>
        </el-sub-menu>


        <!-- 移动端下垂直菜单的折叠按钮与切换颜色模式的按钮合并到一起 -->
        <div class="row-wrapper" v-if="mobileMode">
            <div class="icon-button-wrapper">
                <el-button :icon="collapseIcon" circle size="large" @click="toggleCollapse" />
            </div>
            <!-- 切换颜色模式的按钮 -->
            <div class="icon-button-wrapper">
                <el-button :icon="colorModeIcon" circle size="large" @click="toggleDark()" />
            </div>
        </div>

        <div class="safe-area-bottom"></div>

    </el-menu>
</template>


<script setup lang="ts">
import { usePublicStore } from '@/stores/public';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
import { defaultValues } from '@/api/model'

const publicStore = usePublicStore();
const userStore = useUserStore();
const router = useRouter()

// 导航栏图标
import { Fold, Expand, House, Key, User, HotWater } from '@element-plus/icons-vue'
import { Sunny, Moon } from '@element-plus/icons-vue'
import { navRoutes, routesMap, type RouteType } from '@/router';

function getIcon(item: RouteType) {
    switch (item.name) {
        case routesMap.home.name:
            return House;
        case routesMap.login.name:
            return Key;
        case routesMap.register.name:
            return User;
        case routesMap.about.name:
            return HotWater;
        default:
            return House;
    }
}

// 菜单激活项
const route = useRouter()
const activeIndex = computed(() => publicStore.activeIndex)

watch(() => route.currentRoute.value.path, (path) => {
    publicStore.setActiveIndex(path)
    // console.log(path)
})

const handleSelect = (key: string, keyPath: string[]) => {
    publicStore.setActiveIndex(key)
    // console.log(key, keyPath)
}

// 颜色模式调整
import { useDark, useToggle } from '@vueuse/core'
import { appName, generalError } from '@/mixin';
const isDark = useDark()
const toggleDark = useToggle(isDark)
const colorModeIcon = computed(() => (isDark.value ? Moon : Sunny))

// 主题色
const accentColor = computed(() => publicStore.accentColor)

// 用户状态
const isLogin = computed(() => userStore.isLogin)
const avatar = ref('')
const role = computed(() => userStore.role)

watch(() => userStore.avatar, () => {
    if (!userStore.avatar)
        userStore.setAvatar(defaultValues.USER_AVATAR)
    avatar.value = getFileUrl(userStore.avatar)
})

onMounted(() => {
    if (!userStore.avatar)
        userStore.setAvatar(defaultValues.USER_AVATAR);
    avatar.value = getFileUrl(userStore.avatar);
})

// 适应移动端，设置垂直导航栏
const mobileMode = computed(() => publicStore.mobileMode)
const menuMode = computed(() => mobileMode.value ? 'vertical' : 'horizontal')
const isCollapsed = ref(mobileMode.value)
const collapseIcon = computed(() => isCollapsed.value ? Expand : Fold)

function toggleCollapse() {
    isCollapsed.value = !isCollapsed.value;
}

watch(mobileMode, () => {
    isCollapsed.value = mobileMode.value
})


// 用户操作
// 登出
import { logout } from '@/api/auth';
import { changeActiveIndex } from '@/mixin';
import { getFileUrl } from '@/api/oss';
function exit() {
    logout(userStore.id).then((res) => {
        ElMessage.success("退出成功")
        userStore.$reset();
        changeActiveIndex(routesMap.home.path)
        router.push(routesMap.home.path)
    }).catch((err) => {
        generalError(err)
        if (err.response.data) {
            userStore.$reset()
        }
        changeActiveIndex(routesMap.login.path)
        router.push(routesMap.login.path)
    })
}

// 个人信息
const userId = computed(() => userStore.id);
function goUserView() {
    router.push(`/user/${userId.value}`)
}

// 管理界面
function goManageView() {
    router.push(`/manage`)
}

function goBackendDashboard() {
    window.open('http://1.94.35.98:3000/d/PaSwOabVk/chou-mai-fang-de?orgId=1&from=now-15m&to=now&var-application=auditservice&var-instance=auditservice&var-jvm_memory_pool_heap=All&var-jvm_memory_pool_nonheap=All', '_blank')
}

</script>


<style scoped lang="scss">
.el-menu {
    // color: var(--el-menu-text-color);
    // --el-menu-bg-color: transparent;
    // --el-menu-hover-bg-color: #ffffff55;
    // backdrop-filter: blur(1rem);
    overflow-x: auto;
    overflow-y: hidden;
    z-index: 100;

}

.no-user-select {
    user-select: none;
}

.el-menu-item {
    user-select: none;
}

.app-name {
    padding-right: 2rem;
    user-select: none;
}

.flex-grow {
    flex-grow: 1;
}

.row-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.icon-button-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    --el-font-size-base: 24px;
    padding-right: 1rem;
}

.el-button {
    --el-button-bg-color: transparent;
    --el-button-hover-bg-color: rgba(192, 192, 192, 0.5);
    --el-button-text-color: var(--el-menu-text-color);
    --el-button-hover-text-color: var(--el-menu-text-color);
    --el-button-border-color: var(--el-menu-text-color);
}


.el-avatar {
    margin-right: 1rem;
}



@media (max-width: 1024px) {
    .el-menu {
        display: flex;
        flex-direction: column;
        overflow-x: hidden;
        height: 100vh;

        --el-menu-icon-width: 40px;
    }

    .el-menu:not(.el-menu--collapse) {
        width: 200px;
        // min-width: 8rem;
        // max-width: 20vw;
        min-height: 400px;
    }

    .el-menu--collapse {
        min-width: 50px;
        min-height: 400px;
    }

    .el-avatar {
        margin-right: 0;
    }

    .logo {
        width: 40px;
        height: 40px;
        margin: 1rem;
    }

    .icon-button-wrapper {
        padding: 1rem 0 0 20px;
    }

    .safe-area-top {
        height: 1rem;
    }

    .safe-area-bottom {
        height: 1rem;
    }
}
</style>