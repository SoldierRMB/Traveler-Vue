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
            meta: { title: '【行者】个人中心' },
            children: [
                {
                    path: '/attractions',
                    name: 'attractions',
                    component: () => import('@/components/admin/Attractions.vue'),
                    meta: { title: '景点列表' }
                },
                {
                    path: '/attractions/:id',
                    name: 'attraction-details',
                    component: () => import('@/components/admin/AttractionDetails.vue'),
                    meta: { title: '景点详情' }
                },
                {
                    path: '/review',
                    name: 'review',
                    component: () => import('@/components/admin/ReviewAttractions.vue'),
                    meta: { title: '景点审核' }
                }
            ]
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
