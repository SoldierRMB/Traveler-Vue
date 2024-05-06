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
            path: '/register',
            name: 'Register',
            component: () => import('@/views/user/Register.vue'),
            meta: { title: '【行者】注册' }
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
                }
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
                    component: () => import('@/components/order/Orders.vue'),
                    meta: { title: '订单列表', roles: ['ROLE_ADMIN', 'ROLE_STAFF'] }
                },
                {
                    path: '/orders/:id',
                    name: 'OrderDetails',
                    component: () => import('@/components/order/OrderDetails.vue'),
                    meta: { title: '订单详情', roles: ['ROLE_ADMIN', 'ROLE_STAFF'] }
                },
                {
                    path: '/posts',
                    name: 'Posts',
                    component: () => import('@/components/post/Posts.vue'),
                    meta: { title: '旅游动态列表', roles: ['ROLE_ADMIN'] }
                },
                {
                    path: '/comments',
                    name: 'Comments',
                    component: () => import('@/components/comment/Comments.vue'),
                    meta: { title: '评论列表', roles: ['ROLE_ADMIN'] }
                },
                {
                    path: '/announcements',
                    name: 'Announcements',
                    component: () => import('@/components/announcement/Announcements.vue'),
                    meta: { title: '系统公告列表', roles: ['ROLE_ADMIN'] }
                },
                {
                    path: '/attraction_announcements',
                    name: 'AttractionAnnouncements',
                    component: () => import('@/components/announcement/AttractionAnnouncements.vue'),
                    meta: { title: '景点公告列表', roles: ['ROLE_STAFF'] }
                },
                {
                    path: '/users',
                    name: 'Users',
                    component: () => import('@/components/user/Users.vue'),
                    meta: { title: '用户列表', roles: ['ROLE_ADMIN'] }
                },
                {
                    path: '/user_info',
                    name: 'UserInfo',
                    component: () => import('@/components/user/UserInfo.vue'),
                    meta: { title: '个人信息' }
                },
                {
                    path: '/settings',
                    name: 'Settings',
                    component: () => import('@/components/setting/Settings.vue'),
                    meta: { title: '系统设置', roles: ['ROLE_ADMIN'] }
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
