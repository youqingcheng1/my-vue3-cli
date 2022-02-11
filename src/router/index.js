import { createRouter, createWebHistory } from 'vue-router'
import other from "./other";

const routes = [
    ...other,
    {
        name:'home',
        path:'/',
        component:()=> import('@/view/Home.vue')
    }
]

const router = createRouter({
    history:createWebHistory(),
    routes
})

export default router