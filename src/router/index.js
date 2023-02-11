// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Details from '../views/Details.vue'
import Home from '../views/Home.vue'

const routes = [
    {
        path: '/details/:pair',
        name: 'Details',
        component: Details
    },
    {
        path: '/',
        name: 'Home',
        component: Home
    }
]

const router = createRouter({ history: createWebHistory(), routes })
export default router
