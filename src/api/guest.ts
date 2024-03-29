import request from '@/utils/request';

export const apiGetAttractions = async () => {
    return await request.get('/guest/getAttractions');
};

export const apiGetProvinces = async () => {
    return await request.get('/guest/getProvinces');
};

export const apiGetCitiesByProvinceCode = async (provinceCode: number) => {
    return await request.get('/guest/getCitiesByProvinceCode', { params: { provinceCode } });
};
