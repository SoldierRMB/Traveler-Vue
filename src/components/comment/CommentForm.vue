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
            <el-form-item label="评论内容" prop="content">
                <el-input
                    placeholder="请填写内容"
                    v-model="form.content"
                    type="textarea"
                    :autosize="{ minRows: 4, maxRows: 4 }"
                    resize="none"
                />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleClick(formRef)">发布评论</el-button>
            </el-form-item>
        </div>
    </el-form>
</template>

<script setup lang="ts">
import type { CommentVO } from '@/types/interfaces';
import type { FormInstance, FormRules } from 'element-plus';
import { apiPublishComment } from '@/api/tourist';
import { useAuthStore } from '@/stores/auth';

const formRef = ref<FormInstance>();
const form = ref({} as CommentVO);
const authStore = useAuthStore();
const username = authStore.user?.sub;
const props = defineProps({
    postId: Number
});
const emits = defineEmits(['closeDialog']);

onMounted(()=>{
    if(props.postId){
        form.value.postId = props.postId;
    }
})

const rules = reactive<FormRules<CommentVO>>({
    content: [{ required: true, message: '请填写内容', trigger: 'blur' }]
});

const handleClick = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate(async (valid, fields) => {
        if (valid) {
            const res = await apiPublishComment(form.value, username as string);
            if (res.status === 200) {
                ElMessage.success('评论发布成功');
                emits('closeDialog', false);
            } else {
                ElMessage.error('评论发布失败');
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
