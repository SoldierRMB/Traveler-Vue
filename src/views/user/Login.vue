<template>
    <div class="login">
        <transition name="el-zoom-in-top" appear>
            <el-card class="loginCard">
                <template #header>
                    <div class="loginCardHeader">行者旅游在线预订平台</div>
                </template>
                <el-form
                    ref="loginFormRef"
                    :model="loginForm"
                    :rules="rules"
                    label-width="auto"
                    class="loginForm"
                >
                    <div class="formItems">
                        <el-form-item label="用户名" prop="username">
                            <el-input
                                placeholder="请输入用户名"
                                :maxLength="20"
                                v-model="loginForm.username"
                            />
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input
                                placeholder="请输入密码"
                                type="password"
                                show-password
                                v-model="loginForm.password"
                            />
                        </el-form-item>
                    </div>
                    <div class="buttons">
                        <el-button type="primary" @click="login()">登录</el-button>
                        <el-button @click="reset(loginFormRef)">重置</el-button>
                    </div>
                </el-form>
                <router-link to="/register">
                    <el-button link type="primary" class="registerButton">没有账号？点击注册</el-button>
                </router-link>
            </el-card>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import type { FormInstance, FormRules } from 'element-plus';
import { apiLogin } from '@/api/user';
import { useAuthStore } from '@/stores/auth';
import { jwtDecode, type JwtPayload } from 'jwt-decode';
import type { UserVO } from '@/types/interfaces';

const router = useRouter();

interface LoginRuleForm {
    username: string;
    password: string;
}

const loginFormRef = ref<FormInstance>();
const loginForm = reactive<LoginRuleForm>({
    username: '',
    password: ''
});

const rules = reactive<FormRules<LoginRuleForm>>({
    username: [
        {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
        }
    ],
    password: [
        {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
        }
    ]
});

const login = async () => {
    loginFormRef.value?.validate(async (validate) => {
        if (validate) {
            const response = await apiLogin({
                username: loginForm.username,
                password: loginForm.password
            });
            if (response.status === 200) {
                const token = response.data;
                const authStore = useAuthStore();
                authStore.$patch({ isAuthenticated: !!token });
                authStore.$patch({ token: token });
                const decode: UserVO = jwtDecode(token);
                authStore.$patch({ user: decode as JwtPayload });
                router.push('/');
                ElMessage.success('登录成功');
            } else {
                ElMessage.error(response.statusText);
            }
        } else {
            ElMessage.error('请输入完整信息');
        }
    });
};

const reset = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.resetFields();
};
</script>

<style scoped lang="scss">
.login {
    background-position: center center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    height: 100vh;
    display: flex;
    flex: auto;
    justify-content: center;
    align-items: center;

    .loginCard {
        margin: 0 2rem;

        .loginCardHeader {
            font-size: 1.6rem;
        }

        .formItems {
            flex: auto;
            padding: 0 2rem;

            .el-input {
                width: 20rem;
            }
        }

        .buttons {
            display: flex;
            justify-content: center;
            padding-top: 1rem;

            &:nth-child(2) {
                margin-left: 2rem;
            }
        }

        .registerButton {
            width: 100%;
            margin-top: 1rem;
            font-size: 1.2rem;
            text-align: center;
        }
    }
}
</style>
