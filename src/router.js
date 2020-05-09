import Vue from 'vue';
import VueRouter from 'vue-router'

Vue.use(VueRouter);

import Home from "./components/Home.vue";
import About from "./components/About.vue";

export default new VueRouter({
    routes: [
        {
            path:'/',
            name:'Home',
            component: Home
        },
        {
            path: '/about',
            name: 'About',
            component: About
        }
    ]
});