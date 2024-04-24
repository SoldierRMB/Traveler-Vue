<template>
    <div class="usersBox">
        <el-table :data="userRoles.records" border style="width: 100%" @row-click="handleRowClick">
            <el-table-column align="center" label="用户编号" prop="user.id" width="100" />
            <el-table-column align="center" label="用户名" prop="user.username" width="150" />
            <el-table-column align="center" label="邮箱" prop="user.email" width="300" />
            <el-table-column align="center" label="昵称" prop="user.nickname" width="200" />
            <el-table-column align="center" label="是否禁用" prop="user.isDisable" width="100">
                <template #default="scope">
                    <el-tag type="primary" v-if="scope.row.user.isDisable === 0">未禁用</el-tag>
                    <el-tag type="danger" v-if="scope.row.user.isDisable === 1">已禁用</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" label="角色名称" prop="role.roleName" width="200">
                <template #default="scope">
                    <el-tag type="primary" v-if="scope.row.role.roleName === 'ROLE_ADMIN'">{{
                        scope.row.role.roleNameZh
                    }}</el-tag>
                    <el-tag type="warning" v-if="scope.row.role.roleName === 'ROLE_STAFF'">{{
                        scope.row.role.roleNameZh
                    }}</el-tag>
                    <el-tag type="info" v-if="scope.row.role.roleName === 'ROLE_TOURIST'">{{
                        scope.row.role.roleNameZh
                    }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" label="注册时间" prop="user.createTime" width="250" />
            <el-table-column align="center" label="更新时间" prop="user.updateTime" width="250" />
            <el-table-column align="center" label="操作" width="100" fixed="right">
                <template #default="scope">
                    <div class="buttons">
                        <el-button
                            type="danger"
                            size="small"
                            @click="disableUser(scope.row.user.id)"
                            :disabled="scope.row.user.isDisable !== 0"
                            >禁用用户</el-button
                        >
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            layout="total, prev, pager, next"
            :current-page="currentPage"
            :page-size="pageSize"
            :total="Number(total)"
            @current-change="currentPage = $event"
            class="pagination"
        />
    </div>
</template>

<script setup lang="ts">
import moment from 'moment';
import { apiGetUserRoles } from '@/api/admin';

const userRoles = ref({
    records: [],
    total: 0
});

const currentPage = ref(1);
const pageSize = ref(10);
const total = ref();

onMounted(async () => {
    getUserRoles();
});

const getUserRoles = async () => {
    userRoles.value = (await apiGetUserRoles(currentPage.value, pageSize.value)).data;
    userRoles.value.records.forEach((userRole: any) => {
        userRole.user.createTime = moment(userRole.user.createTime).format('YYYY-MM-DD HH:mm:ss');
        userRole.user.updateTime = moment(userRole.user.updateTime).format('YYYY-MM-DD HH:mm:ss');
    });
    total.value = userRoles.value.total;
};

watch(
    () => currentPage.value,
    () => {
        getUserRoles();
    }
);

const handleRowClick = async (row: any, column: any, event: Event) => {
    /*     if (userRoleRef.value === 'ROLE_STAFF' && row.status === 2) {
        ElMessageBox.confirm('使用此门票吗？', '使用门票', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(async () => {
            const res = await apiUseTicket(attractionId, row.id, username);
            if (res.status === 200) {
                ElMessage.success('门票使用成功');
            } else {
                ElMessage.error('门票使用失败');
            }
            location.reload();
        });
    } */
};

const disableUser = async (userId: number) => {
/*     const res = await apiDisableUser(userId);
    if (res.status === 200) {
        ElMessage.success('用户禁用成功');
        getUserRoles();
    } else {
        ElMessage.error('用户禁用失败');
    } */
};
</script>

<style lang="scss" scoped>
.usersBox {
    display: flex;
    flex-direction: column;
    min-height: 100%;

    :deep(.el-table__row) {
        cursor: pointer;

        &:hover {
            color: var(--el-color-primary);
        }
    }

    .pagination {
        display: flex;
        justify-content: center;
        margin-top: 2rem;
    }
}
</style>
