import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { router } from './router'
import { VueQueryPlugin } from '@tanstack/vue-query'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { VueDatePicker } from '@vuepic/vue-datepicker'
import './plugins/chart'

const app = createApp(App)
app.use(Vue3Toastify, {
  autoClose: 3000,
} as ToastContainerOptions)
app.use(router)
app.use(VueQueryPlugin)
app.component('VueDatePicker', VueDatePicker)
app.mount('#app')
