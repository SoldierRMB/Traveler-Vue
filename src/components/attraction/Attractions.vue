<template>
    <div class="attractionsBox">
        <div>
            <div class="filter" v-if="false">
                <el-input v-model="keyword" placeholder="请输入景点名称" class="search" />
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
                class="table"
            >
                <el-table-column
                    align="center"
                    prop="attractionVO.attractionName"
                    label="景点名称"
                    min-width="150"
                />
                <el-table-column
                    align="center"
                    prop="provinceVO.name"
                    label="省份"
                    min-width="80"
                />
                <el-table-column align="center" prop="cityVO.name" label="城市" min-width="80" />
                <el-table-column align="center" prop="areaVO.name" label="县区" min-width="80" />
                <el-table-column align="center" prop="streetVO.name" label="街道" min-width="100" />
                <el-table-column
                    align="center"
                    prop="attractionVO.reviewed"
                    label="审核状态"
                    min-width="100"
                    :filters="reviewedFilter"
                    :filter-method="filterReviewed"
                    filter-placement="bottom"
                >
                    <template #default="scope">
                        <el-tag type="warning" v-if="scope.row.attractionVO.reviewed === 0"
                            >未审核</el-tag
                        >
                        <el-tag type="success" v-if="scope.row.attractionVO.reviewed === 1"
                            >审核通过</el-tag
                        >
                        <el-tag type="danger" v-if="scope.row.attractionVO.reviewed === 2"
                            >审核不通过</el-tag
                        >
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
                            :type="scope.row.attractionVO.isDeleted === 0 ? 'info' : 'danger'"
                            disable-transitions
                        >
                            {{ scope.row.attractionVO.isDeleted === 0 ? '未删除' : '已删除' }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="createTime"
                    label="创建时间"
                    min-width="100"
                />
                <el-table-column
                    align="center"
                    prop="updateTime"
                    label="更新时间"
                    min-width="100"
                />
            </el-table>
        </div>
        <!--         <el-pagination
            layout="total, prev, pager, next"
            :current-page="currentPage"
            :page-size="pageSize"
            :total="Number(total)"
            @current-change="currentPage = $event"
            class="pagination"
        /> -->
    </div>
</template>

<script setup lang="ts">
import { loadUserAttractions, goToAttractionDetails } from '@/common/user-attraction-common';
import { useAuthStore } from '@/stores/auth';
import { jwtDecode, type JwtPayload } from 'jwt-decode';

const userAttractions = ref();
const reviewedFilter = reactive([
    { text: '审核通过', value: '1' },
    { text: '审核不通过', value: '2' }
]);

/* const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(); */

const authStore = useAuthStore();
const token = authStore.token;
const decoded: JwtPayload = jwtDecode(token);
const username = decoded.sub as string;
const userRole = decoded.aud?.[0] as string;
onMounted(async () => {
    getAttractions();
});

const getAttractions = async () => {
    userAttractions.value =
        userRole === 'ROLE_ADMIN'
            ? await loadUserAttractions(userRole, username, true)
            : await loadUserAttractions(userRole, username, false);
    if (userRole === 'ROLE_STAFF') {
        reviewedFilter.unshift({ text: '未审核', value: '0' });
    }
};

/* watch(
    () => currentPage.value,
    () => {
        getAttractions();
    }
); */

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
.attractionsBox {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    justify-content: space-between;

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

    .table {
        flex: 1;
    }

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
}
</style>
