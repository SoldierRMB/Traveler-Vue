import axios, { type AxiosInstance, type AxiosResponse } from 'axios';
import { ElMessage } from 'element-plus';
import { useAuthStore } from '@/stores/auth';
const axiosInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_TRAVELER_BASE_URL,
    timeout: 5000
});
const whitelist = ['/user', '/common'];
//添加请求拦截器
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
// 添加响应拦截器
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        // 对响应数据做点什么
        return response.data;
    },
    (error: any) => {
        // 处理响应错误
        if (error.code == 'ERR_NETWORK') {
            ElMessage.error('网络连接错误');
        } else {
            ElMessage.error(error.response?.data.message || '请求失败');
        }
        return Promise.reject(error);
    }
);
export default axiosInstance;
