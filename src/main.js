import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { ElPagination } from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(router)
app.component('ElPagination', ElPagination)
app.mount('#app')
