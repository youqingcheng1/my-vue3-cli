import { createApp } from 'vue'
import App from './App.vue'
import messageCom from './components/Message'
import http from './config/api'
import utils from './config/utils'
import('./assets/scss/init.scss')
import('./assets/scss/cssRem.scss')
const { type, isMiniWorldGame, wxType } = utils;
const app = createApp(App)
app.config.globalProperties.$message = messageCom
app.config.globalProperties.$type = type
app.config.globalProperties.$isGame = isMiniWorldGame
app.config.globalProperties.$http = http
app.config.globalProperties.$wxType = wxType
app.mount('#app')
