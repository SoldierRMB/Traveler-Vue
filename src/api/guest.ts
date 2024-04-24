import request from '@/utils/request';

export const apiGetAttractions = async () => {
    return await request.get('/guest/getAttractions');
};

export const apiGetPosts = async (current: number, size: number) => {
    return await request.get('/guest/getPosts', { params: { current, size } });
};
