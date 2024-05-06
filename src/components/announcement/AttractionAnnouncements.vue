<template>
    <div class="attractionAnnouncementsBox">
        <div>
            <el-button type="primary" class="publishButton" @click="handlePublishButton"
                >发布公告</el-button
            >
            <el-table :data="attractionAnnouncements.records" border>
                <el-table-column
                    align="center"
                    label="景点名称"
                    prop="attraction.attractionName"
                    min-width="10rem"
                />
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
                                @click="updateAttractionAnnouncement(scope.row)"
                                size="small"
                                >更新公告</el-button
                            >
                            <el-popconfirm
                                title="确认删除该条公告吗？"
                                confirm-button-text="确认"
                                cancel-button-text="取消"
                                @confirm="
                                    completeDeleteAttractionAnnouncement(
                                        scope.row.id,
                                        scope.row.attraction.id
                                    )
                                "
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
        v-model="attractionAnnouncementDialogVisible"
        @close="attractionAnnouncementDialogVisible = false"
    >
        <AnnouncementForm :announcement="attractionAnnouncement" :isUpdate="isUpdate" />
    </el-dialog>
</template>

<script setup lang="ts">
import moment from 'moment';
import {
    apiGetAttractionAnnouncementsByUsername,
    apiCompleteDeleteAttractionAnnouncement
} from '@/api/staff';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const username = authStore.user?.sub;

const isUpdate = ref(false);

const attractionAnnouncements = ref({ records: [], total: 0 });

const currentPage = ref(1);
const pageSize = ref(10);
const total = ref();

const attractionAnnouncementDialogVisible = ref(false);

const attractionAnnouncement = ref();

onMounted(async () => {
    getAttractionAnnouncementsByUsername();
});

const getAttractionAnnouncementsByUsername = async () => {
    attractionAnnouncements.value = (
        await apiGetAttractionAnnouncementsByUsername(
            currentPage.value,
            pageSize.value,
            username as string
        )
    ).data;
    attractionAnnouncements.value.records.forEach((attractionAnnouncement: any) => {
        attractionAnnouncement.createTime = moment(attractionAnnouncement.createTime).format(
            'YYYY-MM-DD HH:mm:ss'
        );
    });
    total.value = attractionAnnouncements.value.total;
};

watch(currentPage, () => {
    getAttractionAnnouncementsByUsername();
});

const handlePublishButton = () => {
    isUpdate.value = false;
    attractionAnnouncementDialogVisible.value = true;
};

const updateAttractionAnnouncement = async (row: any) => {
    isUpdate.value = true;
    attractionAnnouncement.value = {
        id: row.id,
        title: row.title,
        content: row.content
    };
    attractionAnnouncementDialogVisible.value = true;
};

const completeDeleteAttractionAnnouncement = async (
    attractionAnnouncementId: number,
    attractionId: number
) => {
    await apiCompleteDeleteAttractionAnnouncement(
        attractionAnnouncementId,
        attractionId,
        username as string
    );
    getAttractionAnnouncementsByUsername();
};
</script>

<style lang="scss" scoped>
.attractionAnnouncementsBox {
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
