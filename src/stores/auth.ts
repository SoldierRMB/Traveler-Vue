import { defineStore } from 'pinia';
import type { JwtPayload } from 'jwt-decode';

export const useAuthStore = defineStore(
    'auth',
    () => {
        const isAuthenticated = ref(false);
        const token = ref('');
        const user = ref({} as JwtPayload);
        const $reset = () => {
            isAuthenticated.value = false;
            token.value = '';
            user.value = {} as JwtPayload;
        };
        return { isAuthenticated, token, user, $reset };
    },
    { persist: true }
);
