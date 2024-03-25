import type { App } from 'vue';
import SvgIcon from '@/components/icon/SvgIcon.vue';
export default (app: App) => {
    app.component('svg-icon', SvgIcon);
};
