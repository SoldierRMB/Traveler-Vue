import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { jwtDecode, type JwtPayload } from 'jwt-decode';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: () => import('@/views/user/Login.vue'),
            meta: { title: '【行者】登录' }
        },
        {
            path: '/',
            name: 'Index',
            component: () => import('@/views/Index.vue'),
            meta: { title: '行者旅游在线预订平台' },
            redirect: '/post',
            children: [
                {
                    path: '/post',
                    name: 'Post',
                    component: () => import('@/components/post/PostList.vue'),
                    meta: { title: '【行者】旅游攻略' }
                },
                {
                    path: '/booking',
                    name: 'Booking',
                    component: () => import('@/components/booking/BookingList.vue'),
                    meta: { title: '【行者】旅游订票' }
                },
            ]
        },
        {
            path: '/success/:orderId',
            name: 'Success',
            component: () => import('@/components/common/Success.vue'),
            props: (route) => ({ orderId: route.params.orderId }),
            meta: { title: '【行者】支付成功', roles: ['ROLE_TOURIST'] }
        },
        {
            path: '/home',
            name: 'Home',
            component: () => import('@/views/home/Index.vue'),
            meta: { title: '【行者】个人中心', requiresAuth: true },
            children: [
                {
                    path: '/attractions',
                    name: 'Attractions',
                    component: () => import('@/components/attraction/Attractions.vue'),
                    meta: { title: '景点列表', roles: ['ROLE_ADMIN', 'ROLE_STAFF'] }
                },
                {
                    path: '/review',
                    name: 'Review',
                    component: () => import('@/components/attraction/ReviewAttractions.vue'),
                    meta: { title: '景点审核', roles: ['ROLE_ADMIN'] }
                },
                {
                    path: '/publish_attractions',
                    name: 'PublishAttractions',
                    component: () => import('@/components/attraction/PublishAttraction.vue'),
                    meta: { title: '发布景点', roles: ['ROLE_STAFF'] }
                },
                {
                    path: '/attractions/:id',
                    name: 'AttractionDetails',
                    component: () => import('@/components/attraction/AttractionDetails.vue'),
                    meta: { title: '景点详情', roles: ['ROLE_ADMIN', 'ROLE_STAFF'] }
                },
                {
                    path: '/attractions/:id/tickets',
                    name: 'Tickets',
                    component: () => import('@/components/attraction/AttractionTickets.vue'),
                    meta: { title: '景点门票', roles: ['ROLE_STAFF'] }
                },
                {
                    path: '/orders',
                    name: 'Orders',
                    component: () => import('@/components/order/OrderList.vue'),
                    meta: { title: '订单管理', roles: ['ROLE_ADMIN', 'ROLE_STAFF'] }
                }
            ]
        },
        {
            path: '/403',
            name: '403',
            component: () => import('@/views/error/403.vue'),
            meta: { title: '403 Forbidden' }
        },
        {
            path: '/:catchAll(.*)',
            name: '404',
            component: () => import('@/views/error/404.vue'),
            meta: { title: '404 Not Found' }
        }
    ]
});

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    const isAuthenticated = authStore.isAuthenticated;
    const requiredRoles = (to.meta.roles as string[]) || [];
    if (to.meta.requiresAuth && isAuthenticated === false) {
        ElMessage.error('请先登录');
        next('/login');
    } else if (requiredRoles.length != 0) {
        const token = authStore.token;
        const userRole = jwtDecode<JwtPayload>(token).aud![0];
        if (!requiredRoles.includes(userRole)) {
            ElMessage.warning('您没有权限访问此页面');
            next('/403');
        } else {
            next();
        }
    } else {
        next();
    }
});

router.afterEach((to) => {
    document.title = to.meta.title as string;
});

export default router;
