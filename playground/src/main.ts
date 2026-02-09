import { PiniaColada } from '@pinia/colada'
import { createPinia } from 'pinia'
import { PiniaColadaRecentlySuccessfulPlugin } from 'pinia-colada-plugin-recently-successful'
import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(PiniaColada, {
  plugins: [PiniaColadaRecentlySuccessfulPlugin()],
})

app.mount('#app')
