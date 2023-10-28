import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const usePublicStore = defineStore('public', () => {
  const authorization = ref("");
  const isLogin = computed(() => authorization.value !== "");
  const activeIndex = ref("/");
  const accentColor = ref("#b100e8");

  function $reset() {
    authorization.value = "";
  }

  function setAuthorization(token: string) {
    authorization.value = token;
  }

  function setActiveIndex(index: string) {
    activeIndex.value = index;
  }

  function setAccentColor(color: string) {
    accentColor.value = color;
  }

  return { authorization, isLogin, activeIndex, accentColor, $reset, setAuthorization, setActiveIndex, setAccentColor}
})

// auth.js
import { acceptHMRUpdate } from 'pinia'

// 确保传递正确的 store 声明，本例中为 `useAuth`
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePublicStore, import.meta.hot))
}