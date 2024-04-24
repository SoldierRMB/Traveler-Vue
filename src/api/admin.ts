import request from '@/utils/request';

export const apiGetUserAttractions = async () => {
    return await request.get('/admin/getUserAttractions');
};

export const apiGetUnreviewedUserAttractions = async () => {
    return await request.get('/admin/getUnreviewedUserAttractions');
};

export const apiReviewAttractions = async (data: number[], pass: boolean) => {
    return await request.put('/admin/reviewAttractions', data, { params: { pass } });
};

export const apiCompleteDeleteUserAttraction = async (attractionId: number) => {
    return await request.delete('/admin/completeDeleteUserAttraction', {
        params: { attractionId }
    });
};

export const apiGetAllOrders = async (current: number, size: number) => {
    return await request.get('/admin/getAllOrders', {
        params: { current, size }
    });
};

export const apiGetUserRoles = async (current: number, size: number) => {
    return await request.get('/admin/getUserRoles', {
        params: { current, size }
    });
};
