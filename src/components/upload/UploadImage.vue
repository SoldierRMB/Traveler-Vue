<template>
    <el-upload
        :http-request="uploadAttractionImage"
        accept="image/jpeg, image/png"
        v-model:file-list="fileList"
        list-type="picture-card"
        :auto-upload="false"
        :on-change="handleChange"
        :limit="1"
    >
        <el-icon><i-ep-plus /></el-icon>
        <template #file="{ file }">
            <div>
                <el-image
                    class="el-upload-list__item-thumbnail"
                    fit="cover"
                    :src="file.url"
                    alt=""
                />
                <span class="el-upload-list__item-actions">
                    <span
                        class="el-upload-list__item-preview"
                        @click="handlePictureCardPreview(file)"
                    >
                        <el-icon><i-ep-zoom-in /></el-icon>
                    </span>
                    <span class="el-upload-list__item-delete" @click="handleRemove(file, file)">
                        <el-icon><i-ep-delete /></el-icon>
                    </span>
                </span>
            </div>
        </template>
    </el-upload>
    <div class="description">仅支持JPEG/PNG格式</div>

    <el-dialog width="80%" :modal="false" align-center v-model="dialogVisible">
        <el-image :src="dialogImageUrl" alt="Preview Image" style="padding-top: 1rem" />
    </el-dialog>
</template>

<script lang="ts" setup>
import type { UploadProps, UploadFile, UploadFiles, UploadUserFile } from 'element-plus';
import { apiUpdateAttractionImage, apiUploadAttractionImage } from '@/api/staff';
import { useAuthStore } from '@/stores/auth';

const fileList = ref<UploadUserFile[]>([]);
const dialogImageUrl = ref('');
const dialogVisible = ref(false);
const username = useAuthStore().user.sub;

const props = defineProps({
    imageUrl: String,
    isUpdate: Boolean,
    form: Object
});

watch(
    () => props.imageUrl,
    (newVal) => {
        if (newVal) {
            fileList.value.push({
                name: 'attraction_image',
                url: newVal
            });
        }
    }
);

const emits = defineEmits(['image']);

const handleChange = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
    emits('image', uploadFile);
};

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
    dialogImageUrl.value = uploadFile.url!;
    dialogVisible.value = true;
};

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
    fileList.value = [];
};

const uploadAttractionImage = async () => {
    let apiFunction = props.isUpdate ? apiUpdateAttractionImage : apiUploadAttractionImage;
    const formData = new FormData();
    const file = fileList.value[0].raw as File;
    formData.append('file', file);
    formData.append('attractionId', props.form?.id as string);
    formData.append('username', username as string);
    await apiFunction(formData);
};
</script>

<style lang="scss" scoped>
:deep(.el-upload--picture-card) {
    --el-upload-picture-card-size: 10rem !important;
}

:deep(.el-upload-list--picture-card) {
    --el-upload-list-picture-card-size: 10rem !important;
}

.description {
    margin-top: auto;
    margin-left: 0.5rem;
    font-size: 1.2rem;
    color: #999;
}
</style>
