<template>
    <div class="user-view">
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

                            <el-menu-item index="request">
                                <template #title>
                                    <el-icon class="material-symbols-outlined" style="font-size: 2rem">
                                        upload_file
                                    </el-icon>
                                    <span>房产资质审核申请</span>
                                </template>
                            </el-menu-item>

                            <el-menu-item index="publish">
                                <template #title>
                                    <el-icon class="material-symbols-outlined" style="font-size: 2rem">
                                        publish
                                    </el-icon>
                                    <span>发布信息</span>
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
                    <component :is="activePanel"></component>
                </el-col>

                <el-col :span="5" class="placeholder"></el-col>
            </el-row>
    </div>
</template>


<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { useRoute } from 'vue-router';
import InfoPanel from '@/components/user-view/InfoPanel.vue';
import SettingsPanel from '@/components/user-view/SettingsPanel.vue';
import RequestPanel from '@/components/user-view/RequestPanel.vue';
import PublishPanel from '@/components/user-view/PublishPanel.vue';

const route = useRoute()
const userStore = useUserStore()

// 当前页面的用户id
const userId = computed(() => Number(route.params.id))

// 侧边栏
const asideIndex = ref('home')

// 动态加载面板

const activePanel = computed(() => {
    switch (asideIndex.value) {
        case 'home':
            return InfoPanel
        case 'settings':
            return SettingsPanel
        case 'request':
            return RequestPanel
        case 'publish':
            return PublishPanel
        default:
            return InfoPanel
    }
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
    // background: var(--color-bg-glass);
    // background-color: var(--color-bg);
    border-radius: 1rem;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
}

.el-aside {
    width: 100%;
    position: sticky;
    top: 0;
}

.el-menu {
    --el-menu-bg-color: var(--color-bg-glass);
    margin: 0 1rem 1rem 1rem;
    border-right: 0;
}

.el-menu-item.is-active {
    border-right: 2px solid var(--el-color-primary);
}

.el-menu-item {
    // border-right: 3px solid var(--el-menu-border-color);
    --el-menu-hover-bg-color: var(--color-bg-glass-active);
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
.submit-button-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: end;
    height: 100%;
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

.el-button {
    /* --el-button-text-color: var(--color-text-on-glass); */
    margin: 1rem;
    --el-button-border-color: var(--el-color-primary);

}
</style>