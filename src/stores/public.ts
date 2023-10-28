import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const usePublicStore = defineStore('public', () => {
  const activeIndex = ref("/");
  const accentColor = ref("#b100e8");
  const debugMode = ref(true);

  function $reset() {
    activeIndex.value = "/";
    accentColor.value = "#b100e8";
  }

  function setActiveIndex(index: string) {
    activeIndex.value = index;
  }

  function setAccentColor(color: string) {
    accentColor.value = color;
  }

  return { activeIndex, accentColor, debugMode, $reset, setActiveIndex, setAccentColor}
})

// auth.js
import { acceptHMRUpdate } from 'pinia'

// 确保传递正确的 store 声明，本例中为 `useAuth`
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePublicStore, import.meta.hot))
}