import moment from 'moment';
import { apiGetPosts } from '@/api/common';

export const loadPosts = async (current: number, size: number) => {
    const res = await apiGetPosts(current, size);
    return {
        ...res.data,
        records: res.data.records.map((post: any) => ({
            ...post,
            postTime: moment(post.createTime).format('YYYY-MM-DD HH:mm:ss')
        }))
    };
};
