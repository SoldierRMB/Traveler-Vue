import request from '@/utils/request';

export const apiGetProvinces = async () => {
    return await request.get('/common/getProvinces');
};

export const apiGetCitiesByProvinceCode = async (provinceCode: number) => {
    return await request.get('/common/getCitiesByProvinceCode', { params: { provinceCode } });
};

export const apiGetAreasByCityCode = async (cityCode: number) => {
    return await request.get('/common/getAreasByCityCode', { params: { cityCode } });
};

export const apiGetStreetsByAreaCode = async (areaCode: number) => {
    return await request.get('/common/getStreetsByAreaCode', { params: { areaCode } });
};

export const apiGetPositionByStreetCode = async (streetCode: number) => {
    return await request.get('/common/getPositionByStreetCode', { params: { streetCode } });
};

export const apiGetAttractions = async (current: number, size: number) => {
    return await request.get('/common/getAttractions', { params: { current, size } });
};

export const apiGetAttractionImageByAttractionId = async (attractionId: number) => {
    return await request.get('/common/getAttractionImageByAttractionId', {
        params: { attractionId }
    });
};

export const apiGetPosts = async (current: number, size: number) => {
    return await request.get('/common/getPosts', { params: { current, size } });
};

export const apiGetCommentsByPostId = async (postId: number, current: number, size: number) => {
    return await request.get('/common/getCommentsByPostId', { params: { postId, current, size } });
};

export const apiGetAnnouncements = async (current: number, size: number) => {
    return await request.get('/common/getAnnouncements', { params: { current, size } });
};

export const apiGetAttractionAnnouncementsByAttractionId = async (
    attractionId: number,
    current: number,
    size: number
) => {
    return await request.get('/common/getAttractionAnnouncementsByAttractionId', {
        params: { attractionId, current, size }
    });
};

export const apiGetAttractionsByKeyword = async (
    attractionName: string,
    cityCode: number,
    current: number,
    size: number
) => {
    return await request.get('/common/getAttractionsByKeyword', {
        params: { attractionName, cityCode, current, size }
    });
};
