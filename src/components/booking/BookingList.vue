<template>
    <el-space direction="vertical" alignment="flex-start">
        <el-card
            shadow="always"
            class="attractionCard"
            v-for="attraction in attractions"
            :key="attraction.id"
        >
            <template #header>
                <el-image :src="attractionImageUrl + attraction.id" fit="contain" />
            </template>
            <div class="infos">
                <div class="title">{{ attraction.attractionName }}</div>
                <div class="rating">
                    <el-tag type="primary" v-if="attraction?.rating">
                        {{ attraction.rating }}分
                    </el-tag>
                    <el-tag type="info" v-if="attraction.rating === null"> 暂无评分 </el-tag>
                </div>
                <div class="location">
                    {{ attraction.location }}
                </div>
            </div>
            <el-button
                type="primary"
                class="bookingButton"
                @click="bookingDialog(attraction.id)"
                round
            >
                订
            </el-button>
        </el-card>
    </el-space>
    <el-dialog :title="attractionName" width="80rem" v-model="bookingDialogVisible">
        <el-table :data="tickets" border highlight-current-row>
            <el-table-column align="center" prop="ticketName" label="门票名称" min-width="10rem" />
            <el-table-column align="center" prop="price" label="门票名称(元/张)" min-width="5rem" />
            <el-table-column align="center" prop="ticketType" label="门票类型" min-width="5rem">
                <template #default="scope">
                    <el-tag
                        :type="scope.row.ticketType === 1 ? 'info' : 'primary'"
                        disable-transitions
                    >
                        {{ scope.row.ticketType === 1 ? '全价票' : '优惠票' }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" fixed="right" label="操作" min-width="5rem">
                <template #default="scope">
                    <el-popover
                        width="200"
                        :content="scope.row.description"
                        trigger="click"
                        placement="bottom"
                    >
                        <template #reference>
                            <el-button type="info" size="small">详情</el-button>
                        </template>
                    </el-popover>
                    <el-button type="primary" size="small" @click="booking(scope.row.id)"
                        >订票</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
        <template #footer>
            <div class="dialog-footer">
                <el-button size="small" @click="bookingDialogVisible = false">取消</el-button>
                <el-button size="small" type="primary">确定</el-button>
            </div>
        </template>
    </el-dialog>
    <el-dialog title="订单支付" width="30rem" v-model="paymentDialogVisible">
        <Payment :orderId="orderId"/>
    </el-dialog>
</template>

<script setup lang="ts">
import { apiGetAttractions } from '@/api/guest';
import { apiGetTicketsByAttractionId, apiBooking } from '@/api/tourist';
import type { AttractionVO, TicketVO } from '@/types/interfaces';
import { useAuthStore } from '@/stores/auth';
import router from '@/router';

const attractions = ref([] as AttractionVO[]);
const attractionImageUrl =
    import.meta.env.VITE_TRAVELER_BASE_URL +
    'common/getAttractionImageByAttractionId?attractionId=';

onMounted(async () => {
    const attractionsRes = await apiGetAttractions();
    attractions.value = attractionsRes.data;
});

const bookingDialogVisible = ref(false);
const attractionName = ref('');
const tickets = ref([] as TicketVO[]);

const authStore = useAuthStore();
const username = authStore.user.sub;
const orderId = ref();

const bookingDialog = async (attractionId: number) => {
    if (authStore.isAuthenticated == false) {
        return router.push('/login');
    }
    bookingDialogVisible.value = true;
    attractionName.value =
        attractions.value.find((a) => a.id === attractionId)?.attractionName || '';
    const ticketsRes = await apiGetTicketsByAttractionId(attractionId);
    tickets.value = ticketsRes.data;
};

const paymentDialogVisible = ref(false);

const booking = async (ticketId: number) => {
    const orderVO = {
        ticketId: ticketId,
        quantity: 1
    };
    await apiBooking(orderVO, username as string).then((res) => {
        if (res.status === 200) {
            paymentDialogVisible.value = true;
            orderId.value = res.data.id;
        }
    });
};
</script>

<style scoped>
.attractionCard {
    display: flex;
    flex: 1;
    flex-direction: column;
    width: 50rem;

    .infos {
        display: flex;
        flex-direction: column;
        height: 8rem;
        gap: 1rem;

        .title {
            font-weight: bold;
        }
    }
}

:deep(.el-card__header) {
    display: flex;
    padding: 1rem 2rem;
    border: none;
}

:deep(.el-card__body) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;
    font-size: 1.5rem;
}
</style>
