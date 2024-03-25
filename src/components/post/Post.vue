<template>
    <el-space direction="vertical">
        <el-card shadow="always" class="postCard" v-for="posts in 5" :key="posts">
            <template #header>
                <div class="avatar">
                    <el-avatar :icon="UserFilled" />
                </div>
                <div class="info">
                    <div class="username">Admin</div>
                    <div class="postTime">2024-1-1 12:00</div>
                </div>
            </template>
            <div>故宫很好玩故宫很好玩故宫很好玩故宫很好玩</div>
            <template #footer>
                <el-button type="primary" :icon="ChatLineRound" round />
            </template>
        </el-card>
    </el-space>
</template>

<script setup lang="ts">
import { UserFilled, ChatLineRound } from '@element-plus/icons-vue';
</script>

<style scoped lang="scss">
.postCard {
    flex: 1;
}

:deep(.el-card__header) {
    display: flex;
    padding: 1rem 2rem;
    border: none;

    .info {
        display: flex;
        flex-direction: column;
        padding: 0.5rem 1rem;

        .username {
            font-size: 1.5rem;
            font-weight: bold;
        }

        .postTime {
            margin-top: auto;
            color: #9c9c9c;
        }
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
