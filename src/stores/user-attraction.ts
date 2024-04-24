import { defineStore } from 'pinia';
import type {
    AttractionVO,
    UserVO,
    ProvinceVO,
    CityVO,
    AreaVO,
    StreetVO
} from '@/types/interfaces';

export const useUserAttractionStore = defineStore(
    'user-attraction',
    () => {
        const attraction = ref<AttractionVO>({} as AttractionVO);
        const user = ref<UserVO>({} as UserVO);
        const province = ref<ProvinceVO>({} as ProvinceVO);
        const city = ref<CityVO>({} as CityVO);
        const area = ref<AreaVO>({} as AreaVO);
        const street = ref<StreetVO>({} as StreetVO);
        const $reset = () => {
            attraction.value = {} as AttractionVO;
            user.value = {} as UserVO;
            province.value = {} as ProvinceVO;
            city.value = {} as CityVO;
            area.value = {} as AreaVO;
            street.value = {} as StreetVO;
        };
        return {
            attraction,
            user,
            province,
            city,
            area,
            street,
            $reset
        };
    },
    { persist: true }
);
