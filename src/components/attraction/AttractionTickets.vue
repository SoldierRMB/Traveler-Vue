<template>
    <div class="buttons">
        <el-button type="primary" @click="publishDialogVisible = true">发布景点门票</el-button>
    </div>
    <el-table :data="tickets" stripe highlight-current-row @row-click="rowClickHandler">
        <el-table-column align="center" prop="ticketName" label="门票名称" min-width="100" />
        <el-table-column align="center" prop="price" label="价格" min-width="80" />
        <el-table-column align="center" prop="ticketType" label="门票类型" min-width="80">
            <template #default="scope">
                <el-tag :type="scope.row.ticketType === 1 ? 'info' : 'primary'" disable-transitions>
                    {{ scope.row.ticketType === 1 ? '成人票' : '优惠票' }}
                </el-tag>
            </template>
        </el-table-column>
        <el-table-column align="center" prop="description" label="门票描述" min-width="150" />
    </el-table>
    <el-dialog v-model="publishDialogVisible" title="发布景点门票">
        <PublishAttractionTicketForm />
    </el-dialog>
    <el-dialog v-model="detailsDialogVisible" title="景点门票详情">
        <PublishAttractionTicketForm :ticket="ticket"/>
    </el-dialog>
</template>

<script setup lang="ts">
import { apiGetTicketsByAttractionId } from '@/api/staff';
import { useAuthStore } from '@/stores/auth';
import { useRoute } from 'vue-router';

const ticket = ref()

const tickets = ref([]);
const publishDialogVisible = ref(false);
const detailsDialogVisible = ref(false);

const route = useRoute();
const authStore = useAuthStore();
const username = authStore.user.sub;

onMounted(async () => {
    const attractionId = parseInt(route.params.id as string);
    const ticketsRes = await apiGetTicketsByAttractionId(attractionId, username as string);
    tickets.value = ticketsRes.data;
});

const rowClickHandler = (row: any, column:any, event:Event) => {
    detailsDialogVisible.value = true
    ticket.value = row
}
</script>

<style lang="scss" scoped>
.buttons {
    padding-bottom: 2rem;
}

:deep(.el-table__row) {
    cursor: pointer;

    &:hover {
        color: var(--el-color-primary);
    }
}
</style>
