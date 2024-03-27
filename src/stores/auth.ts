import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state() {
        return {
            isAuthenticated: false,
            token: '',
            user: {}
        };
    },
    persist: true
});
