import { defineStore } from 'pinia';
import type { AttractionVO, UserVO, ProvinceVO, CityVO, AreaVO, StreetVO } from '@/types/interfaces';

export const useUserAttractionStore = defineStore('user-attraction', {
    state() {
        return {
            attraction: {} as AttractionVO,
            user: {} as UserVO,
            province: {} as ProvinceVO,
            city: {} as CityVO,
            area: {} as AreaVO,
            street: {} as StreetVO
        };
    },
    persist: true
});
