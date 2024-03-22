<template>
    <el-tabs v-model="activeName" class="tabs">
        <el-tab-pane name="1" tab="1" label="旅游动态">123</el-tab-pane>
        <el-tab-pane name="2" tab="2" label="旅游订票">321</el-tab-pane>
    </el-tabs>
</template>

<script setup lang="ts">
const activeName = ref('1')
</script>

<style scoped lang="scss">
.tabs{
	width: 100%;
}
</style>
