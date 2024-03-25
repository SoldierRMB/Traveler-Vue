import request from '@/utils/request';

export const apiLogin = async (data: any) => {
    return await request.post('/user/login', data);
};
