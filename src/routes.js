import Vue from 'vue'
import vueRouter from 'vue-router'
import Home from '../src/components/home/index.vue'
import SignIn from '../src/components/signin/index.vue'

Vue.use(vueRouter)

const routes = [
    { path: '/', component: Home },
    { path: '/signin', component: SignIn }
];

export default new vueRouter({
    mode: 'history',
    routes,
    // scrollBehavior(from, to, savedPostion) {
    //     return { x: 0, y: 0 }
    // }
});