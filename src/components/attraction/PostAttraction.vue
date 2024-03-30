<template>
    <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="auto"
        class="form"
        status-icon
        @submit.prevent
    >
        <div class="formItems">
            <el-form-item label="景点名称" prop="attractionName">
                <el-input placeholder="请输入景点名称" v-model="form.attractionName" />
            </el-form-item>
            <el-form-item label="景点描述" prop="description">
                <el-input
                    placeholder="请输入景点描述"
                    v-model="form.description"
                    type="textarea"
                    :autosize="{ minRows: 4, maxRows: 6 }"
                    resize="none"
                />
            </el-form-item>
            <el-form-item label="详细地址" prop="location">
                <el-input placeholder="请输入地址" v-model="form.location" />
            </el-form-item>
            <el-row :gutter="0">
                <el-col :span="12"
                    ><el-form-item label="省份" prop="provinceCode">
                        <el-select
                            v-model="form.provinceCode"
                            placeholder="请选择省份"
                            @change="handleProvinceChange"
                            clearable
                        >
                            <el-option
                                v-for="province in provinces"
                                :key="province.code"
                                :label="province.name"
                                :value="province.code"
                            />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="城市" prop="cityCode">
                        <el-select
                            v-model="form.cityCode"
                            placeholder="请选择城市"
                            @change="handleCityChange"
                            clearable
                        >
                            <el-option
                                v-for="city in cities"
                                :key="city.code"
                                :label="city.name"
                                :value="city.code"
                            />
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="0">
                <el-col :span="12">
                    <el-form-item label="县区" prop="areaCode">
                        <el-select
                            v-model="form.areaCode"
                            placeholder="请选择县区"
                            @change="handleAreaChange"
                            clearable
                        >
                            <el-option
                                v-for="area in areas"
                                :key="area.code"
                                :label="area.name"
                                :value="area.code"
                            />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="街道" prop="streetCode">
                        <el-select v-model="form.streetCode" placeholder="请选择街道" clearable>
                            <el-option
                                v-for="street in streets"
                                :key="street.code"
                                :label="street.name"
                                :value="street.code"
                            />
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item>
                <el-button type="primary" @click="postAttraction(formRef)">发布景点</el-button>
            </el-form-item>
        </div>
    </el-form>
</template>

<script setup lang="ts">
import type { AttractionVO, ProvinceVO, CityVO, AreaVO, StreetVO } from '@/types/interfaces';
import type { FormInstance, FormRules } from 'element-plus';
import {
    apiGetProvinces,
    apiGetCitiesByProvinceCode,
    apiGetAreasByCityCode,
    apiGetStreetsByAreaCode
} from '@/api/common';
import { apiPostAttraction } from '@/api/staff';
import { useAuthStore } from '@/stores/auth';
import axios from 'axios';
const formRef = ref<FormInstance>();

const form = ref({} as AttractionVO);
const provinces = ref([] as ProvinceVO[]);
const cities = ref([] as CityVO[]);
const areas = ref([] as AreaVO[]);
const streets = ref([] as StreetVO[]);

const rules = reactive<FormRules<AttractionVO>>({
    attractionName: [{ required: true, message: '请输入景点名称', trigger: 'blur' }],
    description: [{ required: true, message: '请输入景点描述', trigger: 'blur' }],
    location: [{ required: true, message: '请输入景点位置', trigger: 'blur' }],
    provinceCode: [{ required: true, message: '请选择省份', trigger: 'change' }],
    cityCode: [{ required: true, message: '请选择城市', trigger: 'change' }],
    areaCode: [{ required: true, message: '请选择县区', trigger: 'change' }],
    streetCode: [{ required: true, message: '请选择街道', trigger: 'change' }]
});

onMounted(async () => {
    const provincesRes = await apiGetProvinces();
    provinces.value = provincesRes.data;
});

const handleProvinceChange = async (provinceCode: number) => {
    const citiesRes = await apiGetCitiesByProvinceCode(provinceCode);
    cities.value = citiesRes.data;
    areas.value = [];
    streets.value = [];
};

const handleCityChange = async (cityCode: number) => {
    const areasRes = await apiGetAreasByCityCode(cityCode);
    areas.value = areasRes.data;
    streets.value = [];
};

const handleAreaChange = async (areaCode: number) => {
    const streetsRes = await apiGetStreetsByAreaCode(areaCode);
    streets.value = streetsRes.data;
};

const postAttraction = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate(async (valid, fields) => {
        if (valid) {
            const authStore = useAuthStore();
            const username = authStore.user?.sub;
            return await apiPostAttraction(form.value, username as string).then((res) => {
                res.data.code == 200
                    ? ElMessage.success('景点发布成功，待管理员审核')
                    : ElMessage.error('景点发布失败，请联系管理员');
            });
        }
    });
};
</script>

<style lang="scss" scoped>
.form {
    display: flex;
    flex-direction: column;
    align-items: center;

    .formItems {
        transform: translateX(-6%);
        min-width: 50rem;
    }
}
</style>
