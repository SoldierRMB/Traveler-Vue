import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state() {
        return {
            isAuthenticated: false,
            token: '',
            user: {}
        };
    },
    getters: {
        getIsAuthenticated: (state) => state.isAuthenticated,
        getToken: (state) => state.token,
        getUser: (state) => state.user
    },
    actions: {
        setAuth(isAuth: boolean) {
            if (isAuth) {
                this.isAuthenticated = isAuth;
            } else {
                this.isAuthenticated = false;
            }
        },
        setToken(token: string | null) {
            if (token) {
                this.token = token;
            } else {
                this.token = '';
            }
        },
        setUser(user: object | null) {
            if (user) {
                this.user = user;
            } else {
                this.user = {};
            }
        }
    },
    persist: true
});
