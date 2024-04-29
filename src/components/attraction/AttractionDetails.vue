<template>
    <el-descriptions title="景点详细信息" border :column="4">
        <el-descriptions-item label="景点图片" label-align="center" :span="1.5">
            <template #default>
                <el-image
                    style="width: 32rem; height: 18rem"
                    :src="attractionImageUrl"
                    fit="cover"
                />
            </template>
        </el-descriptions-item>
        <el-descriptions-item label="描述" label-align="center" :span="2.5">{{
            attraction.description
        }}</el-descriptions-item>
        <el-descriptions-item label="景点名称" label-align="center">{{
            attraction.attractionName
        }}</el-descriptions-item>
        <el-descriptions-item label="评分" label-align="center">{{
            attraction.rating ? attraction.rating : '暂无评分'
        }}</el-descriptions-item>
        <el-descriptions-item label="审核状态" label-align="center" align="center">
            <template #default>
                <el-tag type="warning" v-if="attraction.reviewed === 0">未审核</el-tag>
                <el-tag type="success" v-if="attraction.reviewed === 1">审核通过</el-tag>
                <el-tag type="danger" v-if="attraction.reviewed === 2">审核不通过</el-tag>
            </template>
        </el-descriptions-item>
        <el-descriptions-item label="删除状态" label-align="center" align="center">
            <template #default>
                <el-tag type="info" v-if="attraction.isDeleted === 0">未删除</el-tag>
                <el-tag type="danger" v-if="attraction.isDeleted === 1">已删除</el-tag>
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
        <el-button
            type="primary"
            @click="goToAttractionTickets"
            v-if="userRole === 'ROLE_STAFF' && isDeleted === 0"
            >景点门票</el-button
        >
        <el-button
            type="primary"
            @click="updateDialogVisible = true"
            v-if="isDeleted === 0 && reviewed === 1 && userRole === 'ROLE_STAFF'"
            plain
            >更新景点</el-button
        >
        <el-button type="primary" @click="restoreAttraction" v-if="isDeleted === 1"
            >恢复景点</el-button
        >
        <el-button @click="goToOrders" v-if="reviewed !== 0">订单列表</el-button>
        <el-popconfirm
            title="确认删除吗？"
            confirm-button-text="确认"
            cancel-button-text="取消"
            @confirm="deleteAttraction"
            v-if="userRole === 'ROLE_STAFF' && isDeleted === 0"
        >
            <template #reference>
                <el-button type="danger" plain v-if="userRole === 'ROLE_STAFF' && isDeleted === 0"
                    >删除景点</el-button
                >
            </template>
        </el-popconfirm>
        <el-button
            type="danger"
            @click="deleteDialogVisible = true"
            v-if="userRole === 'ROLE_ADMIN'"
            >彻底删除</el-button
        >
    </div>
    <el-dialog v-model="updateDialogVisible" title="更新景点" width="60%" top="10vh">
        <AttractionForm :isUpdate="true" />
    </el-dialog>
    <el-dialog v-model="deleteDialogVisible" title="彻底删除景点？" width="30%">
        <span>此操作不可逆，确定吗？</span>
        <template #footer>
            <el-button @click="deleteDialogVisible = false">取消</el-button>
            <el-button type="danger" @click="completeDeleteAttraction">确定</el-button>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { useUserAttractionStore } from '@/stores/user-attraction';
import { useAuthStore } from '@/stores/auth';
import { apiDeleteAttraction, apiRestoreAttraction } from '@/api/staff';
import { apiCompleteDeleteUserAttraction } from '@/api/admin';
import router from '@/router';
import { useRoute } from 'vue-router';

const route = useRoute();
const attractionImageUrl = ref('');
attractionImageUrl.value = (import.meta.env.VITE_TRAVELER_BASE_URL +
    'common/getAttractionImageByAttractionId?attractionId=' +
    route.params.id) as string;

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

const updateDialogVisible = ref(false);
const deleteDialogVisible = ref(false);

const userAuthStore = useAuthStore();
const userRole = userAuthStore.user.aud![0];
const username = userAuthStore.user.sub as string;
const attractionId = attraction.value.id;
const isDeleted = attraction.value.isDeleted;
const reviewed = attraction.value.reviewed;

const goToAttractionTickets = () => {
    router.push(`/attractions/${attractionId}/tickets`);
};

const deleteAttraction = async () => {
    await apiDeleteAttraction(attractionId, username).then((res) => {
        if (res.status === 200) {
            store.$reset();
            ElMessage.success('删除成功');
            router.push('/attractions');
        } else {
            ElMessage.error('删除失败');
        }
    });
};

const completeDeleteAttraction = async () => {
    await apiCompleteDeleteUserAttraction(attractionId).then((res) => {
        if (res.status === 200) {
            store.$reset();
            ElMessage.success('删除成功');
            router.push('/attractions');
        }
    });
};

const restoreAttraction = async () => {
    await apiRestoreAttraction(attractionId, username).then((res) => {
        if (res.status === 200) {
            store.$reset();
            ElMessage.success('恢复成功');
            router.push('/attractions');
        }
    });
};

const goToOrders = () => {
    router.push({ name: 'Orders', query: { attractionId: attractionId } });
};
</script>

<style lang="scss" scoped>
.buttons {
    padding-top: 2rem;
}
</style>
