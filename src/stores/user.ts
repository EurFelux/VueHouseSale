import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { defaultAvatar } from '@/mixin';

export const useUserStore = defineStore('user', () => {
    const authorization = ref("");
    const id = ref(0);
    const name = ref("otto");
    const role = ref(0);
    const avatar = ref(defaultAvatar);

    const isLogin = computed(() => authorization.value !== "");

    function setAuthorization(token: string) {
        authorization.value = token;
    }

    function setId(_id: number) {
        id.value = _id;
    }

    function setName(_name: string) {
        name.value = _name;
    }

    function setRole(_role: number) {
        role.value = _role;
    }

    function setAvatar(_avatar: string) {
        avatar.value = _avatar;
    }

    function $reset() {
        authorization.value = "";
        id.value = 0;
        name.value = "otto";
        role.value = 0;
        avatar.value = defaultAvatar;
    }

    return { authorization, id, name, role, avatar, isLogin, setAuthorization, setId, setName, setRole, setAvatar, $reset }
})

// auth.js
import { acceptHMRUpdate } from 'pinia'

// 确保传递正确的 store 声明，本例中为 `useAuth`
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}