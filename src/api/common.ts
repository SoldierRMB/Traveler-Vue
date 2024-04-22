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

export const apiGetAttractionImageByAttractionId = async (attractionId: number) => {
    return await request.get('/common/getAttractionImageByAttractionId', {
        params: { attractionId }
    });
};
