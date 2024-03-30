import request from '@/utils/request';

export const apiGetAttractions = async () => {
    return await request.get('/guest/getAttractions');
};
