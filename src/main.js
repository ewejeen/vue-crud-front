import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import axios from "axios";

const app = createApp(App);
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$serverUrl = "http://localhost:8880";
app.use(router).mount('#app')
