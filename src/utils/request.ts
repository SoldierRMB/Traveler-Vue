import axios, { type AxiosInstance, type AxiosResponse } from 'axios';
import { useAuthStore } from '@/stores/auth';

const axiosInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_TRAVELER_BASE_URL,
    timeout: 5000
});

interface Response<T = any> {
    flag: boolean;
    code: number;
    message: string;
    data: T;
}

const whitelist = ['/user', '/common'];

// 添加请求拦截器
axiosInstance.interceptors.request.use(
    (config) => {
        // 在发送请求之前做些什么
        const store = useAuthStore();
        const token = store.token;
        const isInWhitelist = whitelist.some((path) => config.url?.startsWith(path));
        if (!isInWhitelist && token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: any) => {
        // 处理请求错误
        return Promise.reject(error);
    }
);

let lastErrorTimestamp = 0;

// 添加响应拦截器
axiosInstance.interceptors.response.use(
    (response: AxiosResponse<Response>) => {
        // 对响应数据做点什么
        const data: Response = response.data;
        return {
            ...response,
            data: data.data,
            status: data.code,
            statusText: data.message
        };
    },
    (error: any) => {
        // 处理响应错误
        const currentTimestamp = Date.now();
        const timeSinceLastError = currentTimestamp - lastErrorTimestamp;
        if (timeSinceLastError > 5000) {
            if (error.code === 'ERR_NETWORK') {
                ElMessage.error('网络连接错误');
            } else {
                ElMessage.error(error.response?.data.message || '请求失败');
            }
            lastErrorTimestamp = currentTimestamp;
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
