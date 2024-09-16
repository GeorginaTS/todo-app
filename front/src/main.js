import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { router } from "./router.js";
import { createPinia } from "pinia";
const pinia = createPinia();

createApp(App)
  .use(pinia)
  .use(router)
  .provide("hostUrl", "https://georgina-todoapp.netlify.app")
  //.provide("serverUrl", "https://todo-app-production-92f0.up.railway.app/#/auth")
  .provide("serverUrl", "https://todo-app-ga76.onrender.com/api")
  //.provide("hostUrl", "http://localhost:5173")
  //.provide("serverUrl", "http://localhost:3400/api")
  .mount("#app");
