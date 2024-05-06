<template>
    <div class="login">
        <transition name="el-zoom-in-top" appear>
            <el-card class="loginCard">
                <template #header>
                    <div class="loginCardHeader">行者旅游在线预订平台</div>
                </template>
                <el-form
                    ref="formRef"
                    :model="registerForm"
                    :rules="rules"
                    label-width="auto"
                    class="loginForm"
                >
                    <div class="formItems">
                        <el-form-item label="用户名" prop="username">
                            <el-input
                                placeholder="请输入用户名"
                                :maxLength="20"
                                v-model="registerForm.username"
                            />
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input
                                placeholder="请输入密码"
                                type="password"
                                show-password
                                v-model="registerForm.password"
                            />
                        </el-form-item>
                        <el-form-item label="确认密码" prop="confirmPassword">
                            <el-input
                                placeholder="请输入确认密码"
                                type="password"
                                show-password
                                v-model="registerForm.confirmPassword"
                            />
                        </el-form-item>
                        <el-form-item label="邮箱" prop="email">
                            <el-input placeholder="请输入邮箱" v-model="registerForm.email" />
                        </el-form-item>
                        <el-form-item label="验证码" prop="code">
                            <el-input placeholder="请输入验证码" v-model="registerForm.code">
                                <template #append>
                                    <el-button @click="sendCode(formRef)" :loading="loading"
                                        >发送</el-button
                                    >
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="昵称" prop="nickname">
                            <el-input placeholder="请输入昵称" v-model="registerForm.nickname" />
                        </el-form-item>
                        <el-form-item label="用户类型" prop="userType">
                            <el-radio-group v-model="registerForm.userType">
                                <el-radio label="游客用户" value="3">游客用户</el-radio>
                                <el-radio label="景点管理员" value="2">景点管理员</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </div>
                    <div class="buttons">
                        <el-button type="primary" @click="register(formRef)">注册</el-button>
                        <el-button @click="reset(formRef)">重置</el-button>
                    </div>
                </el-form>
                <router-link to="/login">
                    <el-button link type="primary" class="registerButton"
                        >已有账号？点击登录</el-button
                    >
                </router-link>
            </el-card>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import type { FormInstance, FormRules } from 'element-plus';
import { apiSendCode, apiRegister, apiLogin } from '@/api/user';
import { useAuthStore } from '@/stores/auth';
import { jwtDecode, type JwtPayload } from 'jwt-decode';
import type { RegisterVO, UserVO } from '@/types/interfaces';

const router = useRouter();

const formRef = ref<FormInstance>();
const registerForm = ref({} as RegisterVO);
const loading = ref(false);

const validatePassword = (rule: any, value: any, callback: any) => {
    if (!value) {
        callback(new Error('请输入密码'));
    } else if (value.length < 6) {
        callback(new Error('密码长度不能小于6位'));
    } else {
        if (registerForm.value.password !== '') {
            if (!formRef.value) return;
            formRef.value.validateField('password', () => callback());
        }
        callback();
    }
};

const validateConfirmPassword = (rule: any, value: any, callback: any) => {
    if (!value) {
        callback(new Error('请再次输入密码'));
    } else if (value !== registerForm.value.password) {
        callback(new Error('两次输入密码不一致!'));
    } else {
        callback();
    }
};

const validateEmail = (rule: any, value: any, callback: any) => {
    const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if (!value) {
        callback(new Error('请输入邮箱'));
    } else if (!reg.test(value)) {
        callback(new Error('请输入正确的邮箱格式'));
    } else {
        if (!formRef.value) return;
        formRef.value.validateField('email', () => callback());
    }
    callback();
};

const rules = reactive<FormRules<RegisterVO>>({
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ required: true, validator: validatePassword, trigger: 'blur' }],
    confirmPassword: [{ required: true, validator: validateConfirmPassword, trigger: 'blur' }],
    email: [{ required: true, validator: validateEmail, trigger: 'blur' }],
    code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
    nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
    userType: [{ required: true, message: '请选择用户类型', trigger: 'change' }]
});

const sendCode = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validateField('email', async (valid) => {
        if (valid) {
            loading.value = true;
            await apiSendCode({ email: registerForm.value.email }).then((res) => {
                if (res.status === 200) {
                    ElMessage.success('邮箱验证码发送成功');
                } else {
                    ElMessage.error('邮箱验证码发送失败');
                }
                loading.value = false;
            });
        } else {
            ElMessage.error('请输入邮箱');
        }
    });
};

const register = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate(async (valid, fields) => {
        if (valid) {
            const registerRes = await apiRegister(registerForm.value);
            if (registerRes.status === 200) {
                const loginRes = await apiLogin({
                    username: registerForm.value.username,
                    password: registerForm.value.password
                });
                if (loginRes.status === 200) {
                    const token = loginRes.data;
                    const authStore = useAuthStore();
                    authStore.$patch({ isAuthenticated: !!token });
                    authStore.$patch({ token: token });
                    const decode: UserVO = jwtDecode(token);
                    authStore.$patch({ user: decode as JwtPayload });
                    router.push('/');
                    ElMessage.success('注册成功');
                } else {
                    ElMessage.error('登录失败');
                }
            } else {
                ElMessage.error(registerRes.statusText);
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
