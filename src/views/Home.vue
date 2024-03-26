<template>
    <div class="container">
        <el-container>
            <el-aside width="auto" class="aside">
                <el-scrollbar>
                    <el-menu default-active="/home" router>
                        <el-menu-item index="/home">
                            <i class="el-icon">
                                <SvgIcon name="home"></SvgIcon>
                            </i>
                            <span>首页</span>
                        </el-menu-item>
                        <el-sub-menu index="1">
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
                            <el-menu-item index="/review">
                                <i class="el-icon">
                                    <SvgIcon name="bulb"></SvgIcon>
                                </i>
                                <span>景点审核</span>
                            </el-menu-item>
                        </el-sub-menu>
                        <el-sub-menu index="2">
                            <template #title>
                                <i class="el-icon">
                                    <SvgIcon name="document"></SvgIcon>
                                </i>
                                <span>动态管理</span>
                            </template>
                            <el-menu-item index="/article-list">
                                <i class="el-icon">
                                    <SvgIcon name="article-list"></SvgIcon>
                                </i>
                                <span>动态列表</span>
                            </el-menu-item>
                        </el-sub-menu>
                        <el-sub-menu index="3">
                            <template #title>
                                <i class="el-icon">
                                    <SvgIcon name="message"></SvgIcon>
                                </i>
                                <span>消息管理</span>
                            </template>
                            <el-menu-item index="/comments">
                                <i class="el-icon">
                                    <SvgIcon name="comment"></SvgIcon>
                                </i>
                                <span>评论管理</span>
                            </el-menu-item>
                        </el-sub-menu>
                        <el-sub-menu index="4">
                            <template #title>
                                <i class="el-icon">
                                    <SvgIcon name="team"></SvgIcon>
                                </i>
                                <span>用户管理</span>
                            </template>
                            <el-menu-item index="/user">
                                <i class="el-icon">
                                    <SvgIcon name="user"></SvgIcon>
                                </i>
                                <span>角色管理</span>
                            </el-menu-item>
                        </el-sub-menu>
                        <el-menu-item index="/settings">
                            <i class="el-icon">
                                <SvgIcon name="setting"></SvgIcon>
                            </i>
                            <span>系统管理</span>
                        </el-menu-item>
                    </el-menu>
                </el-scrollbar>
            </el-aside>
            <el-container>
                <el-header class="header">
                    <div class="left">
                        <div>后台管理系统</div>
                    </div>
                    <div class="right">
                        <el-button type="info" @click="logout">退出</el-button>
                    </div>
                </el-header>
                <el-main class="main">
                    <router-view></router-view>
                </el-main>
                <el-footer class="footer">
                    <div>
                        Copyright&copy;2024, www.traveler.soldiersoft.com. All rights reserved.
                    </div>
                    <div>全国旅游投诉热线12345</div>
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

const store = useAuthStore();

interface User {
    authorities: string[];
    exp: number;
    iat: number;
    nbf: number;
    username: string;
}
const user = store.user as User;
const userRole = user.authorities[0];
console.log(userRole);


const logout = () => {
    store.$reset();
    router.push('/').then(() => {
        window.location.reload();
        ElMessage({ message: '退出成功', type: 'success' });
    });
};
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    min-height: 100vh;
}

.aside {
    justify-content: center;
    align-items: center;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
}

.el-menu {
    border-right: 0 !important;
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
        margin-left: auto;
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
