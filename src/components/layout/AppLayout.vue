<template>
    <el-container class="container">
        <!-- Header -->
        <el-header>
            <nav-bar />
        </el-header>

        <!-- Main view -->
        <router-view />
    </el-container>
</template>


<script setup lang="ts">

</script>


<style scoped>
.container {
    display: flex;
    flex: auto;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
}

.el-header {
    background-color: var(--el-menu-bg-color);
    line-height: 60px;
    --el-header-padding: 0;
}

@media (min-width: 1024px) {}
</style>

