import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './axios'

// const cors = require("cors")

createApp(App).use(router)
/*.use(cors({ origin: "*", credentials: true }))*/
.mount('#app')
