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
                    :autosize="{ minRows: 4, maxRows: 4 }"
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
            <el-form-item label="景点图片" prop="attractionImage">
                <UploadImage
                    ref="uploadImage"
                    :imageUrl="attractionImageUrl"
                    :isUpdate="props.isUpdate"
                    :attractionId="attractionId"
                    @image="(image) => (form.attractionImage = image)"
                />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleClick(formRef)">{{
                    props.isUpdate ? '更新景点' : '发布景点'
                }}</el-button>
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
import { apiUpdateAttraction, apiPublishAttraction } from '@/api/staff';
import { useAuthStore } from '@/stores/auth';
import { useUserAttractionStore } from '@/stores/user-attraction';
import router from '@/router';
const formRef = ref<FormInstance>();

const form = ref({} as AttractionForm);
const provinces = ref([] as ProvinceVO[]);
const cities = ref([] as CityVO[]);
const areas = ref([] as AreaVO[]);
const streets = ref([] as StreetVO[]);
const attractionImageUrl = ref();
const uploadImage = ref();
const attractionId = ref(0)

interface AttractionForm extends AttractionVO {
    attractionImage: any;
}

const rules = reactive<FormRules<AttractionForm>>({
    attractionName: [{ required: true, message: '请输入景点名称', trigger: 'blur' }],
    description: [{ required: true, message: '请输入景点描述', trigger: 'blur' }],
    location: [{ required: true, message: '请输入景点位置', trigger: 'blur' }],
    provinceCode: [{ required: true, message: '请选择省份', trigger: 'change' }],
    cityCode: [{ required: true, message: '请选择城市', trigger: 'change' }],
    areaCode: [{ required: true, message: '请选择县区', trigger: 'change' }],
    streetCode: [{ required: true, message: '请选择街道', trigger: 'change' }],
    attractionImage: [{ required: true, message: '请上传景点图片', trigger: 'blur' }]
});

const props = defineProps({
    isUpdate: Boolean
});

const userAttractionStore = useUserAttractionStore();
onMounted(async () => {
    const provincesRes = await apiGetProvinces();
    provinces.value = provincesRes.data;
    if (props.isUpdate) {
        const { attraction } = userAttractionStore;
        const { provinceCode, cityCode, areaCode, streetCode } = attraction;
        form.value = {
            ...form.value,
            id: attraction.id,
            attractionName: attraction.attractionName,
            description: attraction.description,
            location: attraction.location,
            provinceCode,
            cityCode,
            areaCode,
            streetCode
        };
        handleProvinceChange(provinceCode);
        handleCityChange(cityCode);
        handleAreaChange(areaCode);
        attractionImageUrl.value =
            import.meta.env.VITE_TRAVELER_BASE_URL +
            'common/getAttractionImageByAttractionId?attractionId=' +
            attraction.id;
    }
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

const authStore = useAuthStore();
const username = authStore.user?.sub;

const handleClick = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate(async (valid, fields) => {
        if (valid) {
            let apiAttractionFunction = props.isUpdate ? apiUpdateAttraction : apiPublishAttraction;
            const attractionRes = await apiAttractionFunction(form.value, username as string);
            attractionId.value = attractionRes.data.id;
            if (attractionRes.status === 200 && uploadImage.value.handleSubmit()) {
                ElMessage.success('操作成功');
                router.push('/attractions');
            } else {
                ElMessage.error('操作失败');
            }
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
