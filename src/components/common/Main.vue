<template>
    <el-tabs v-model="activeName" class="tabs">
        <el-tab-pane name="1" tab="1" label="旅游动态">
            <Post></Post>
        </el-tab-pane>
        <el-tab-pane name="2" tab="2" label="旅游订票">
            <BookingList></BookingList>
        </el-tab-pane>
    </el-tabs>
</template>

<script setup lang="ts">
const activeName = ref('2');
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
