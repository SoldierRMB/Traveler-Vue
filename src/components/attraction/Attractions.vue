<template>
    <div>
        <div class="filter">
            <el-input v-model="keyword" placeholder="请输入景点名称" class="search"></el-input>
            <el-button type="primary" @click="searchAttractions" class="searchButton"
                >搜索</el-button
            >
        </div>
        <el-table
            :data="userAttractions"
            stripe
            highlight-current-row
            :default-sort="{ prop: 'createTime', order: 'descending' }"
            @row-click="goToAttraction"
        >
            <el-table-column
                align="center"
                prop="attractionVO.attractionName"
                label="景点名称"
                min-width="150"
            />
            <el-table-column align="center" prop="provinceVO.name" label="省份" min-width="80" />
            <el-table-column align="center" prop="cityVO.name" label="城市" min-width="80" />
            <el-table-column align="center" prop="areaVO.name" label="县区" min-width="80" />
            <el-table-column align="center" prop="streetVO.name" label="街道" min-width="100" />
            <el-table-column
                align="center"
                prop="attractionVO.reviewed"
                label="审核状态"
                min-width="100"
                :filters="[
                    { text: '审核通过', value: '1' },
                    { text: '审核不通过', value: '2' }
                ]"
                :filter-method="filterReviewed"
                filter-placement="bottom"
            >
                <template #default="scope">
                    <el-tag
                        :type="scope.row.attractionVO.reviewed == 1 ? 'success' : 'danger'"
                        disable-transitions
                    >
                        {{ scope.row.attractionVO.reviewed == 1 ? '审核通过' : '审核不通过' }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                prop="attractionVO.isDeleted"
                label="删除状态"
                min-width="100"
                :filters="[
                    { text: '未删除', value: '0' },
                    { text: '已删除', value: '1' }
                ]"
                :filter-method="filterDeleted"
                filter-placement="bottom"
            >
                <template #default="scope">
                    <el-tag
                        :type="scope.row.attractionVO.isDeleted == 0 ? 'info' : 'danger'"
                        disable-transitions
                    >
                        {{ scope.row.attractionVO.isDeleted == 0 ? '未删除' : '已删除' }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="createTime" label="创建时间" min-width="100" />
            <el-table-column align="center" prop="updateTime" label="更新时间" min-width="100" />
        </el-table>
    </div>
</template>

<script setup lang="ts">
import { loadUserAttractions, goToAttractionDetails } from '@/common/common';
import { useAuthStore } from '@/stores/auth';
import { jwtDecode, type JwtPayload } from 'jwt-decode';

const userAttractions = ref();

onMounted(async () => {
    const authStore = useAuthStore();
    const token = authStore.token;
    const decoded: JwtPayload = jwtDecode(token);
    const username = decoded.sub as string;
    const userRole = decoded.aud?.[0] as string;
    userAttractions.value = await loadUserAttractions(userRole, username, false);
});

const goToAttraction = (row: any) => {
    goToAttractionDetails(row);
};

const keyword = ref('');

const searchAttractions = async () => {};

const filterReviewed = (value: any, row: any) => {
    return row.attractionVO.reviewed == value;
};

const filterDeleted = (value: any, row: any) => {
    return row.attractionVO.isDeleted == value;
};
</script>

<style lang="scss" scoped>
.filter {
    display: flex;
    align-items: center;
    padding-bottom: 2rem;

    .search {
        max-width: 20rem;
    }

    .searchButton {
        margin-left: 2rem;
    }
}

:deep(.el-table__row) {
    cursor: pointer;

    &:hover {
        color: var(--el-color-primary);
    }
}
</style>
