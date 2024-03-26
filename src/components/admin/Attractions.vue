<template>
    <div>
        <el-table
            :data="userAttractions"
            stripe
            highlight-current-row
            :default-sort="{ prop: 'createTime', order: 'descending' }"
        >
            <el-table-column
                align="center"
                prop="attractionVO.attractionName"
                label="景点名称"
                min-width="150"
            />
            <el-table-column
                align="center"
                prop="attractionVO.provinceCode"
                label="省级编码"
                min-width="80"
            />
            <el-table-column
                align="center"
                prop="attractionVO.cityCode"
                label="地级编码"
                min-width="80"
            />
            <el-table-column
                align="center"
                prop="attractionVO.areaCode"
                label="县级编码"
                min-width="80"
            />
            <el-table-column
                align="center"
                prop="attractionVO.streetCode"
                label="乡级编码"
                min-width="100"
            />
            <el-table-column
                align="center"
                prop="attractionVO.reviewed"
                label="审核状态"
                min-width="100"
            >
                <template #default="scope">
                    <el-tag type="warning" v-show="scope.row.attractionVO.reviewed == 0"
                        >未审核</el-tag
                    >
                    <el-tag type="success" v-show="scope.row.attractionVO.reviewed == 1"
                        >审核通过</el-tag
                    >
                    <el-tag type="error" v-show="scope.row.attractionVO.reviewed == 3"
                        >审核不通过</el-tag
                    >
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                prop="attractionVO.isDeleted"
                label="删除状态"
                min-width="80"
            >
                <template #default="scope">
                    <el-tag type="info" v-show="scope.row.attractionVO.isDeleted == 0"
                        >未删除</el-tag
                    >
                    <el-tag type="error" v-show="scope.row.attractionVO.isDeleted == 1"
                        >已删除</el-tag
                    >
                </template>
            </el-table-column>
            <el-table-column align="center" prop="createTime" label="创建时间" min-width="100" />
            <el-table-column align="center" prop="updateTime" label="更新时间" min-width="100" />
        </el-table>
    </div>
</template>

<script setup lang="ts">
import moment from 'moment';
import { apiGetAllUserAttractions } from '@/api/userAttraction';

interface UserAttractionVO {
    userVO: UserVO;
    attractionVO: AttractionVO;
}

interface AttractionVO {
    id: number;
    attractionName: string;
    description: string;
    location: string;
    score?: any;
    provinceCode: number;
    cityCode: number;
    areaCode: number;
    streetCode: number;
    reviewed: number;
    isDeleted: number;
    createTime: string;
    updateTime: string;
}

interface UserVO {
    id: number;
    username: string;
    password?: any;
    email: string;
    userType?: any;
    code?: any;
}

const userAttractions = ref<UserAttractionVO[]>([]);

const init = async () => {
    userAttractions.value = (await apiGetAllUserAttractions()).data.map((attraction) => {
        return {
            userVO: attraction.userVO,
            attractionVO: attraction.attractionVO,
            createTime: moment(attraction.attractionVO.createTime).format('YYYY-MM-DD'),
            updateTime: moment(attraction.attractionVO.updateTime).format('YYYY-MM-DD')
        };
    });
};

init();
</script>

<style lang="scss" scoped></style>
