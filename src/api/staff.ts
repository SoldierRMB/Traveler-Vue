import request from '@/utils/request';
import type { AttractionVO } from '@/types/interfaces';

export const apiPostAttraction = async (data: AttractionVO, username: string) => {
    return await request.post('/staff/postAttraction', data, { params: { username: username } });
};
