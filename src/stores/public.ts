import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const usePublicStore = defineStore('public', () => {
  const activeIndex = ref("/");
  const accentColor = ref(defaultValues.ACCENT_COLOR);
  const debug = ref(debugVersion);
  const colorMode = ref("dark");
  const mobileMode = ref(false);

  function $reset() {
    activeIndex.value = "/";
    accentColor.value = defaultValues.ACCENT_COLOR;
    colorMode.value = "dark";
    mobileMode.value = false;
  }

  function setActiveIndex(index: string) {
    activeIndex.value = index;
  }

  function setAccentColor(color: string) {
    accentColor.value = color;
  }

  function setColorMode(mode: string) {
    colorMode.value = mode;
  }

  function setMobileMode(mode: boolean) {
    mobileMode.value = mode;
  }

  return { activeIndex, accentColor, debug, colorMode, mobileMode, $reset, setActiveIndex, setAccentColor, setColorMode, setMobileMode }
})

// auth.js
import { acceptHMRUpdate } from 'pinia'
import { debugVersion } from '@/mixin';
import { defaultValues } from '@/api/model';

// 确保传递正确的 store 声明，本例中为 `useAuth`
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePublicStore, import.meta.hot))
}