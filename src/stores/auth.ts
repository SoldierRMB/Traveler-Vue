import { defineStore } from 'pinia';
import type { UserVO } from '@/types/interfaces';

export const useAuthStore = defineStore(
    'auth',
    () => {
        const isAuthenticated = ref(false);
        const token = ref('');
        const user = ref({} as UserVO);
        const $reset = () => {
            isAuthenticated.value = false;
            token.value = '';
            user.value = {} as UserVO;
        };
        return { isAuthenticated, token, user, $reset };
    },
    { persist: true }
);
