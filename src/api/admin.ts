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

export const apiGetOrdersByAttractionId = async (
    current: number,
    size: number,
    attractionId: number
) => {
    return await request.get('/admin/getOrdersByAttractionId', {
        params: { current, size, attractionId }
    });
};

export const apiGetUserRoles = async (current: number, size: number) => {
    return await request.get('/admin/getUserRoles', {
        params: { current, size }
    });
};

export const apiCompleteDeletePost = async (postId: number) => {
    return await request.delete('/admin/completeDeletePost', {
        params: { postId }
    });
};

export const apiGetComments = async (current: number, size: number) => {
    return await request.get('/admin/getComments', {
        params: { current, size }
    });
};

export const apiCompleteDeleteComment = async (commentId: number) => {
    return await request.delete('/admin/completeDeleteComment', {
        params: { commentId }
    });
};

export const apiPublishAnnouncement = async (data: any) => {
    return await request.post('/admin/publishAnnouncement', data);
};

export const apiUpdateAnnouncement = async (data: any) => {
    return await request.put('/admin/updateAnnouncement', data);
};

export const apiCompleteDeleteAnnouncement = async (announcementId: number) => {
    return await request.delete('/admin/completeDeleteAnnouncement', {
        params: { announcementId }
    });
};
