<template>
    <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        class="form"
        label-width="80px"
        status-icon
        @submit.prevent
    >
        <div class="formItems">
            <el-form-item label="用户名" prop="username">
                <el-input placeholder="请输入密码" v-model="form.username" disabled />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input placeholder="请输入密码" v-model="form.password" />
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPassword">
                <el-input placeholder="请输入再次输入密码" v-model="form.confirmPassword" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="changePassword(formRef)">提交</el-button>
            </el-form-item>
        </div>
    </el-form>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus';
import type { PasswordVO } from '@/types/interfaces';
import { useAuthStore } from '@/stores/auth';

const formRef = ref<FormInstance>();
const form = ref({} as PasswordVO);
const authStore = useAuthStore();
const username = authStore.user?.sub;

const validatePassword = (rule: any, value: any, callback: any) => {
    if (!value) {
        callback(new Error('请输入密码'));
    } else {
        if (form.value.password !== '') {
            if (!formRef.value) return;
            formRef.value.validateField('password', () => null);
        }
        callback();
    }
};

const validateConfirmPassword = (rule: any, value: any, callback: any) => {
    if (!value) {
        callback(new Error('请再次输入密码'));
    } else if (value !== form.value.password) {
        callback(new Error('两次输入密码不一致!'));
    } else {
        callback();
    }
};

const rules = reactive<FormRules<PasswordVO>>({
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ required: true, validator: validatePassword, trigger: 'blur' }],
    confirmPassword: [{ required: true, validator: validateConfirmPassword, trigger: 'blur' }]
});

onMounted(() => {
    form.value.username = username as string;
});

const changePassword = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate(async (valid, fields) => {
        if (valid) {
            console.log('submit!');
        } else {
            console.log('error submit!');
            return false;
        }
    });
};
</script>

<style lang="scss" scoped>
.form {
    display: flex;
    flex-direction: column;
    align-items: center;

    .formItems {
        width: 50rem;
        transform: translateX(-15%);
    }
}
</style>
