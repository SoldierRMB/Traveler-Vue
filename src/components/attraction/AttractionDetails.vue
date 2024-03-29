<template>
    <el-descriptions title="景点详细信息" border :column="4">
        <el-descriptions-item label="景点名称" label-align="center">{{
            attraction.attractionName
        }}</el-descriptions-item>
        <el-descriptions-item label="描述" label-align="center" :span="3">{{
            attraction.description
        }}</el-descriptions-item>
        <el-descriptions-item label="评分" label-align="center">{{
            attraction.score ? attraction.score : '暂无评分'
        }}</el-descriptions-item>
        <el-descriptions-item label="审核状态" label-align="center" align="center" :span="1.5">
            <template #default>
                <el-tag type="warning" v-show="attraction.reviewed == 0">未审核</el-tag>
                <el-tag type="success" v-show="attraction.reviewed == 1">审核通过</el-tag>
                <el-tag type="danger" v-show="attraction.reviewed == 2">审核不通过</el-tag>
            </template>
        </el-descriptions-item>
        <el-descriptions-item label="删除状态" label-align="center" align="center" :span="1.5">
            <template #default>
                <el-tag type="info" v-show="attraction.isDeleted == 0">未删除</el-tag>
                <el-tag type="danger" v-show="attraction.isDeleted == 1">已删除</el-tag>
            </template>
        </el-descriptions-item>
        <el-descriptions-item label="省份" label-align="center">{{
            province.name
        }}</el-descriptions-item>
        <el-descriptions-item label="城市" label-align="center">{{
            city.name
        }}</el-descriptions-item>
        <el-descriptions-item label="县区" label-align="center">{{
            area.name
        }}</el-descriptions-item>
        <el-descriptions-item label="街道" label-align="center">{{
            street.name
        }}</el-descriptions-item>
        <el-descriptions-item label="详细地址" label-align="center">{{
            attraction.location
        }}</el-descriptions-item>
        <el-descriptions-item label="景点管理员" label-align="center">{{
            user.username
        }}</el-descriptions-item>
        <el-descriptions-item label="邮箱" label-align="center">{{
            user.email
        }}</el-descriptions-item>
    </el-descriptions>
</template>

<script setup lang="ts">
import { useUserAttractionStore } from '@/stores/user-attraction';

const store = useUserAttractionStore();

const attraction = ref();
const user = ref();
const province = ref();
const city = ref();
const area = ref();
const street = ref();

attraction.value = store.attraction;
user.value = store.user;
province.value = store.province;
city.value = store.city;
area.value = store.area;
street.value = store.street;
</script>

<style lang="scss" scoped></style>
