import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// @ts-ignore
import VueRouter from 'vue-router'
import { VueQueryPlugin } from '@tanstack/vue-query'
// @ts-ignore
import router from './router/index.js'
// import VeeValidate from 'vee-validate';

// @ts-ignore
createApp(App).use(router).use(VueQueryPlugin).mount('#app')
