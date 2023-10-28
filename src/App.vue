<template>
  <app-layout />
</template>

<script setup lang="ts">
import AppLayout from '@/components/layout/AppLayout.vue';
import { onBeforeMount } from 'vue';
import { usePublicStore } from '@/stores/public';

const store = usePublicStore();

onBeforeMount(() => {
  // 在组件挂载时读取sessionStorage里的状态信息到store里
  if (sessionStorage.getItem('store')) {
    console.log('store', store) 
    store.setActiveIndex(
          sessionStorage.getItem('activeIndex') as string
      )
    }

    // 在页面刷新时将store里的信息保存到sessionStorage里
    // beforeunload事件在页面刷新时先触发
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('activeIndex', store.activeIndex)
    })
})


</script>

<style scoped>

</style>
