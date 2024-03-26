import request from '@/utils/request';

export const apiGetAllAttractions = async () => {
    return await request.get('/common/getAllAttractions');
};

