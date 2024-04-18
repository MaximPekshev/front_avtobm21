import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { globalCookiesConfig } from "vue3-cookies"
import { fullscreenImagePlugin } from 'vue-3-fullscreen-image-directive-plugin'
import 'vue-3-fullscreen-image-directive-plugin/style.css'

export const backendPath = 'https://back.avtobm21.ru'

globalCookiesConfig({
  expireTimes: "7d",
});

createApp(App).use(fullscreenImagePlugin).use(store).use(router).mount('#app')
