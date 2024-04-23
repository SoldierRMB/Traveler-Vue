import request from '@/utils/request';
import type { AttractionVO } from '@/types/interfaces';

export const apiUpdateAttraction = async (data: AttractionVO, username: string) => {
    return await request.put('/staff/updateAttraction', data, { params: { username: username } });
};

export const apiDeleteAttraction = async (attractionId: number, username: string) => {
    return await request.put('/staff/deleteAttraction', null, {
        params: { attractionId, username }
    });
};

export const apiRestoreAttraction = async (attractionId: number, username: string) => {
    return await request.put('/staff/restoreAttraction', null, {
        params: { attractionId, username }
    });
};

export const apiPublishAttraction = async (data: AttractionVO, username: string) => {
    return await request.post('/staff/publishAttraction', data, { params: { username } });
};

export const apiGetAttractionsByUsername = async (username: string) => {
    return await request.get('/staff/getUserAttractionsByUsername', {
        params: { username }
    });
};

export const apiPublishTicket = async (data: any, username: string) => {
    return await request.post('/staff/publishTicket', data, {
        params: { username }
    });
};

export const apiGetTicketsByAttractionId = async (attractionId: number, username: string) => {
    return await request.get('/staff/getTicketsByAttractionId', {
        params: { attractionId, username }
    });
};

export const apiUpdateTicket = async (data: any, username: string) => {
    return await request.put('/staff/updateTicket', data, {
        params: { username }
    });
};

export const apiDeleteTicket = async (ticketId: number, username: string) => {
    return await request.put('/staff/deleteTicket', null, {
        params: { ticketId, username }
    });
};

export const apiGetOrdersByAttractionId = async (
    attractionId: number,
    username: string,
    current: number,
    size: number
) => {
    return await request.get('/staff/getOrdersByAttractionId', {
        params: { attractionId, username, current, size }
    });
};

export const apiUploadAttractionImage = async (formData: FormData) => {
    return await request.post('/staff/uploadAttractionImage', formData);
};

export const apiUpdateAttractionImage = async (formData: FormData) => {
    return await request.put('/staff/updateAttractionImage', formData);
};
