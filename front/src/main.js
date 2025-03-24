import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { router } from "./router.js";
import { createPinia } from "pinia";
const pinia = createPinia();

createApp(App)
  .use(pinia)
  .use(router)
  .provide("hostUrl", "https://proud-bush-0a486df0f.6.azurestaticapps.net")
  .provide("serverUrl", "https://back-todoapp-bkhtedcuexe5ddb4.canadacentral-01.azurewebsites.net/api")
  //.provide("serverUrl", "https://todo-app-ga76.onrender.com/api")
  //.provide("hostUrl", "http://localhost:5173")
  //.provide("serverUrl", "http://localhost:3400/api")
  .mount("#app");
