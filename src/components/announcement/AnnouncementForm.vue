<template>
    <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="公告标题" prop="title">
            <el-input placeholder="请填写标题" v-model="form.title" />
        </el-form-item>
        <el-form-item label="公告内容" prop="content">
            <el-input
                placeholder="请填写内容"
                v-model="form.content"
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 4 }"
                resize="none"
            />
        </el-form-item>
        <el-form-item label="选择景点" prop="attractionId" v-if="userRole === 'ROLE_STAFF'">
            <el-select v-model="form.attractionId" placeholder="请选择景点" clearable>
                <el-option
                    v-for="attraction in attractions"
                    :key="attraction.attractionVO.id"
                    :label="attraction.attractionVO.attractionName"
                    :value="attraction.attractionVO.id"
                />
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="handlePublishClick(formRef)" v-if="!props.isUpdate"
                >发布公告</el-button
            >
            <el-button type="primary" @click="handleUpdateClick(formRef)" v-if="props.isUpdate"
                >更新公告</el-button
            >
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
import type { AnnouncementVO } from '@/types/interfaces';
import type { FormInstance, FormRules } from 'element-plus';
import { useAuthStore } from '@/stores/auth';
import { apiPublishAnnouncement, apiUpdateAnnouncement } from '@/api/admin';
import {
    apiGetAttractionsByUsername,
    apiPublishAttractionAnnouncement,
    apiUpdateAttractionAnnouncement
} from '@/api/staff';

const authStore = useAuthStore();
const userRole = authStore.user?.aud![0];

const props = defineProps({
    announcement: Object,
    isUpdate: Boolean
});

const formRef = ref<FormInstance>();
const form = ref({} as AnnouncementVO);
const rules =
    userRole === 'ROLE_ADMIN'
        ? reactive<FormRules<AnnouncementVO>>({
              title: [{ required: true, message: '请输入公告标题', trigger: 'blur' }],
              content: [{ required: true, message: '请输入公告内容', trigger: 'blur' }]
          })
        : reactive<FormRules<AnnouncementVO>>({
              title: [{ required: true, message: '请输入公告标题', trigger: 'blur' }],
              content: [{ required: true, message: '请输入公告内容', trigger: 'blur' }],
              attractionId: [{ required: true, message: '请选择景点', trigger: 'change' }]
          });
const username = authStore.user.sub;
const attractions = ref();
const attractionId = ref();

onMounted(async () => {
    if (userRole === 'ROLE_STAFF') {
        attractions.value = (await apiGetAttractionsByUsername(username as string)).data;
    }
    if (props.isUpdate) {
        form.value = props.announcement as AnnouncementVO;
    }
});

const handlePublishClick = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate(async (valid, fields) => {
        if (valid) {
            let apiAnnouncementFunction =
                userRole === 'ROLE_ADMIN'
                    ? apiPublishAnnouncement
                    : apiPublishAttractionAnnouncement;
            const attractionRes = await apiAnnouncementFunction(form.value, username as string);
            attractionId.value = attractionRes.data.id;
            if (attractionRes.status === 200) {
                ElMessage.success('操作成功');
                location.reload();
            } else {
                ElMessage.error('操作失败');
            }
        }
    });
};

const handleUpdateClick = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate(async (valid, fields) => {
        if (valid) {
            let apiAnnouncementFunction =
                userRole === 'ROLE_ADMIN' ? apiUpdateAnnouncement : apiUpdateAttractionAnnouncement;
            const attractionRes = await apiAnnouncementFunction(form.value, username as string);
            if (attractionRes.status === 200) {
                ElMessage.success('操作成功');
                location.reload();
            } else {
                ElMessage.error('操作失败');
            }
        }
    });
};
</script>

<style lang="scss" scoped></style>
