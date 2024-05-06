<template>
    <div v-for="announcement in announcements" :key="announcement.id" class="announcements">
        <div class="announcement">
            <div class="title">{{ announcement.title }}</div>
            <div class="content">{{ announcement.content }}</div>
            <div class="time">{{ announcement.createTime }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import moment from 'moment';
import { apiGetAnnouncements, apiGetAttractionAnnouncementsByAttractionId } from '@/api/common';

const current = ref(1);
const size = ref(10);
const announcements = ref();

const props = defineProps({
    attractionId: Number
});

onMounted(async () => {
    await getAttractionAnnouncementsByAttractionId();
});

const getAttractionAnnouncementsByAttractionId = async () => {
    let res;
    if (props.attractionId) {
        res = (
            await apiGetAttractionAnnouncementsByAttractionId(
                props.attractionId,
                current.value,
                size.value
            )
        ).data.records;
    } else {
        res = (await apiGetAnnouncements(current.value, size.value)).data.records;
    }
    announcements.value = res.map((announcement: any) => {
        announcement.createTime = moment(announcement.createTime).format('YYYY-MM-DD HH:mm:ss');
        return announcement;
    });
};

watch(
    () => props.attractionId,
    async () => {
        await getAttractionAnnouncementsByAttractionId();
    }
);
</script>

<style lang="scss" scoped>
.announcements {
    display: flex;
    flex-direction: column;
    gap: 3rem;

    .announcement {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        .title {
            font-size: 2.5rem;
            font-weight: bold;
        }

        .time {
            font-size: 1.5rem;
            color: #9c9c9c;
            text-align: end;
        }

        .content {
            font-size: 2rem;
            background-color: #f5f5f5;
            padding: 1rem;
            border-radius: 1rem;
        }
    }
}
</style>
