import request from '@/utils/request';
import type { AttractionVO } from '@/types/interfaces';

export const apiUpdateAttraction = async (data: AttractionVO, username: string) => {
    return await request.put('/staff/updateAttraction', data, { params: { username: username } });
};

export const apiDeleteAttraction = async (attractionId: number, username: string) => {
    return await request.put('/staff/deleteAttraction', null, {
        params: { attractionId: attractionId, username: username }
    });
};

export const apiRestoreAttraction = async (attractionId: number, username: string) => {
    return await request.put('/staff/restoreAttraction', null, {
        params: { attractionId: attractionId, username: username }
    });
};

export const apiPublishAttraction = async (data: AttractionVO, username: string) => {
    return await request.post('/staff/publishAttraction', data, { params: { username: username } });
};

export const apiGetAttractionsByUsername = async (username: string) => {
    return await request.get('/staff/getUserAttractionsByUsername', {
        params: { username: username }
    });
};
