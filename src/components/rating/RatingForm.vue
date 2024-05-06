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
            <el-form-item label="评价分数" prop="rating">
                <el-rate v-model="form.rating" :colors="colors" />
            </el-form-item>
            <el-form-item label="评价内容" prop="content">
                <el-input
                    placeholder="请填写内容"
                    v-model="form.content"
                    type="textarea"
                    :autosize="{ minRows: 4, maxRows: 4 }"
                    resize="none"
                />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleClick(formRef)">提交评价</el-button>
            </el-form-item>
        </div>
    </el-form>
</template>

<script setup lang="ts">
import type { RatingVO } from '@/types/interfaces';
import type { FormInstance, FormRules } from 'element-plus';
import { apiRateCompleteOrder } from '@/api/tourist';
import { useAuthStore } from '@/stores/auth';

const formRef = ref<FormInstance>();
const form = ref({} as RatingVO);
const authStore = useAuthStore();
const username = authStore.user?.sub;

const rules = reactive<FormRules<RatingVO>>({
    rating: [{ required: true, message: '请填写评分', trigger: 'blur' }],
    content: [{ required: true, message: '请填写内容', trigger: 'blur' }]
});

const colors = ref(['#99A9BF', '#F7BA2A', '#FF9900']);

const props = defineProps({
    orderId: Number
});
const emits = defineEmits(['closeDialog']);

onMounted(() => {
    if (props.orderId) {
        form.value.orderId = props.orderId;
    }
});

const handleClick = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate(async (valid, fields) => {
        if (valid) {
            const res = await apiRateCompleteOrder(form.value, username as string);
            if (res.status === 200) {
                ElMessage.success('景点评价成功');
                emits('closeDialog', false);
            } else {
                ElMessage.error('景点评价失败');
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
