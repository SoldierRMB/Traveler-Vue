<template>
    <div>
        <div class="buttons">
            <el-button type="success" @click="reviewAttractions(true)">审核一键通过</el-button>
            <el-button type="danger" @click="reviewAttractions(false)">审核一键不通过</el-button>
        </div>
        <el-table
            :data="userAttractions"
            stripe
            highlight-current-row
            :default-sort="{ prop: 'createTime', order: 'ascending' }"
            @row-click="goToAttraction"
            @selection-change="handleSelectionChange"
        >
            <el-table-column type="selection" width="55" />
            <el-table-column
                v-for="column in columns"
                align="center"
                :key="column.prop"
                :prop="column.prop"
                :label="column.label"
                :min-width="column.minWidth"
            />
        </el-table>
    </div>
</template>

<script setup lang="ts">
import { apiReviewAttractions } from '@/api/admin';
import { loadUserAttractions, goToAttractionDetails } from '@/common/user-attraction-common';

const columns = [
    {
        prop: 'attractionVO.attractionName',
        label: '景点名称',
        minWidth: 150
    },
    {
        prop: 'provinceVO.name',
        label: '省份',
        minWidth: 80
    },
    {
        prop: 'cityVO.name',
        label: '城市',
        minWidth: 80
    },
    {
        prop: 'areaVO.name',
        label: '县区',
        minWidth: 80
    },
    {
        prop: 'streetVO.name',
        label: '街道',
        minWidth: 100
    },
    {
        prop: 'userVO.username',
        label: '景点管理员',
        minWidth: 100
    },
    {
        prop: 'createTime',
        label: '创建时间',
        minWidth: 100
    },
    {
        prop: 'updateTime',
        label: '更新时间',
        minWidth: 100
    }
];

const userAttractions = ref();

onMounted(async () => {
    getUserAttractions();
});

const getUserAttractions = async () => {
    userAttractions.value = await loadUserAttractions('ROLE_ADMIN', undefined, false);
};

const goToAttraction = (row: any) => {
    goToAttractionDetails(row);
};

const multipleSelection = ref([]);
const handleSelectionChange = (val: any) => {
    multipleSelection.value = val.map((item: any) => item.attractionVO.id);
};

const reviewAttractions = async (pass: boolean) => {
    return await apiReviewAttractions(multipleSelection.value, pass).then((res) => {
        getUserAttractions();
        ElMessage.success(`${res.data}`);
    });
};
</script>

<style lang="scss" scoped>
.buttons {
    padding-bottom: 2rem;
}

:deep(.el-table__row) {
    cursor: pointer;

    &:hover {
        color: var(--el-color-primary);
    }
}
</style>
