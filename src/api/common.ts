import request from '@/utils/request';

export const apiGetProvinces = async () => {
    return await request.get('/common/getProvinces');
};

export const apiGetCitiesByProvinceCode = async (provinceCode: number) => {
    return await request.get('/common/getCitiesByProvinceCode', { params: { provinceCode } });
};

export const apiGetAreasByCityCode = async (cityCode: number) => {
    return await request.get('/common/apiGetAreasByCityCode', { params: { cityCode } });
};

export const apiGetStreetsByAreaCode = async (streetCode: number) => {
    return await request.get('/common/apiGetStreetsByAreaCode', { params: { streetCode } });
};
