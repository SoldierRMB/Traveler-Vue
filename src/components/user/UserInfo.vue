<template>
    <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        class="form"
        label-width="auto"
        status-icon
        @submit.prevent
    >
        <div class="formItems">
            <el-form-item label="用户名" prop="username">
                <el-input placeholder="请输入密码" v-model="form.username" disabled />
            </el-form-item>
            <el-form-item label="旧密码" prop="oldPassword">
                <el-input placeholder="请输入旧密码" type="password" v-model="form.oldPassword" />
            </el-form-item>
            <el-form-item label="新密码" prop="newPassword">
                <el-input placeholder="请输入新密码" type="password" v-model="form.newPassword" />
            </el-form-item>
            <el-form-item label="确认新密码" prop="confirmNewPassword">
                <el-input placeholder="请输入再次输入新密码" type="password" v-model="form.confirmNewPassword" />
            </el-form-item>
        </div>
        <el-button type="primary" class="button" @click="changePassword(formRef)">
            修改密码
        </el-button>
    </el-form>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus';
import type { PasswordVO } from '@/types/interfaces';
import { useAuthStore } from '@/stores/auth';
import { apiChangePassword } from '@/api/user';

const formRef = ref<FormInstance>();
const form = ref({} as PasswordVO);
const authStore = useAuthStore();
const username = authStore.user?.sub;

const validateConfirmNewPassword = (rule: any, value: any, callback: any) => {
    if (!value) {
        callback(new Error('请再次输入新密码'));
    } else if (value !== form.value.newPassword) {
        callback(new Error('两次输入密码不一致!'));
    }
    callback();
};

const rules = reactive<FormRules<PasswordVO>>({
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    oldPassword: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
    newPassword: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
    confirmNewPassword: [{ required: true, validator: validateConfirmNewPassword, trigger: 'blur' }]
});

onMounted(() => {
    form.value.username = username as string;
});

const changePassword = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate(async (valid, fields) => {
        if (valid) {
            const res = await apiChangePassword(form.value, username as string);
            if (res.status === 200) {
                ElMessage.success('密码修改成功');
            } else {
                ElMessage.error('密码不匹配');
            }
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
        width: 60%;
        transform: translateX(-6%);

        .button {
            text-align: end;
        }
    }
}
</style>
