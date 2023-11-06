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
    background-image: var(--bg-img);
    background-size: 120% auto;
    background-position: center;
    background-repeat: repeat;

    display: flex;
    flex: auto;
    flex-direction: column;
    width: 100vw;
    height: 100vh;

    text-shadow:
        1px 1px 0 var(--color-text-shadow);
    /* 右下 */
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

<!-- 覆盖Element Plus的设置，双颜色模式 -->
<style>
:root {
    --bg-img: url("@/assets/light-background.jpg");
    --el-fill-color-blank: #ffffffaf;
    --color-bg-glass: rgba(255, 255, 255, 0.2);
    --color-text-on-glass: rgba(255, 255, 255, 0.8);
    --color-bg-glass-active: rgba(255, 255, 255, 0.4);
    --color-text-shadow: rgba(255, 255, 255, 0.5);
}

html.dark {
    filter: brightness(0.7);
    --bg-img: url("@/assets/dark-background.jpeg");
    --color-bg-glass: rgba(127, 127, 127, 0.2);
    --color-text-on-glass: rgba(122, 122, 122, 0.8);
    --color-text-shadow: rgba(0, 0, 0, 0.5);


}
</style>

<!-- 全局样式 -->
<style>
.no-user-select {
    user-select: none;
}
</style>