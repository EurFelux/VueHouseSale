<template>
  <app-layout />
  <el-text class="debug-tip" v-if="publicStore.debug">DEBUG, VERSION {{ publicStore.debug }}</el-text>
</template>

<script setup lang="ts">
import AppLayout from '@/components/layout/AppLayout.vue';
import { onBeforeMount } from 'vue';
import { usePublicStore } from '@/stores/public';
import { useUserStore } from './stores/user';

const publicStore = usePublicStore();
const userStore = useUserStore();

const mobileModeThreshold = 1024

interface UserStore {
  id: number;
  name: string;
  avatar: string;
  authorization: string;
}

// App挂载前行为
onBeforeMount(() => {
  // 读取系统颜色模式
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    publicStore.setColorMode('dark')
  } else {
    publicStore.setColorMode('light')
  }

  // 读取sessionStorage里缓存的状态信息
  if (sessionStorage.getItem('user')) {
    const user: UserStore = JSON.parse(sessionStorage.getItem('user') as string);
    userStore.setId(user.id);
    userStore.setName(user.name);
    userStore.setAvatar(user.avatar);
    userStore.setAuthorization(user.authorization);
  }
  if (sessionStorage.getItem('activeIndex')) {
    publicStore.setActiveIndex(sessionStorage.getItem('activeIndex') as string);
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
    sessionStorage.setItem('colorMode', publicStore.colorMode);

    const user: UserStore = {
      id: userStore.id,
      name: userStore.name,
      avatar: userStore.avatar,
      authorization: userStore.authorization,
    }
    sessionStorage.setItem('user', JSON.stringify(user));

  })
})

// 监听窗口大小变化
onMounted(() => {
  window.addEventListener('resize', () => {
    publicStore.setMobileMode(window.innerWidth < mobileModeThreshold)
  })
})

</script>

<!-- 全局样式，覆盖Element Plus的设置 -->
<style>
:root {
  --el-fill-color-blank: #ffffffaf;
  --color-bg-glass: rgba(255, 255, 255, 0.2);
  --color-text-on-glass: aliceblue;
}

html.dark {
  filter: brightness(0.7);
  --color-bg-glass: rgba(127, 127, 127, 0.2);
}
</style>

<style scoped>
.debug-tip {
    position: absolute;
    top: 4rem;
    right: 1rem;
    color: var(--color-text-on-glass)
}
</style>
