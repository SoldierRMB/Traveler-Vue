<template>
    <div class="ordersBox">
        <div class="filter">
            <el-input v-model="keyword" placeholder="请输入订单编号" class="search" />
            <el-button type="primary" @click="searchOrders" class="searchButton">搜索</el-button>
        </div>
        <el-table :data="orders.records" border class="table" @row-click="handleRowClick">
            <el-table-column align="center" label="订单编号" prop="id" min-width="10rem" />
            <el-table-column
                align="center"
                label="门票名称"
                prop="ticket.ticketName"
                min-width="10rem"
            />
            <el-table-column align="center" label="订单状态" prop="status" min-width="6rem">
                <template #default="scope">
                    <el-tag type="warning" v-if="scope.row.status === 1">待支付</el-tag>
                    <el-tag type="success" v-if="scope.row.status === 2">已支付</el-tag>
                    <el-tag type="success" v-if="scope.row.status === 3">已完成</el-tag>
                    <el-tag type="info" v-if="scope.row.status === 4">已取消</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" label="门票数量(张)" prop="quantity" min-width="8rem" />
            <el-table-column align="center" label="订单金额(元)" prop="amount" min-width="8rem" />
            <el-table-column align="center" label="订单时间" prop="orderTime" min-width="8rem" />
            <el-table-column
                align="center"
                label="操作"
                min-width="8rem"
                v-if="userRoleRef === 'ROLE_TOURIST'"
            >
                <template #default="scope">
                    <div class="buttons">
                        <el-button
                            type="primary"
                            size="small"
                            @click="openPaymentDialog(scope.row)"
                            v-if="scope.row.status === 1"
                            >支付订单</el-button
                        >
                        <el-button type="primary" size="small" v-if="scope.row.status === 2"
                            >查看门票</el-button
                        >
                        <el-button
                            type="danger"
                            size="small"
                            v-if="scope.row.status === 1 || scope.row.status === 2"
                            >取消订单</el-button
                        >
                        <el-button
                            type="danger"
                            size="small"
                            v-if="scope.row.status === 3 || scope.row.status === 4"
                            >删除订单</el-button
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
    <el-dialog
        title="title"
        width="600px"
        v-model="orderTicketDialogVisible"
        @close="orderTicketDialogVisible = false"
    >
    </el-dialog>
    <el-dialog title="请使用支付宝付款" width="30rem" v-model="paymentDialogVisible">
        <el-image :src="alipay" />
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="completePayment(orderId, username)"
                    >已完成支付</el-button
                >
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import moment from 'moment';
import { useAuthStore } from '@/stores/auth';
import { apiGetAllOrders } from '@/api/admin';
import { apiGetOrdersByAttractionId, apiUseTicket } from '@/api/staff';
import { apiGetUserOrders, apiCompletePayment } from '@/api/tourist';
import { useRoute } from 'vue-router';
import alipay from '@/assets/imgs/alipay.jpg';
import router from '@/router';

const orderTicketDialogVisible = ref(false);

const authStore = useAuthStore();
const userRoleRef = ref('');

const orders = ref({
    records: [],
    total: 0
});

const route = useRoute();
const attractionId = route.query.attractionId as any;

const props = defineProps({
    userRole: String
});

const currentPage = ref(1);
const pageSize = ref(10);
const total = ref();

const username = authStore.user.sub as string;
userRoleRef.value = props.userRole ? props.userRole : authStore.user.aud![0];

onMounted(async () => {
    getOrders();
});

const getOrders = async () => {
    if (userRoleRef.value === 'ROLE_ADMIN') {
        orders.value = (await apiGetAllOrders(currentPage.value, pageSize.value)).data;
    } else if (userRoleRef.value === 'ROLE_STAFF') {
        orders.value = (
            await apiGetOrdersByAttractionId(
                attractionId,
                username,
                currentPage.value,
                pageSize.value
            )
        ).data;
    } else if (userRoleRef.value === 'ROLE_TOURIST') {
        orders.value = (await apiGetUserOrders(username, currentPage.value, pageSize.value)).data;
    }
    orders.value.records.forEach((order: any) => {
        order.orderTime = moment(order.orderTime).format('YYYY-MM-DD HH:mm:ss');
    });
    total.value = orders.value.total;
};

watch(
    () => currentPage.value,
    () => {
        getOrders();
    }
);

const paymentDialogVisible = ref(false);
const orderId = ref();

const openPaymentDialog = (row: any) => {
    paymentDialogVisible.value = true;
    orderId.value = row.orderVO.id;
};

const completePayment = async (orderId: number, username: string) => {
    await apiCompletePayment(orderId, username).then((res) => {
        if (res.status === 200) {
            router.push(`/success/${orderId}`);
        }
    });
};

const handleRowClick = async (row: any, column: any, event: Event) => {
    if (userRoleRef.value === 'ROLE_STAFF' && row.status === 2) {
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
    }
};

const keyword = ref('');

const searchOrders = async () => {};
</script>

<style lang="scss" scoped>
.ordersBox {
    display: flex;
    flex-direction: column;
    min-height: 100%;

    .filter {
        display: flex;
        align-items: center;
        padding-bottom: 2rem;

        .search {
            max-width: 20rem;
        }

        .searchButton {
            margin-left: 2rem;
        }
    }

    .table {
        flex: 1 1 auto;
    }

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

    .buttons {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        gap: 1rem;

        .el-button + .el-button,
        .el-checkbox.is-bordered + .el-checkbox.is-bordered {
            margin-left: 0px;
        }
    }
}
</style>
