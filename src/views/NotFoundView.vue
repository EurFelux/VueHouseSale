<template>
<div>
    <!-- 404 页面 -->
    <el-col :span="18" :offset="3" class="panel">
        <div class="not-found">
            <div class="not-found-content">
                <h1>404</h1>
                <p>页面不存在</p>
                <el-button type="primary" @click="goHome">返回首页</el-button>
            </div>
        </div>
    </el-col>
</div>
</template>


<script setup lang="ts">
import { routesMap } from '@/router';
import { useRouter } from 'vue-router';

const router = useRouter()

function goHome() {
    router.push(routesMap.home.path)
}
</script>


<style scoped>

</style>

<style scoped lang="scss">
.panel {
    padding: 2rem;
    background: var(--color-bg-glass);
    backdrop-filter: blur(6px);
}
</style>