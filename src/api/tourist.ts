import request from '@/utils/request';

export const apiGetTicketsByAttractionId = async (attractionId: number) => {
    return await request.get('/tourist/getTicketsByAttractionId', {
        params: { attractionId: attractionId }
    });
};

export const apiBooking = async (data: any, username: string) => {
    return await request.post('/tourist/booking', data, { params: { username: username } });
};

export const apiCompletePayment = async (orderId: number, username: string) => {
    return await request.put('/tourist/completePayment', null, {
        params: { orderId: orderId, username: username }
    });
};

export const apiGetUserOrders = async (username: string) => {
    return await request.get('/tourist/getUserOrders', { params: { username: username } });
};
