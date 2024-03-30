import request from '@/utils/request';

export const apiLogin = async (data: any) => {
    return await request.post('/user/login', data);
};

export const apiGetUserIsPresent = async (username: string) => {
    return await request.get('/user/getUserIsPresent', { params: { username } });
};
