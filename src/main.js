import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/dracula-theme.css'
import * as bootstrap from 'bootstrap'

window.bootstrap = bootstrap

const app = createApp(App)

app.use(store)

app.mount('#app')
