import {createApp, VueElement} from 'vue'
import App from './App.vue'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
// import './assets/output.css'
import $bus from './utils/event'
import router from './router'
import $pages from './data'

const app = createApp(App)

app.use(router)

app.provide('$bus', $bus)
app.provide('$pages', $pages)

app.mount('#app')