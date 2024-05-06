import request from '@/utils/request';

export const apiLogin = async (data: any) => {
    return await request.post('/user/login', data);
};

export const apiGetUserIsPresent = async (username: string) => {
    return await request.get('/user/getUserIsPresent', { params: { username } });
};

export const apiSendCode = async (data: any) => {
    return await request.post('/user/sendCode', data);
};

export const apiRegister = async (data: any) => {
    return await request.post('/user/register', data);
};

export const apiChangePassword = async (data: any, username: string) => {
    return await request.put('/user/changePassword', data, { params: { username } });
};
