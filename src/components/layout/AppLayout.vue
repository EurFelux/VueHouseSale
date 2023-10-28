<template>
    <el-container class="container">
        <!-- Header -->
        <el-header>
            <el-menu :default-active="activeIndex" class="menu" mode="horizontal" :ellipsis="false" router
                :text-color="accentColor" :active-text-color="accentColor"
                @select="handleSelect">

                <!-- LOGO -->
                <img style="width: 100px" src="@/assets/logo.svg" alt="Element logo" />
                <div class="app-name">
                    <span>{{ appName }}</span>
                </div>

                <!-- 导航栏 -->
                <el-menu-item :index="item.path" v-for="(item, index) in navRoutes" :key="index">{{ item.name
                }}</el-menu-item>

                <div class="flex-grow" />

                <!-- 切换颜色模式的按钮 -->
                <div class="toggle-color-mode-icon">
                    <el-button :icon="colorModeIcon" circle size="large" @click="toggleDark()" />
                    <!-- <el-icon :size="30" color="var(--el-menu-text-color)" @click="toggleDark()"><Sunny /></el-icon> -->
                </div>



                <!-- 未登录状态显示 -->
                <el-menu-item :index="routesMap.login.path" v-if="!store.isLogin">
                    {{ routesMap.login.name }}
                </el-menu-item>

                <el-menu-item :index="routesMap.register.path" v-if="!store.isLogin">
                    {{ routesMap.register.name }}
                </el-menu-item>

                <!-- 登陆状态显示 -->
                <el-sub-menu index="3" v-if="store.isLogin">
                    <template #title>
                        <el-avatar :icon="UserFilled"></el-avatar>
                        <span>导航二</span>
                    </template>
                    <el-menu-item-group>
                        <template #title>
                            <span>分组一</span>
                        </template>
                        <el-menu-item index="3-1">选项1</el-menu-item>
                        <el-menu-item index="3-2">选项2</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="分组2">
                        <el-menu-item index="3-3">选项3</el-menu-item>
                    </el-menu-item-group>

                </el-sub-menu>



            </el-menu>
        </el-header>

        <!-- Main view -->
        <router-view />
    </el-container>
</template>


<script setup lang="ts">
import { usePublicStore } from '@/stores/public';
import { ref } from 'vue';
import { navRoutes, routesMap } from '@/router';
import { Sunny, Moon } from '@element-plus/icons-vue'

const store = usePublicStore();

const activeIndex = computed(() => store.activeIndex)
const handleSelect = (key: string, keyPath: string[]) => {
    store.setActiveIndex(key)
    // console.log(key, keyPath)
}

import { UserFilled } from '@element-plus/icons-vue'

// dark mode
import { useDark, useToggle } from '@vueuse/core'
import { appName } from '@/mixin';
const isDark = useDark()
const toggleDark = useToggle(isDark)
const colorModeIcon = computed(() => (isDark.value ? Moon : Sunny))

// accentColor
const accentColor = computed(() => store.accentColor)


</script>


<style scoped>
.container {
    display: flex;
    flex: auto;
    width: 100vw;
    height: 100vh;
}

.el-header {
    background-color: var(--el-menu-bg-color);
    line-height: 60px;
    --el-header-padding: 0;
}

.el-menu {
    color: var(--el-menu-text-color);
}

.app-name {
    padding-right: 2rem;
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


@media (min-width: 1024px) {}
</style>

