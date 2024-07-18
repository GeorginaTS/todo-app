import { createRouter, createWebHashHistory } from "vue-router";
import Login from "./views/Login.vue"
import Home from "./views/Home.vue"
import Detail from "./views/Detail.vue"
import NotFound from "./views/NotFound.vue"


const routes = [
    {path: '/', component: Login},
    {path: '/auth', component: Home},
    {path: '/auth/:id', component: Detail},
    {path:'/:pathMatch(.*)*', component: NotFound},
]

export const router = createRouter({ history: createWebHashHistory(), routes });