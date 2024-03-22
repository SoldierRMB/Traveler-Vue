import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import SvgIcon from '@/assets/icons/index'
import 'virtual:svg-icons-register'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(SvgIcon)

app.mount('#app')
