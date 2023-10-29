<template>
  <app-layout />
</template>

<script setup lang="ts">
import AppLayout from '@/components/layout/AppLayout.vue';
import { onBeforeMount } from 'vue';
import { usePublicStore } from '@/stores/public';
import { useUserStore } from './stores/user';

const publicStore = usePublicStore();
const userStore = useUserStore();

const mobileModeThreshold = 1024


// App挂载前行为
onBeforeMount(() => {
  // 读取系统颜色模式
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    publicStore.setColorMode('dark')
  } else {
    publicStore.setColorMode('light')
  }
  
  // 读取sessionStorage里缓存的状态信息
  if (sessionStorage.getItem('activeIndex')) {
    publicStore.setActiveIndex(sessionStorage.getItem('activeIndex') as string);
  }
  if (sessionStorage.getItem('authorization')) {
    userStore.setAuthorization(sessionStorage.getItem('authorization') as string);
  }
  if (sessionStorage.getItem('colorMode')) {
    publicStore.setColorMode(sessionStorage.getItem('colorMode') as string);
  }

  // 判断是否为移动端
  publicStore.setMobileMode(window.innerWidth < mobileModeThreshold)

  // 在页面刷新时将store里的信息保存到sessionStorage里
  // beforeunload事件在页面刷新时先触发
  window.addEventListener('beforeunload', () => {
    sessionStorage.setItem('activeIndex', publicStore.activeIndex);
    sessionStorage.setItem('authorization', userStore.authorization);
    sessionStorage.setItem('colorMode', publicStore.colorMode);
  })
})

// 监听窗口大小变化
onMounted(() => {
  window.addEventListener('resize', () => {
    publicStore.setMobileMode(window.innerWidth < mobileModeThreshold)
  })
})

</script>

<!-- 全局样式，覆盖Element Plus的明亮模式 -->
<style>
:root {
  --el-fill-color-blank: #ffffff5e;
}
</style>
