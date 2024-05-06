<template>
    <div class="commentsBox">
        <el-table :data="comments.records" border>
            <el-table-column align="center" label="动态标题" prop="post.title" min-width="10rem" />
            <el-table-column align="center" label="评论内容" prop="content" min-width="20rem" />
            <el-table-column align="center" label="用户名" prop="user.username" min-width="8rem" />
            <el-table-column align="center" label="发布时间" prop="createTime" min-width="10rem" />
            <el-table-column align="center" label="操作" min-width="8rem">
                <template #default="scope">
                    <div class="buttons">
                        <el-popconfirm
                            title="确认删除该条评论吗？"
                            confirm-button-text="确认"
                            cancel-button-text="取消"
                            @confirm="completeDeleteComment(scope.row.id)"
                        >
                            <template #reference>
                                <el-button type="danger" size="small">删除评论</el-button>
                            </template>
                        </el-popconfirm>
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
import { apiGetComments, apiCompleteDeleteComment } from '@/api/admin';

const comments = ref({ records: [], total: 0 });

const currentPage = ref(1);
const pageSize = ref(10);
const total = ref();

onMounted(async () => {
    getComments();
});

const getComments = async () => {
    comments.value = (await apiGetComments(currentPage.value, pageSize.value)).data;
    comments.value.records.forEach((comment: any) => {
        comment.createTime = moment(comment.createTime).format('YYYY-MM-DD HH:mm:ss');
    });
    total.value = comments.value.total;
};

watch(currentPage, () => {
    getComments();
});

const completeDeleteComment = async (commentId: number) => {
    await apiCompleteDeleteComment(commentId);
    getComments();
};
</script>

<style lang="scss" scoped>
.commentsBox {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    justify-content: space-between;

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
