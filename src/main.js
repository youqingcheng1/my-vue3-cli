import { createApp } from 'vue'
import App from './App.vue'
import messageCom from './components/Message'
import http from './config/api'

let type = /(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent) ? 'm' : 'pc'
if (type === 'm') {
    import('./assets/scss/m.scss')
} else {
    import('./assets/scss/pc.scss')
}

const app = createApp(App)
app.config.globalProperties.$message = messageCom
app.config.globalProperties.$http = http
app.mount('#app')
