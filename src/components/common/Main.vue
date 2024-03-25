<template>
    <el-tabs v-model="activeName" class="tabs">
        <el-tab-pane name="1" tab="1" label="旅游动态">
            <Posts></Posts>
        </el-tab-pane>
        <el-tab-pane name="2" tab="2" label="旅游订票">
            <Booking></Booking>
        </el-tab-pane>
    </el-tabs>
</template>

<script setup lang="ts">
import Posts from '@/components/post/Post.vue';
import Booking from '@/components/booking/Booking.vue';

const activeName = ref('1');
</script>

<style scoped lang="scss">
.tabs {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0 20rem;
}

@media screen and (max-width: 1200px) {
    .tabs {
        padding: 0 10rem;
    }
}

@media screen and (max-width: 768px) {
    .tabs {
        padding: 0 5rem;
    }
}

@media screen and (max-width: 480px) {
    .tabs {
        padding: 0;
    }
}
</style>
