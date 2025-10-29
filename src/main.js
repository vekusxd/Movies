import { createApp } from 'vue'
import App from './App.vue'
import { ElPagination } from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.component('ElPagination', ElPagination)
app.mount('#app')
