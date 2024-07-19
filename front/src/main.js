import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { router } from './router.js'
import { createPinia } from 'pinia'
const pinia = createPinia()

createApp(App)
.use(pinia)
.use(router)
.provide("hostUrl", "http://localhost:5173")
.provide("serverUrl", "http://localhost:3400/api")
.mount('#app')
