<template>
    <el-menu :mode="menuMode" :default-active="activeIndex" class="menu" :collapse="isCollapsed" :ellipsis="false" router
        :text-color="accentColor" :active-text-color="accentColor" @select="handleSelect">

        <div class="safe-area-top"></div>

        <!-- LOGO -->
        <!-- <el-image src="src/assets/logo.svg" preview-src-list='src/assets/logo.svg' fit="cover" /> -->
        <img src="@/assets/logo.svg" alt="logo image" />
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
                    <el-avatar :src="avatar"></el-avatar>
                </el-icon>
                <el-avatar :src="avatar" v-if="!mobileMode"></el-avatar>

                <span class="no-user-select">{{ userStore.name }}</span>
            </template>

            <el-menu-item-group>
                <template #title>
                    <span>分组一</span>
                </template>
                <el-menu-item index="3-1">选项1</el-menu-item>
                <el-menu-item index="3-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
                <el-menu-item @click="exit">退出登录</el-menu-item>
            </el-menu-item-group>

        </el-sub-menu>

        <!-- 切换颜色模式的按钮 -->
        <div class="icon-button-wrapper">
            <el-button :icon="colorModeIcon" circle size="large" @click="toggleDark()" />
            <!-- <el-icon :size="30" color="var(--el-menu-text-color)" @click="toggleDark()"><Sunny /></el-icon> -->
        </div>

        <!-- 移动端下垂直菜单的折叠按钮 -->
        <div class="icon-button-wrapper" v-if="mobileMode">
            <el-button :icon="collapseIcon" circle size="large" @click="toggleCollapse" />
        </div>

        <div class="safe-area-bottom"></div>

    </el-menu>
</template>


<script setup lang="ts">
import { usePublicStore } from '@/stores/public';
import { useUserStore } from '@/stores/user';

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
const activeIndex = computed(() => publicStore.activeIndex)
const handleSelect = (key: string, keyPath: string[]) => {
    publicStore.setActiveIndex(key)
    // console.log(key, keyPath)
}

// 颜色模式调整
import { useDark, useToggle } from '@vueuse/core'
import { appName } from '@/mixin';
import { useRouter, type RouteRecordRaw } from 'vue-router';
const isDark = useDark()
const toggleDark = useToggle(isDark)
const colorModeIcon = computed(() => (isDark.value ? Moon : Sunny))

// 主题色
const accentColor = computed(() => publicStore.accentColor)

// 用户状态
const isLogin = computed(() => userStore.isLogin)
const avatar = computed(() => userStore.avatar)

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
function exit() {
    userStore.$reset();
    router.push(routesMap.login.path);
}
</script>


<style scoped lang="scss">
.el-menu {
    color: var(--el-menu-text-color);
    --el-menu-bg-color: rgba(128, 128, 128, 0.5);
    backdrop-filter: blur(14px);
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

.icon-button-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    --el-font-size-base: 24px;
    padding: 1rem;
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
        min-width: 8rem;
        max-width: 20vw;
        min-height: 400px;
    }

    .el-menu--collapse {
        min-width: 50px;

        min-height: 400px;
    }

    .el-avatar {
        margin-right: 0;
    }

    .avatar-icon {
        // margin-right: 1rem;
    }

    .safe-area-top {
        height: 1rem;
    }

    .safe-area-bottom {
        height: 1rem;
    }
}
</style>