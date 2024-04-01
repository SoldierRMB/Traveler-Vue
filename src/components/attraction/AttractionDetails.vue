<template>
    <el-descriptions title="景点详细信息" border :column="4">
        <el-descriptions-item label="景点名称" label-align="center">{{
            attraction.attractionName
        }}</el-descriptions-item>
        <el-descriptions-item label="描述" label-align="center" :span="3">{{
            attraction.description
        }}</el-descriptions-item>
        <el-descriptions-item label="评分" label-align="center">{{
            attraction.score ? attraction.score : '暂无评分'
        }}</el-descriptions-item>
        <el-descriptions-item label="审核状态" label-align="center" align="center" :span="1.5">
            <template #default>
                <el-tag type="warning" v-show="attraction.reviewed == 0">未审核</el-tag>
                <el-tag type="success" v-show="attraction.reviewed == 1">审核通过</el-tag>
                <el-tag type="danger" v-show="attraction.reviewed == 2">审核不通过</el-tag>
            </template>
        </el-descriptions-item>
        <el-descriptions-item label="删除状态" label-align="center" align="center" :span="1.5">
            <template #default>
                <el-tag type="info" v-show="attraction.isDeleted == 0">未删除</el-tag>
                <el-tag type="danger" v-show="attraction.isDeleted == 1">已删除</el-tag>
            </template>
        </el-descriptions-item>
        <el-descriptions-item label="省份" label-align="center">{{
            province.name
        }}</el-descriptions-item>
        <el-descriptions-item label="城市" label-align="center">{{
            city.name
        }}</el-descriptions-item>
        <el-descriptions-item label="县区" label-align="center">{{
            area.name
        }}</el-descriptions-item>
        <el-descriptions-item label="街道" label-align="center">{{
            street.name
        }}</el-descriptions-item>
        <el-descriptions-item label="详细地址" label-align="center">{{
            attraction.location
        }}</el-descriptions-item>
        <el-descriptions-item label="景点管理员" label-align="center">{{
            user.username
        }}</el-descriptions-item>
        <el-descriptions-item label="邮箱" label-align="center">{{
            user.email
        }}</el-descriptions-item>
    </el-descriptions>
    <div class="buttons">
        <el-button type="primary" @click="dialogVisible = true" plain>更新景点</el-button>
        <el-popconfirm
            title="确认删除吗？"
            confirm-button-text="确认"
            cancel-button-text="取消"
            @confirm="deleteAttraction"
        >
            <template #reference>
                <el-button type="danger" plain>删除景点</el-button>
            </template>
        </el-popconfirm>
    </div>
    <el-dialog v-model="dialogVisible" title="更新景点" width="60%">
        <attraction-form :isUpdate="true" />
    </el-dialog>
</template>

<script setup lang="ts">
import { useUserAttractionStore } from '@/stores/user-attraction';
import { useAuthStore } from '@/stores/auth';
import { apiDeleteAttraction } from '@/api/staff';
import router from '@/router';

const store = useUserAttractionStore();

const attraction = ref();
const user = ref();
const province = ref();
const city = ref();
const area = ref();
const street = ref();

attraction.value = store.attraction;
user.value = store.user;
province.value = store.province;
city.value = store.city;
area.value = store.area;
street.value = store.street;

const dialogVisible = ref(false);

const deleteAttraction = async () => {
    const userAuthStore = useAuthStore();
    const username = userAuthStore.user.sub as string;
    await apiDeleteAttraction(attraction.value.id, username).then((res) => {
        if (res.status == 200) {
            ElMessage.success('删除成功');
            store.$reset();
            router.push('/attractions');
        } else {
            ElMessage.error('删除失败');
        }
    });
};
</script>

<style lang="scss" scoped>
.buttons {
    padding-top: 2rem;
}
</style>
