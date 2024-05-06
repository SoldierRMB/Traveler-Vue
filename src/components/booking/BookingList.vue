<template>
    <el-space direction="vertical" alignment="flex-start">
        <el-card
            shadow="always"
            class="attractionCard"
            v-for="attraction in attractions"
            :key="attraction.id"
            @click="openAttractionAnnouncementDialog(attraction.id, attraction.attractionName)"
        >
            <template #header>
                <el-image
                    lazy
                    :src="attractionImageUrl + attraction.id"
                    fit="cover"
                    class="attractionImage"
                />
            </template>
            <div class="infos">
                <div class="title">
                    <div class="attractionName">{{ attraction.attractionName }}</div>
                    <div class="rating">
                        <el-tag type="primary" v-if="attraction?.rating">
                            {{ attraction.rating }}分
                        </el-tag>
                        <el-tag type="info" v-if="attraction.rating === null">暂无评分</el-tag>
                    </div>
                </div>
                <div class="location">
                    <el-icon><SvgIcon name="location" /></el-icon>
                    {{ attraction.location }}
                </div>
            </div>
            <el-button
                type="primary"
                class="bookingButton"
                @click.stop="bookingDialog(attraction.id, attraction.attractionName)"
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
        <Payment :orderId="orderId" />
    </el-dialog>
    <el-dialog
        :title="attractionName"
        width="60%"
        v-model="attractionAnnouncementDialogVisible"
        @close="attractionAnnouncementDialogVisible = false"
    >
        <IndexAnnouncements :attractionId="attractionId" />
    </el-dialog>
</template>

<script setup lang="ts">
import { apiGetAttractions, apiGetAttractionsByKeyword } from '@/api/common';
import { apiGetTicketsByAttractionId, apiBooking } from '@/api/tourist';
import type { AttractionVO, TicketVO } from '@/types/interfaces';
import { useAuthStore } from '@/stores/auth';
import router from '@/router';
import { useRoute } from 'vue-router';

const attractions = ref([] as AttractionVO[]);
const attractionImageUrl =
    import.meta.env.VITE_TRAVELER_BASE_URL +
    'common/getAttractionImageByAttractionId?attractionId=';

const current = ref(1);
const size = ref(10000000);

const route = useRoute();
let attractionNameKeyword = route.query.attractionName;
let cityCode = route.query.cityCode;

onMounted(async () => {
    if (attractionNameKeyword !== undefined || !isNaN(Number(cityCode))) {
        await getAttractionsByKeyword();
    } else {
        await getAttractions();
    }
});

const bookingDialogVisible = ref(false);
const attractionName = ref('');
const tickets = ref([] as TicketVO[]);

const authStore = useAuthStore();
const username = authStore.user.sub;
const orderId = ref();
const attractionId = ref();

const bookingDialog = async (id: number, name: string) => {
    if (authStore.isAuthenticated == false) {
        return router.push('/login');
    }
    bookingDialogVisible.value = true;
    attractionName.value = name;
    const ticketsRes = await apiGetTicketsByAttractionId(id);
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

const getAttractionsByKeyword = async () => {
    const attractionsRes = await apiGetAttractionsByKeyword(
        attractionNameKeyword as any,
        cityCode as any,
        current.value,
        size.value
    );
    attractions.value = attractionsRes.data.records;
};

const getAttractions = async () => {
    const attractionsRes = await apiGetAttractions(current.value, size.value);
    attractions.value = attractionsRes.data.records;
};

watch(
    () => [route.query.attractionName, route.query.cityCode],
    async () => {
        attractionNameKeyword = route.query.attractionName;
        cityCode = route.query.cityCode;
        if (attractionNameKeyword !== undefined || !isNaN(Number(cityCode))) {
            await getAttractionsByKeyword();
        } else {
            await getAttractions();
        }
    }
);

const attractionAnnouncementDialogVisible = ref(false);

const openAttractionAnnouncementDialog = (id: number, name: string) => {
    attractionAnnouncementDialogVisible.value = true;
    attractionId.value = id;
    attractionName.value = name;
};
</script>

<style scoped lang="scss">
.attractionCard {
    display: flex;
    flex-direction: column;
    width: 50rem;
    cursor: pointer;

    &:hover {
        color: var(--el-color-primary);
    }

    .attractionImage {
        width: 100%;
        height: 30rem;
    }

    .infos {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        .title {
            display: flex;
            align-items: center;
            gap: 1rem;

            .attractionName {
                font-weight: bold;
            }
        }

        .location {
            display: flex;
            align-items: center;
            margin-top: auto;
            gap: 0.5rem;
        }
    }
}

:deep(.el-card__header) {
    display: flex;
    padding: 0rem;
    border: none;
}

:deep(.el-card__body) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;
    font-size: 1.5rem;
    height: 6rem;
}
</style>
