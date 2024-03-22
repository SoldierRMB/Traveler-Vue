import axios, { type AxiosInstance, type AxiosResponse } from 'axios';
const axiosInstance: AxiosInstance = axios.create({
	baseURL: 'http://localhost:8080',
	timeout: 5000,
});
//添加请求拦截器
axiosInstance.interceptors.request.use(
	(config) => {
		// 在发送请求之前做些什么
		const token = sessionStorage.getItem('token')
		if(token && !config.url?.includes('/login')){
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error: any) => {
		// 处理请求错误
		return Promise.reject(error);
	},
);
// 添加响应拦截器
axiosInstance.interceptors.response.use(
	(response: AxiosResponse) => {
		// 对响应数据做点什么
		return response;
	},
	(error: any) => {
		// 处理响应错误
		return Promise.reject(error);
	},
);
export default axiosInstance;
