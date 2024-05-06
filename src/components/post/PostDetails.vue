<template>
    <div class="comments">
        <div class="comment" v-for="comment in comments" :key="comment.id">
            <div class="info">
                <el-avatar>
                    <template #default>
                        <i-ep-user-filled />
                    </template>
                </el-avatar>
                <div class="user">
                    <div class="username">
                        {{ comment.user.username }}
                    </div>
                    <div class="time">
                        {{ comment.createTime }}
                    </div>
                </div>
            </div>
            <div class="content">
                {{ comment.content }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import moment from 'moment';
import { apiGetCommentsByPostId } from '@/api/common';

const comments = ref();
const current = ref(1);
const size = ref(100000000);

const props = defineProps({
    postId: Number
});

onMounted(async () => {
    getCommentsByPostId();
});

const getCommentsByPostId = async () => {
    if (props.postId) {
        comments.value = (
            await apiGetCommentsByPostId(props.postId as number, current.value, size.value)
        ).data.records;
        comments.value.forEach((comment: any) => {
            comment.createTime = moment(comment.createTime).format('YYYY-MM-DD HH:mm:ss');
        });
    }
};

watch(
    () => props.postId,
    () => {
        getCommentsByPostId();
    }
);
</script>

<style lang="scss" scoped>
.comments {
    display: flex;
    flex-direction: column;
    gap: 3rem;

    .comment {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        .info {
            display: flex;
            align-items: center;
            gap: 1rem;

            .user {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;

                .username {
                    font-weight: bold;
                }

                .time {
                    font-size: 1rem;
                    color: #9c9c9c;
                }
            }
        }

        .content {
            background-color: #f5f5f5;
            padding: 1rem;
            border-radius: 1rem;
        }
    }
}
</style>
