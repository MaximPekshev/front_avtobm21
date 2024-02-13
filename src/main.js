import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { globalCookiesConfig } from "vue3-cookies"

globalCookiesConfig({
  expireTimes: "7d",
});

createApp(App).use(store).use(router).mount('#app')
