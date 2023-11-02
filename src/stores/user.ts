import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
    const authorization = ref("");
    const id = ref(defaultValues.USER_ID);
    const name = ref(defaultValues.USER_NAME);
    const role = ref(defaultValues.USER_ROLE);
    const avatar = ref(defaultValues.USER_AVATAR);
    const phone = ref(defaultValues.USER_PHONE);

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

    function setPhone(_phone: string) {
        phone.value = _phone;
    }

    function $reset() {
        authorization.value = "";
        id.value = defaultValues.USER_ID;
        name.value = defaultValues.USER_NAME;
        role.value = defaultValues.USER_ROLE;
        avatar.value = defaultValues.USER_AVATAR;
        phone.value = defaultValues.USER_PHONE;
    }

    return { authorization, id, name, role, avatar, phone, isLogin, setAuthorization, setId, setName, setRole, setAvatar, setPhone, $reset }
})

// auth.js
import { acceptHMRUpdate } from 'pinia'
import { defaultValues } from '@/api/model';

// 确保传递正确的 store 声明，本例中为 `useAuth`
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}