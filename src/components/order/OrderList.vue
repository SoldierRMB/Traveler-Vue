<template>
    <el-table :data="orders" border>
        <el-table-column align="center" label="订单编号" prop="orderVO.id" min-width="10rem" />
        <el-table-column
            align="center"
            label="门票名称"
            prop="ticketVO.ticketName"
            min-width="10rem"
        />
        <el-table-column align="center" label="订单状态" prop="orderVO.status" min-width="5rem">
            <template #default="scope">
                <el-tag type="warning" v-show="scope.row.orderVO.status === 1">待支付</el-tag>
                <el-tag type="success" v-show="scope.row.orderVO.status === 2">已支付</el-tag>
                <el-tag type="success" v-show="scope.row.orderVO.status === 3">已完成</el-tag>
                <el-tag type="info" v-show="scope.row.orderVO.status === 4">已取消</el-tag>
            </template>
        </el-table-column>
        <el-table-column
            align="center"
            label="门票数量(张)"
            prop="orderVO.quantity"
            min-width="8rem"
        />
        <el-table-column
            align="center"
            label="订单金额(元)"
            prop="orderVO.amount"
            min-width="8rem"
        />
        <el-table-column align="center" label="订单时间" prop="orderTime" min-width="10rem" />
    </el-table>
    <el-dialog
        title="title"
        width="600px"
        v-model="orderTicketDialogVisible"
        @close="orderTicketDialogVisible = false"
    >
    </el-dialog>
</template>

<script setup lang="ts">
import moment from 'moment';
import { useAuthStore } from '@/stores/auth';
import { apiGetUserOrders } from '@/api/tourist';
import { apiGetOrdersByAttractionId } from '@/api/staff';
import {useRoute} from 'vue-router';

const orderTicketDialogVisible = ref(false);

const authStore = useAuthStore();
const userRoleRef = ref('');

const orders = ref([]);

const route = useRoute()

const props = defineProps({
    userRole: String
})

onMounted(async () => {
    userRoleRef.value = props.userRole ? props.userRole : authStore.user.aud![0];
    const username = authStore.user.sub as string;
    if (userRoleRef.value === 'ROLE_TOURIST') {
        orders.value = (await apiGetUserOrders(username)).data.map((order: any) => {
            return {
                ...order,
                orderTime: moment(order.orderTime).format('YYYY-MM-DD HH:mm:ss')
            };
        });
    } else if (userRoleRef.value === 'ROLE_STAFF') {
        const attractionId = route.query.attractionId as any;
        console.log(attractionId);
        orders.value = (await apiGetOrdersByAttractionId(attractionId, username)).data.map((order: any) => {
            return {
                ...order,
                orderTime: moment(order.orderTime).format('YYYY-MM-DD HH:mm:ss')
            };
        });
    }
});
</script>

<style lang="scss" scoped>
:deep(.el-table__row) {
    cursor: pointer;

    &:hover {
        color: var(--el-color-primary);
    }
}
</style>
