import request from '@/utils/request';

export const apiGetTicketsByAttractionId = async (attractionId: number) => {
    return await request.get('/tourist/getTicketsByAttractionId', {
        params: { attractionId }
    });
};

export const apiBooking = async (data: any, username: string) => {
    return await request.post('/tourist/booking', data, { params: { username } });
};

export const apiCompletePayment = async (orderId: number, username: string) => {
    return await request.put('/tourist/completePayment', null, {
        params: { orderId, username }
    });
};

export const apiGetUserOrders = async (username: string, current: number, size: number) => {
    return await request.get('/tourist/getUserOrders', {
        params: { username, current, size }
    });
};
