import request from '@/utils/request';

export const apiGetTicketsByAttractionId = async (attractionId: number) => {
    return await request.get('/tourist/getTicketsByAttractionId', {
        params: { attractionId }
    });
};

export const apiBooking = async (data: any, username: string) => {
    return await request.post('/tourist/booking', data, { params: { username } });
};

export const apiCompletePayment = async (orderId: string, username: string) => {
    return await request.put('/tourist/completePayment', null, {
        params: { orderId, username }
    });
};

export const apiGetUserOrders = async (username: string, current: number, size: number) => {
    return await request.get('/tourist/getUserOrders', {
        params: { username, current, size }
    });
};

export const apiCancelOrder = async (orderId: string, username: string) => {
    return await request.put('/tourist/cancelOrder', null, {
        params: { orderId, username }
    });
};

export const apiPublishPost = async (data: any, username: string) => {
    return await request.post('/tourist/publishPost', data, { params: { username } });
};

export const apiRateCompleteOrder = async (data: any, username: string) => {
    return await request.post('/tourist/rateCompleteOrder', data, { params: { username } });
};

export const apiDeleteOrder = async (orderId: string, username: string) => {
    return await request.put('/tourist/deleteOrder', null, {
        params: { orderId, username }
    });
};

export const apiPublishComment = async (data: any, username: string) => {
    return await request.post('/tourist/publishComment', data, { params: { username } });
};
