<template>
    <div class="container">
        <el-container>
            <el-aside width="auto" class="aside">
                <el-scrollbar>
                    <el-menu :default-active="$route.path" router>
                        <el-menu-item index="/home">
                            <i class="el-icon">
                                <SvgIcon name="home"></SvgIcon>
                            </i>
                            <span>首页</span>
                        </el-menu-item>
                        <el-sub-menu
                            index="attraction"
                            v-if="userRole === 'ROLE_ADMIN' || userRole === 'ROLE_STAFF'"
                        >
                            <template #title>
                                <i class="el-icon">
                                    <SvgIcon name="camera"></SvgIcon>
                                </i>
                                <span>景点管理</span>
                            </template>
                            <el-menu-item index="/attractions">
                                <i class="el-icon">
                                    <SvgIcon name="image"></SvgIcon>
                                </i>
                                <span>景点列表</span>
                            </el-menu-item>
                            <el-menu-item index="/review" v-if="userRole === 'ROLE_ADMIN'">
                                <i class="el-icon">
                                    <SvgIcon name="bulb"></SvgIcon>
                                </i>
                                <span>景点审核</span>
                            </el-menu-item>
                            <el-menu-item
                                index="/publish_attractions"
                                v-if="userRole === 'ROLE_STAFF'"
                            >
                                <i class="el-icon">
                                    <SvgIcon name="bulb"></SvgIcon>
                                </i>
                                <span>发布景点</span>
                            </el-menu-item>
                        </el-sub-menu>
                        <el-menu-item index="/orders" v-if="userRole === 'ROLE_ADMIN'">
                            <i class="el-icon">
                                <SvgIcon name="order"></SvgIcon>
                            </i>
                            <span>订单管理</span>
                        </el-menu-item>
                        <el-sub-menu index="posts" v-if="userRole === 'ROLE_ADMIN'">
                            <template #title>
                                <i class="el-icon">
                                    <SvgIcon name="document"></SvgIcon>
                                </i>
                                <span>动态管理</span>
                            </template>
                            <el-menu-item index="/posts">
                                <i class="el-icon">
                                    <SvgIcon name="book"></SvgIcon>
                                </i>
                                <span>动态列表</span>
                            </el-menu-item>
                        </el-sub-menu>
                        <el-sub-menu
                            index="messages"
                            v-if="userRole === 'ROLE_ADMIN' || userRole === 'ROLE_STAFF'"
                        >
                            <template #title>
                                <i class="el-icon">
                                    <SvgIcon name="message" />
                                </i>
                                <span>消息管理</span>
                            </template>
                            <el-menu-item index="/comments" v-if="userRole === 'ROLE_ADMIN'">
                                <i class="el-icon">
                                    <SvgIcon name="comment" />
                                </i>
                                <span>评论列表</span>
                            </el-menu-item>
                            <el-menu-item index="/announcements" v-if="userRole === 'ROLE_ADMIN'">
                                <i class="el-icon">
                                    <SvgIcon name="alert" />
                                </i>
                                <span>系统公告列表</span>
                            </el-menu-item>
                            <el-menu-item index="/attraction_announcements" v-if="userRole === 'ROLE_STAFF'">
                                <i class="el-icon">
                                    <SvgIcon name="alert" />
                                </i>
                                <span>景点公告列表</span>
                            </el-menu-item>
                        </el-sub-menu>
                        <el-sub-menu index="users">
                            <template #title>
                                <i class="el-icon">
                                    <SvgIcon name="team" />
                                </i>
                                <span>用户管理</span>
                            </template>
                            <el-menu-item index="/users" v-if="userRole === 'ROLE_ADMIN'">
                                <i class="el-icon">
                                    <SvgIcon name="user" />
                                </i>
                                <span>用户列表</span>
                            </el-menu-item>
                            <el-menu-item index="/userInfo">
                                <i class="el-icon">
                                    <SvgIcon name="user" />
                                </i>
                                <span>个人信息管理</span>
                            </el-menu-item>
                        </el-sub-menu>
                        <el-menu-item index="/settings" v-if="userRole === 'ROLE_ADMIN'">
                            <i class="el-icon">
                                <SvgIcon name="setting" />
                            </i>
                            <span>系统管理</span>
                        </el-menu-item>
                    </el-menu>
                </el-scrollbar>
            </el-aside>
            <el-container>
                <el-header class="header">
                    <div class="left">
                        <div>
                            {{ welcome }}
                        </div>
                    </div>
                    <div class="right">
                        <div class="toggleDark">
                            <el-switch v-model="isDark" @update="toggleDark" class="switch">
                                <template #active-action>
                                    <el-icon color="#000"><i-ep-moon /></el-icon>
                                </template>
                                <template #inactive-action>
                                    <el-icon color="#000"><i-ep-sunny /></el-icon>
                                </template>
                            </el-switch>
                        </div>
                        <el-button type="info" @click="exit">退出</el-button>
                    </div>
                </el-header>
                <el-main class="main">
                    <router-view></router-view>
                </el-main>
                <el-footer class="footer">
                    <div>
                        Copyright&copy;2024, www.traveler.soldiersoft.com. All rights reserved.
                    </div>
                </el-footer>
            </el-container>
        </el-container>
    </div>
    <el-backtop :right="100" :bottom="100" />
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import router from '@/router';
import { ElMessage } from 'element-plus';
import { jwtDecode, type JwtPayload } from 'jwt-decode';
import { useDark, useToggle } from '@vueuse/core';

const isDark = useDark();
const toggleDark = useToggle(isDark);

const userRole = ref('');

const authStore = useAuthStore();

onMounted(() => {
    const token = authStore.token;
    userRole.value = jwtDecode<JwtPayload>(token).aud![0];
});

const welcome = computed(() => {
    if (userRole.value === 'ROLE_ADMIN') {
        return '系统管理员后台管理系统';
    } else if (userRole.value === 'ROLE_STAFF') {
        return '景点管理员后台管理系统';
    } else if (userRole.value === 'ROLE_TOURIST') {
        return '游客用户个人中心';
    }
});

const exit = () => {
    router.push('/');
    ElMessage({ message: '退出成功', type: 'success' });
};
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    min-height: 100vh;
}

.aside {
    min-width: 20rem;
    justify-content: center;
    align-items: center;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
}

.el-menu {
    border-right: 0 !important;
    user-select: none;
}

.el-sub-menu__title span {
    font-size: 1.4rem;
}

.el-menu-item {
    font-size: 1.4rem;
}

.header {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 1rem 2rem;

    .left {
        font: 600 2rem '微软雅黑';
    }

    .right {
        display: flex;
        margin-left: auto;

        .toggleDark {
            padding-right: 2rem;

            .switch {
                --el-switch-on-color: #2f2f2f;
                --el-switch-off-color: #f1f1f1;
            }

            &:hover {
                --el-switch-border-color: var(--el-color-primary);
            }
        }
    }
}

.main {
    display: flex;
    width: 100%;
    flex-direction: column;
}

.footer {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    min-height: 5rem;
    width: 100%;
    gap: 1rem 0;
    border-top: 1px solid #d6d6d6;
}

.top-header {
    display: flex;
    align-items: center;
    padding: 1rem 2rem;
    height: 6rem;
    box-shadow: 0 0.3rem 0.3rem -0.3rem #0000001a;
}
</style>
