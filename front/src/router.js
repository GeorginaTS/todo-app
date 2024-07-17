import { createRouter, createWebHashHistory } from "vue-router";
import Home from "./views/Home.vue"
import Detail from "./views/Detail.vue"


const routes = [
    {path: '/', component: Home},
    {path: '/:id', component: Detail}
]

export const router = createRouter({ history: createWebHashHistory(), routes });