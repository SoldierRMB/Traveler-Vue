import { defineStore } from 'pinia';
import type { AttractionVO, UserVO } from '@/types/interfaces';

export const useUserAttractionStore = defineStore('user-attraction', {
    state() {
        return {
            attraction: {} as AttractionVO,
            user: {} as UserVO
        };
    },
    actions: {
        setAttraction(attraction: AttractionVO) {
            this.attraction = attraction;
        },
        setUser(user: UserVO) {
            this.user = user;
        }
    },
    persist: true
});
