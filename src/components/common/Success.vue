<template>
    <el-result icon="success">
        <template #title>
            <span class="title">支付成功</span>
        </template>
        <template #sub-title>
            <span class="subTitle">您的订单编号为 {{ orderId }}</span>
        </template>
        <template #extra>
            <el-button type="primary" @click="$router.back">返回上一级</el-button>
        </template>
    </el-result>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
const orderId = route.params.orderId as string;
</script>

<style lang="scss" scoped>
.title {
    font-size: 3rem;
    font-weight: bold;
}

.subTitle {
    font-size: 1.5rem;
}
</style>
