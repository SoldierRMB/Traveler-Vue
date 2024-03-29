import { defineStore } from 'pinia';

export const useI18nStore = defineStore(
    'i18n',
    () => {
        const language = ref('zh-cn');
        return { language };
    },
    { persist: true }
);
