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
    /* background-image: var(--bg-img); */
    /* background-color: var(--color-bg); */
    background: var(--color-bg);
    /* background-size: 120% auto; */
    /* background-position: center; */
    /* background-repeat: repeat; */
    

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

.el-main {
    backdrop-filter: blur(4px);
    filter: brightness(1.1);
    /* background-color: rgba(255, 255, 255, 0.1); */
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
    --color-bg: linear-gradient(to bottom, #c8bdb3, #e6ecf0);
    --color-bg-1: #aaaaaa;
    --color-bg-2: #bbbbbb;
    --color-bg-3: #cccccc;
    --color-bg-4: #dddddd;
    --color-bg-5: #eeeeee;
    --color-bg-6: #ffffff;
    --color-bg-glass-active: rgba(255, 255, 255, 0.4);
    --color-text-shadow: rgba(128, 128, 128, 0.2);
    --el-font-size-base: 1rem;
}

html.dark {
    filter: brightness(0.7);
    --color-bg: linear-gradient(to bottom, #1a1a1a, #34404d);
    --color-bg-1: #111111;
    --color-bg-2: #222222;
    --color-bg-3: #333333;
    --color-bg-4: #444444;
    --color-bg-5: #555555;
    --color-bg-6: #666666;
    --bg-img: url("@/assets/dark-background.jpeg");
    --color-bg-glass: rgba(127, 127, 127, 0.2);
    --color-text-shadow: rgba(255, 255, 255, 0.2);

}
</style>

<!-- 全局样式 -->
<style>
.no-user-select {
    user-select: none;
}
</style>