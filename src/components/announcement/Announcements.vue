<template>
    <div class="announcementsBox">
        <div>
            <el-button type="primary" class="publishButton" @click="handlePublishButton"
                >发布公告</el-button
            >
            <el-table :data="announcements.records" border>
                <el-table-column align="center" label="公告标题" prop="title" min-width="10rem" />
                <el-table-column align="center" label="公告内容" prop="content" min-width="20rem" />
                <el-table-column
                    align="center"
                    label="发布时间"
                    prop="createTime"
                    min-width="10rem"
                />
                <el-table-column align="center" label="操作" min-width="10rem">
                    <template #default="scope">
                        <div class="buttons">
                            <el-button
                                type="primary"
                                @click="updateAnnouncement(scope.row)"
                                size="small"
                                >更新公告</el-button
                            >
                            <el-popconfirm
                                title="确认删除该条公告吗？"
                                confirm-button-text="确认"
                                cancel-button-text="取消"
                                @confirm="completeDeleteAnnouncement(scope.row.id)"
                            >
                                <template #reference>
                                    <el-button type="danger" size="small">删除公告</el-button>
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
        :title="isUpdate ? '更新公告' : '发布公告'"
        width="60%"
        v-model="announcementDialogVisible"
        @close="announcementDialogVisible = false"
    >
        <AnnouncementForm :announcement="announcement" :isUpdate="isUpdate" />
    </el-dialog>
</template>

<script setup lang="ts">
import moment from 'moment';
import { apiGetAnnouncements } from '@/api/common';
import { apiCompleteDeleteAnnouncement } from '@/api/admin';
import { useAuthStore } from '@/stores/auth';

const isUpdate = ref(false);

const announcements = ref({ records: [], total: 0 });

const currentPage = ref(1);
const pageSize = ref(10);
const total = ref();

const announcementDialogVisible = ref(false);

const announcement = ref();

onMounted(async () => {
    getAnnouncements();
});

const getAnnouncements = async () => {
    announcements.value = (await apiGetAnnouncements(currentPage.value, pageSize.value)).data;
    announcements.value.records.forEach((announcement: any) => {
        announcement.createTime = moment(announcement.createTime).format('YYYY-MM-DD HH:mm:ss');
    });
    total.value = announcements.value.total;
};

watch(currentPage, () => {
    getAnnouncements();
});

const handlePublishButton = () => {
    isUpdate.value = false;
    announcementDialogVisible.value = true;
};

const updateAnnouncement = async (row: any) => {
    isUpdate.value = true;
    announcement.value = {
        id: row.id,
        title: row.title,
        content: row.content
    };
    announcementDialogVisible.value = true;
};

const completeDeleteAnnouncement = async (announcementId: number) => {
    await apiCompleteDeleteAnnouncement(announcementId);
    getAnnouncements();
};
</script>

<style lang="scss" scoped>
.announcementsBox {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    justify-content: space-between;

    .publishButton {
        margin-bottom: 2rem;
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
