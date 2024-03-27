import request from '@/utils/request';

export const apiGetAllUserAttractions = async () => {
    return await request.get('/admin/getAllUserAttractions');
};

export const apiGetAllUnreviewedAttractions = async () => {
    return await request.get('/admin/getAllUnreviewedAttractions');
};

export const apiReviewViewpoints = async (data: any) => {
    return await request.put('/admin/reviewViewpoints', data);
};
