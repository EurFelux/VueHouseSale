<template>
<div class="manage-view">
        <!-- 主布局 -->
            <el-row class="row-wrapper">
                <!-- 侧边栏 -->
                <el-col :span="5">
                    <el-aside>
                        <el-menu :default-active="asideIndex" @select="(key, path) => { asideIndex = key }">
                            <el-menu-item index="user">
                                <template #title>
                                    <el-icon class="material-symbols-outlined" style="font-size: 2rem">
                                        person
                                    </el-icon>
                                    <span>用户管理</span>
                                </template>
                            </el-menu-item>

                            <el-menu-item index="audit">
                                <template #title>
                                    <el-icon class="material-symbols-outlined" style="font-size: 2rem">
                                        upload_file
                                    </el-icon>
                                    <span>房产资质审核</span>
                                </template>
                            </el-menu-item>

                            <el-menu-item index="info">
                                <template #title>
                                    <el-icon class="material-symbols-outlined" style="font-size: 2rem">
                                        publish
                                    </el-icon>
                                    <span>信息发布管理</span>
                                </template>
                            </el-menu-item>                            
                        </el-menu>
                    </el-aside>
                </el-col>

                <el-col :span="19" class="panel">
                    <component :is="activePanel"></component>
                </el-col>

                <!-- <el-col :span="5" class="placeholder"></el-col> -->
            </el-row>

</div>
</template>


<script setup lang="ts">
import ManageUserPanel from '@/components/manage-view/ManageUserPanel.vue'
import ManageAuditPanel from '@/components/manage-view/ManageAuditPanel.vue'
import ManageInfoPanel from '@/components/manage-view/ManageInfoPanel.vue'

const asideIndex = ref('user')
const activePanel = computed(() => {
    switch (asideIndex.value) {
        case 'user':
            return ManageUserPanel
        case 'audit':
            return ManageAuditPanel
        case 'info':
            return ManageInfoPanel
        default:
            return ManageUserPanel
    }
})
</script>


<style scoped lang="scss">
.panel {
    padding: 2rem;
    background: var(--color-bg-glass);
    backdrop-filter: blur(6px);
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
</style>