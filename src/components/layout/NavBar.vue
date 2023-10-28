<template>
        <el-menu :default-active="activeIndex" class="menu" mode="horizontal" :ellipsis="false" router
            :text-color="accentColor" :active-text-color="accentColor" @select="handleSelect">

            <!-- LOGO -->
            <img style="width: 100px" src="@/assets/logo.svg" alt="Element logo" />
            <div class="app-name">
                {{ appName }}
            </div>

            <!-- 导航栏 -->
            <el-menu-item :index="item.path" v-for="(item, index) in navRoutes" :key="index">
                {{ item.name }}
            </el-menu-item>

            <div class="flex-grow" />

            <!-- 切换颜色模式的按钮 -->
            <div class="toggle-color-mode-icon">
                <el-button :icon="colorModeIcon" circle size="large" @click="toggleDark()" />
                <!-- <el-icon :size="30" color="var(--el-menu-text-color)" @click="toggleDark()"><Sunny /></el-icon> -->
            </div>

            <!-- 未登录状态显示 -->
            <el-menu-item :index="routesMap.login.path" v-if="!userStore.isLogin">
                {{ routesMap.login.name }}
            </el-menu-item>

            <el-menu-item :index="routesMap.register.path" v-if="!userStore.isLogin">
                {{ routesMap.register.name }}
            </el-menu-item>

            <!-- 登陆状态显示 -->
            <el-sub-menu index="3" v-if="userStore.isLogin">
                <template #title>
                    <!-- o头像 -->
                    <el-avatar :src="avatar"></el-avatar>
                    <span>{{ userStore.name }}</span>
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
        </el-menu>
</template>


<script setup lang="ts">
import { usePublicStore } from '@/stores/public';
import { useUserStore } from '@/stores/user';
import { Sunny, Moon } from '@element-plus/icons-vue'

const publicStore = usePublicStore();
const userStore = useUserStore();
const router = useRouter()

// 菜单激活项
const activeIndex = computed(() => publicStore.activeIndex)
const handleSelect = (key: string, keyPath: string[]) => {
    publicStore.setActiveIndex(key)
    // console.log(key, keyPath)
}

// 颜色模式调整
import { useDark, useToggle } from '@vueuse/core'
import { appName } from '@/mixin';
import { useRouter } from 'vue-router';
const isDark = useDark()
const toggleDark = useToggle(isDark)
const colorModeIcon = computed(() => (isDark.value ? Moon : Sunny))

// 主题色
const accentColor = computed(() => publicStore.accentColor)

// 用户头像
const avatar = computed(() => userStore.avatar)

// 用户操作
import { navRoutes, routesMap } from '@/router';
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

.toggle-color-mode-icon {
    display: flex;
    flex-direction: column;
    justify-content: center;
    --el-font-size-base: 24px;
    padding: 1rem;
}

.el-avatar {
    margin-right: 1rem;
}
</style>