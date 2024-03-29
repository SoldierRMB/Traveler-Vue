import router from '@/router';
import moment from 'moment';
import { apiGetUserAttractions, apiGetUnreviewedUserAttractions } from '@/api/admin';
import { useUserAttractionStore } from '@/stores/user-attraction';
import type { UserAttractionVO } from '@/types/interfaces';

export async function loadUserAttractions(reviewed: boolean): Promise<UserAttractionVO[]> {
    const userAttractions: UserAttractionVO[] = [];
    let data;
    if (reviewed) {
        data = (await apiGetUserAttractions()).data;
    } else {
        data = (await apiGetUnreviewedUserAttractions()).data;
    }
    data.forEach((userAttraction: any) => {
        userAttractions.push({
            userVO: userAttraction.userVO,
            attractionVO: userAttraction.attractionVO,
            provinceVO: userAttraction.provinceVO,
            cityVO: userAttraction.cityVO,
            areaVO: userAttraction.areaVO,
            streetVO: userAttraction.streetVO,
            createTime: moment(userAttraction.attractionVO.createTime).format('YYYY-MM-DD'),
            updateTime: moment(userAttraction.attractionVO.updateTime).format('YYYY-MM-DD')
        });
    });
    return userAttractions;
}

export function goToAttractionDetails(row: any): void {
    const store = useUserAttractionStore();
    store.$reset();
    store.$patch({ attraction: row.attractionVO });
    store.$patch({ user: row.userVO });
    store.$patch({ province: row.provinceVO });
    store.$patch({ city: row.cityVO });
    store.$patch({ area: row.areaVO });
    store.$patch({ street: row.streetVO });
    const attractionId: string = row.attractionVO.id;
    router.push(`/attractions/${attractionId}`);
}
