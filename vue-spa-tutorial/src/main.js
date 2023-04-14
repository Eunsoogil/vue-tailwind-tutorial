import {createApp} from 'vue'
import App from './App.vue'
import router from './router'

import $bus from './utils/event'
import $pages from './data'


const app = createApp(App)

// install a plugin
app.use(router)

// inject in all descendant components
app.provide('$bus', $bus)
app.provide('$pages', $pages)

app.mount('#app')