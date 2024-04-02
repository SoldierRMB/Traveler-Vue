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
            <el-form-item label="门票名称" prop="ticketName">
                <el-input placeholder="请输入门票名称" v-model="form.ticketName" />
            </el-form-item>
            <el-row :gutter="12">
                <el-col :span="12">
                    <el-form-item label="价格" prop="price">
                        <el-input-number
                            v-model="form.price"
                            :precision="2"
                            :step="0.1"
                            :max="99999999.99"
                        />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="门票类型" prop="ticketType">
                        <el-select v-model="form.ticketType" placeholder="请选择门票类型" clearable>
                            <el-option
                                v-for="ticketType in ticketTypes"
                                :key="ticketType.code"
                                :label="ticketType.name"
                                :value="ticketType.code"
                            />
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="景点描述" prop="description">
                <el-input
                    placeholder="请输入景点描述"
                    v-model="form.description"
                    type="textarea"
                    :autosize="{ minRows: 4, maxRows: 4 }"
                    resize="none"
                />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleClick(formRef)">发布门票</el-button>
            </el-form-item>
        </div>
    </el-form>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus';
import type { AttractionTicketVO, TicketVO } from '@/types/interfaces';
import { useAuthStore } from '@/stores/auth';
import { apiPublishAttractionTicket } from '@/api/staff';
import { useRoute } from 'vue-router';

const route = useRoute();
const formRef = ref<FormInstance>();
const form = reactive({
    id: 0,
    ticketName: '',
    price: 0,
    ticketType: '',
    description: ''
});
const attractionTicket = reactive({
    attractionVO: {
        id: route.params.id
    },
    ticketVO: form
});
const authStore = useAuthStore();

const rules = reactive<FormRules<TicketVO>>({
    ticketName: [{ required: true, message: '请输入景点名称', trigger: 'blur' }],
    price: [{ required: true, message: '请输入价格', trigger: 'blur' }],
    ticketType: [{ required: true, message: '请选择门票类型', trigger: 'change' }],
    description: [{ required: true, message: '请输入景点描述', trigger: 'blur' }]
});

const ticketTypes = reactive([
    {
        code: 1,
        name: '成人票'
    },
    {
        code: 2,
        name: '优惠票'
    }
]);

const handleClick = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate(async (valid, fields) => {
        if (valid) {
            const username = authStore.user.sub;
            await apiPublishAttractionTicket(attractionTicket, username as string).then((res) => {
                if (res.status === 200) {
                    ElMessage.success('景点门票发布成功');
                    location.reload();
                } else if (res.status === 210) {
                    ElMessage.error('景点不存在');
                }
            });
        }
    });
};
</script>

<style lang="scss" scoped></style>
