<template>
    <el-config-provider :locale="locale" :button="config">
        <RouterView />
    </el-config-provider>
</template>

<script setup lang="ts">
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import en from 'element-plus/dist/locale/en.mjs';
import { RouterView } from 'vue-router';
import { useI18nStore } from '@/stores/i18n';

const i18nStore = useI18nStore();
const locale = computed(() => (i18nStore.language === 'zh-cn' ? zhCn : en));
const config = reactive({
    autoInsertSpace: true
});
</script>

<style lang="scss">
* {
    margin: 0;
    padding: 0;
}

html,
body,
#app {
    font-size: 10px;
    width: 100vw;
    overflow: hidden;
}

:root {
    overflow-y: auto;
    overflow-x: hidden;
}

:root body {
    position: absolute;
}

::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

::-webkit-scrollbar-track {
    background-color: transparent;
}

::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background: #e3e3e38e;
}
</style>
