<template>
    <el-container class="container">
        <!-- Header -->
        <el-header>
            <nav-bar />
        </el-header>

        <!-- Main view -->
        <el-main>
            <el-scrollbar>
                <router-view />
            </el-scrollbar>
        </el-main>
    </el-container>
</template>


<script setup lang="ts">

</script>


<style scoped>
.container {
    background-image: url("@/assets/login-background.jpeg");
    background-size: 120% auto;
    background-position: center;
    background-repeat: no-repeat;
    
    display: flex;
    flex: auto;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
}

.el-header {
    /* background-color: var(--el-menu-bg-color); */
    line-height: 60px;
    --el-header-padding: 0;
}



@media (max-width: 1024px) {
    .container {
        background-size: auto 120%;
        flex-direction: row;
    }
}
</style>

<style>
/* 应用全局样式 */
.no-user-select {
    user-select: none;
}

</style>