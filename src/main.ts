import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueCookies from 'vue-cookies'

import App from './App.vue'
import router from './router'
import { meetingService } from './services/meeting.service'
import type { IMeetingService } from './services/meeting.interface'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(VueCookies)
app.provide<IMeetingService>('meetingService', meetingService)
app.mount('#app')
