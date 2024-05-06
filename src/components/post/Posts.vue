<template>
    <div class="postsBox">
        <el-table :data="posts.records" border>
            <el-table-column align="center" label="动态标题" prop="title" min-width="10rem" />
            <el-table-column align="center" label="动态内容" prop="content" min-width="20rem" show-overflow-tooltip />
            <el-table-column align="center" label="用户名" prop="user.username" min-width="8rem" />
            <el-table-column align="center" label="发布时间" prop="postTime" min-width="10rem" />
            <el-table-column align="center" label="操作" min-width="8rem">
                <template #default="scope">
                    <div class="buttons">
                        <el-popconfirm
                            title="确认删除该条动态吗？"
                            confirm-button-text="确认"
                            cancel-button-text="取消"
                            @confirm="completeDeletePost(scope.row.id)"
                        >
                            <template #reference>
                                <el-button type="danger" size="small">删除动态</el-button>
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
import { loadPosts } from '@/common/post-common';
import { apiCompleteDeletePost } from '@/api/admin';

const posts = ref({ records: [], total: 0 });

const currentPage = ref(1);
const pageSize = ref(10);
const total = ref();

onMounted(async () => {
    getPosts();
});

const getPosts = async () => {
    posts.value = await loadPosts(currentPage.value, pageSize.value);
    total.value = posts.value.total;
};

watch(currentPage, () => {
    getPosts();
});

const completeDeletePost = async (postId: number) => {
    await apiCompleteDeletePost(postId);
    getPosts();
};
</script>

<style lang="scss" scoped>
.postsBox {
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
