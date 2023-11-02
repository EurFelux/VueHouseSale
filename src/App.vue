<template>
  <app-layout />
  <el-text class="debug-tip" v-if="publicStore.debug">DEBUG, VERSION {{ publicStore.debug }}</el-text>
</template>

<script setup lang="ts">
import AppLayout from '@/components/layout/AppLayout.vue';
import { onBeforeMount } from 'vue';
import { usePublicStore } from '@/stores/public';
import { useUserStore } from './stores/user';
import { defaultValues } from './api/model';

const publicStore = usePublicStore();
const userStore = useUserStore();

interface UserStore {
  id: number;
  name: string;
  avatar: string;
  authorization: string;
  phone: string;
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
    userStore.setPhone(user.phone)
  }
  if (sessionStorage.getItem('activeIndex')) {
    publicStore.setActiveIndex(sessionStorage.getItem('activeIndex') as string);
  }
  if (sessionStorage.getItem('colorMode')) {
    publicStore.setColorMode(sessionStorage.getItem('colorMode') as string);
  }
  if (sessionStorage.getItem('accentColor')) {
    publicStore.setColorMode(sessionStorage.getItem('accentColor') as string);
  }

  // 设置为移动端
  setMobileMode()

  // 设置主题色
  setAccentColor(publicStore.accentColor)

  // 在页面刷新时将store里的信息保存到sessionStorage里
  // beforeunload事件在页面刷新时先触发
  window.addEventListener('beforeunload', () => {
    sessionStorage.setItem('activeIndex', publicStore.activeIndex);
    sessionStorage.setItem('colorMode', publicStore.colorMode);
    sessionStorage.setItem('accentColor', publicStore.accentColor);


    const user: UserStore = {
      id: userStore.id,
      name: userStore.name,
      avatar: userStore.avatar,
      authorization: userStore.authorization,
      phone: userStore.phone
    }
    sessionStorage.setItem('user', JSON.stringify(user));

  })
})

// 设置移动端状态
function setMobileMode() {
  const mobileModeThreshold = 1024
  publicStore.setMobileMode(window.innerWidth < mobileModeThreshold)
}

// 设置主题色
function setAccentColor(newVal: string | null = null) {
  const el = document.documentElement
  if (newVal) {
    el.style.setProperty('--el-color-primary', newVal)
  } else {
    el.style.setProperty('--el-color-primary', defaultValues.ACCENT_COLOR)
  }
}


// 监听窗口大小变化
onMounted(() => {
  window.addEventListener('resize', () => {
    setMobileMode()
  })
})

// 监听主题色变化
watch(() => publicStore.accentColor, (newVal) => {
  setAccentColor(newVal)
})

</script>

<style scoped>
.debug-tip {
  position: absolute;
  top: 4rem;
  right: 1rem;
  color: var(--color-text-on-glass)
}
</style>
