import { createRouter, createWebHashHistory } from "vue-router";
import Login from "./views/Login.vue"
import Home from "./views/Home.vue"
import Detail from "./views/Detail.vue"
import NotFound from "./views/NotFound.vue"
import Profile from "./views/Profile.vue"
import Register from "./views/Register.vue"

import { useUserStore } from "./stores/user";

const routes = [
    {path: '/', component: Login},
    {path: '/register', component: Register},
    {path: '/auth', component: Home, meta: {requireAuth:true}},
    {path: '/auth/:id', component: Detail, meta: {requireAuth:true}},
    {path: '/auth/profile', component: Profile, meta: {requireAuth:true}},
    {path:'/:pathMatch(.*)*', component: NotFound},
]

export const router = createRouter({ history: createWebHashHistory(), routes });

// Define a global beforeEach navigation guard
router.beforeEach((to, from, next) => {
    const userStore = useUserStore(); // Access the store here
    const requiresAuth = to.matched.some(item=> item.meta.requireAuth);
  
    if (requiresAuth && !userStore.loggedIn) {
      next('/'); // Redirect to login page if not authenticated
    } else {
      next(); // Proceed to the route if authentication is not required or user is logged in
    }
  });