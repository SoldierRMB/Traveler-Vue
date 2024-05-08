<template>
    <div class="ordersBox">
        <div>
            <div class="filter" v-if="false">
                <el-input v-model="keyword" placeholder="请输入订单编号" class="search" />
                <el-button type="primary" @click="searchOrders" class="searchButton"
                    >搜索</el-button
                >
            </div>
            <el-table :data="orders.records" border @row-click="handleRowClick">
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
                        <el-tag type="success" v-if="scope.row.status === 4">已评价</el-tag>
                        <el-tag type="info" v-if="scope.row.status === 5">已取消</el-tag>
                        <el-tag type="danger" v-if="scope.row.status === 6">已删除</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="门票数量(张)"
                    prop="quantity"
                    min-width="6rem"
                />
                <el-table-column
                    align="center"
                    label="订单金额(元)"
                    prop="amount"
                    min-width="6rem"
                />
                <el-table-column
                    align="center"
                    label="订单时间"
                    prop="orderTime"
                    min-width="10rem"
                />
                <el-table-column
                    align="center"
                    label="操作"
                    min-width="10rem"
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
                            <el-button
                                type="primary"
                                size="small"
                                v-if="scope.row.status === 2"
                                @click="openQRCodeDialog(scope.row)"
                                >查看门票</el-button
                            >
                            <el-button
                                type="primary"
                                size="small"
                                v-if="scope.row.status === 3"
                                @click="openRatingDialog(scope.row)"
                                >评价景点</el-button
                            >
                            <el-popconfirm
                                title="确认取消订单吗？"
                                confirm-button-text="确认"
                                cancel-button-text="取消"
                                v-if="scope.row.status === 1 || scope.row.status === 2"
                                @confirm="cancelOrder(scope.row.id)"
                            >
                                <template #reference>
                                    <el-button type="danger" size="small">取消订单</el-button>
                                </template>
                            </el-popconfirm>
                            <el-popconfirm
                                title="确认删除订单吗？"
                                confirm-button-text="确认"
                                cancel-button-text="取消"
                                v-if="
                                    scope.row.status === 3 ||
                                    scope.row.status === 4 ||
                                    scope.row.status === 5
                                "
                                @confirm="deleteOrder(scope.row.id)"
                            >
                                <template #reference>
                                    <el-button type="danger" size="small">删除订单</el-button>
                                </template>
                            </el-popconfirm>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
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
        title="订单支付"
        width="30rem"
        v-model="paymentDialogVisible"
        @close="paymentDialogVisible = false"
    >
        <Payment :orderId="orderId" />
    </el-dialog>
    <el-dialog
        title="查看门票"
        width="30rem"
        v-model="qrCodeDialogVisible"
        @close="qrCodeDialogVisible = false"
    >
        <QRCode :value="String(orderId)" />
    </el-dialog>
    <el-dialog
        title="评价景点"
        width="60%"
        v-model="ratingDialogVisible"
        @close="ratingDialogVisible = false"
    >
        <RatingForm :orderId="orderId" @closeDialog="closeDialog" />
    </el-dialog>
</template>

<script setup lang="ts">
import moment from 'moment';
import { useAuthStore } from '@/stores/auth';
import {
    apiGetAllOrders,
    apiGetOrdersByAttractionId as apiGetOrdersByAttractionIdAdmin
} from '@/api/admin';
import { apiGetOrdersByAttractionId, apiUseTicket } from '@/api/staff';
import { apiGetUserOrders, apiCancelOrder, apiDeleteOrder } from '@/api/tourist';
import { useRoute } from 'vue-router';

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
        if (attractionId) {
            orders.value = (
                await apiGetOrdersByAttractionIdAdmin(
                    currentPage.value,
                    pageSize.value,
                    attractionId
                )
            ).data;
        } else {
            orders.value = (await apiGetAllOrders(currentPage.value, pageSize.value)).data;
        }
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

watch(currentPage, () => {
    getOrders();
});

const paymentDialogVisible = ref(false);
const orderId = ref();

const openPaymentDialog = (row: any) => {
    paymentDialogVisible.value = true;
    orderId.value = row.id;
};

const cancelOrder = async (orderId: string) => {
    await apiCancelOrder(orderId, username).then((res) => {
        if (res.status === 200) {
            getOrders();
        }
    });
};

const deleteOrder = async (orderId: string) => {
    await apiDeleteOrder(orderId, username).then((res) => {
        if (res.status === 200) {
            getOrders();
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
            const res = await apiUseTicket(row.id, username);
            if (res.status === 200) {
                ElMessage.success('门票使用成功');
            } else {
                ElMessage.error('门票使用失败');
            }
            getOrders();
        });
    }
};

const ratingDialogVisible = ref(false);

const openRatingDialog = (row: any) => {
    ratingDialogVisible.value = true;
    orderId.value = row.id;
};

const qrCodeDialogVisible = ref(false);

const openQRCodeDialog = (row: any) => {
    qrCodeDialogVisible.value = true;
    orderId.value = row.id;
};

const closeDialog = (val: boolean) => {
    ratingDialogVisible.value = val;
};

const keyword = ref('');

const searchOrders = async () => {};
</script>

<style lang="scss" scoped>
.ordersBox {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    justify-content: space-between;

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
