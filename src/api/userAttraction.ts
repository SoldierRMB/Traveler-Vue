import request from '@/utils/request';

export const apiGetAllUserAttractions = async () => {
    return await request.get('/admin/getAllUserAttractions');
};
