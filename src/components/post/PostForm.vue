<template>
    <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="auto"
        class="form"
        status-icon
        @submit.prevent
    >
        <div class="formItems">
            <el-form-item label="旅游动态标题" prop="title">
                <el-input placeholder="请填写标题" v-model="form.title" />
            </el-form-item>
            <el-form-item label="旅游动态内容" prop="content">
                <el-input
                    placeholder="请填写内容"
                    v-model="form.content"
                    type="textarea"
                    :autosize="{ minRows: 4, maxRows: 4 }"
                    resize="none"
                />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleClick(formRef)">发布旅游动态</el-button>
            </el-form-item>
        </div>
    </el-form>
</template>

<script setup lang="ts">
import type { PostVO } from '@/types/interfaces';
import type { FormInstance, FormRules } from 'element-plus';
import { apiPublishPost } from '@/api/tourist';
import router from '@/router';
import { useAuthStore } from '@/stores/auth';

const formRef = ref<FormInstance>();
const form = ref({} as PostVO);
const authStore = useAuthStore();
const username = authStore.user?.sub;

const rules = reactive<FormRules<PostVO>>({
    title: [{ required: true, message: '请填写标题', trigger: 'blur' }],
    content: [{ required: true, message: '请填写内容', trigger: 'blur' }]
});

const handleClick = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate(async (valid, fields) => {
        if (valid) {
            const res = await apiPublishPost(form.value, username as string);
            if (res.status === 200) {
                ElMessage.success('旅游动态发布成功');
                router.push('/post');
                location.reload();
            } else {
                ElMessage.error('旅游动态发布失败');
            }
        }
    });
};
</script>

<style lang="scss" scoped>
.form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .formItems {
        transform: translateX(-6%);
        min-width: 50rem;
    }
}
</style>
