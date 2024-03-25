import request from '@/utils/request';

export const apiGetAllProvinces = async () => {
    return await request.get('/common/getAllProvinces');
};

export const apiGetCitiesByProvinceCode = async (provinceCode: number) => {
    return await request.get('/common/getCitiesByProvinceCode', { params: { provinceCode } });
};
