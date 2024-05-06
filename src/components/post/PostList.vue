<template>
    <el-space direction="vertical" alignment="flex-start">
        <el-card
            shadow="always"
            class="postCard"
            v-for="post in posts"
            :key="post"
            @click="openPostDetailsDialog(post.id)"
        >
            <template #header>
                <div class="avatar">
                    <el-avatar>
                        <template #default>
                            <i-ep-user-filled />
                        </template>
                    </el-avatar>
                </div>
                <div class="info">
                    <div class="username">{{ post.user.username }}</div>
                    <div class="postTime">{{ post.postTime }}</div>
                </div>
                <div class="title">
                    {{ post.title }}
                </div>
            </template>
            <div class="content" v-html="post.content"></div>
            <template #footer>
                <el-button type="primary" round @click.stop="openCommentFormDialog(post.id)">
                    <template #icon>
                        <i-ep-chat-line-round />
                    </template>
                </el-button>
            </template>
        </el-card>
    </el-space>
    <el-dialog v-model="postDetailsDialogVisible" title="评论详情" width="60%">
        <PostDetails :postId="postId" />
    </el-dialog>
    <el-dialog title="发布评论" width="60%" v-model="commentFormDialogVisible">
        <CommentForm :postId="postId" @closeDialog="closeDialog" />
    </el-dialog>
</template>

<script setup lang="ts">
import { loadPosts } from '@/common/post-common';
// import { useInfiniteScroll } from '@vueuse/core';

// const cards = ref<HTMLElement | null>(null);
const posts = ref();
const current = ref(1);
const size = ref(10000000);

const postDetailsDialogVisible = ref(false);
const commentFormDialogVisible = ref(false);
const closeDialog = (val: boolean) => {
    commentFormDialogVisible.value = val;
};

onMounted(async () => {
    await loadPosts(current.value, size.value).then((res) => {
        posts.value = res.records.map((post: any) => {
            post.content = post.content.replace(/\n/g, '<br>');
            return post;
        });
    });
});

/* const loadMore = async () => {
    current.value += 1;
    const res = await getPosts(current.value, size.value);
    posts.value.push(
        res.data.records.map((post: any) => {
            return {
                ...post,
                postTime: moment(post.createTime).format('YYYY-MM-DD HH:mm:ss')
            };
        })
    );
}; */

const postId = ref();

const openPostDetailsDialog = (id: number) => {
    postDetailsDialogVisible.value = true;
    postId.value = Number(id);
};

const openCommentFormDialog = (id: number) => {
    commentFormDialogVisible.value = true;
    postId.value = Number(id);
};
</script>

<style scoped lang="scss">
.postCard {
    width: 50rem;
    cursor: pointer;

    &:hover {
        color: var(--el-color-primary);
    }
}

:deep(.el-card__header) {
    display: flex;
    padding: 1rem 2rem;
    border: none;

    .info {
        display: flex;
        flex-direction: column;
        padding-left: 1rem;
        flex-shrink: 0;
        margin-right: auto;
        padding: 0 1rem;

        .username {
            font-size: 1.5rem;
            font-weight: bold;
        }

        .postTime {
            margin-top: 1rem;
            color: #9c9c9c;
        }
    }

    .title {
        display: flex;
        font-size: 1.8rem;
        font-weight: bold;
        align-items: center;
    }

    .content {
        white-space: pre-wrap;
    }
}

:deep(.el-card__body) {
    padding: 2rem 2rem 2rem 8.5rem;
    font-size: 1.5rem;
}

:deep(.el-card__footer) {
    display: flex;
    padding: 1rem 2rem;
    border: none;
    justify-content: center;
}
</style>
