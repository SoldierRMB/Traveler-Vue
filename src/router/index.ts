import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/Login.vue'),
            meta: { title: '【行者】登录' }
        },
        {
            path: '/',
            name: 'index',
            component: () => import('@/views/Index.vue'),
            meta: { title: '行者旅游在线预订平台' }
        },
        {
            path: '/home',
            name: 'home',
            component: () => import('@/views/Home.vue'),
            meta: { title: '【行者】个人中心' }
        },
        {
            path: '/:catchAll(.*)',
            name: '404',
            component: () => import('@/views/error/404.vue'),
            meta: { title: '找不到了哦' }
        }
    ]
});

export default router;
