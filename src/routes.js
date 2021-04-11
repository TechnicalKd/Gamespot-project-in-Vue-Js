/* eslint-disable  */
import Vue from 'vue'
import vueRouter from 'vue-router'
import Home from '../src/components/home/index.vue'
import SignIn from '../src/components/signin/index.vue'
import Dashboard from './components/Dashboard/index.vue'
import store from './store/store'
import AddPost from './components/Dashboard/addPost.vue'
import ViewPost from './components/Dashboard/listPost.vue'
import MainDashboard from './components/Dashboard/main.vue'


Vue.use(vueRouter)
const authGuard = {
    beforeEnter: (to, from, next) => {
        if (store.state.admin.token) {
            next()
        } else {
            next('/')
        }


    }
}

const routes = [
    { path: '/', component: Home },
    { path: '/signin', component: SignIn },
    {
        path: '/dashboard',
        component: Dashboard,
        children: [
            { path: '/', component: MainDashboard },
            { path: 'add_post', component: AddPost },
            { path: 'all_post', component: ViewPost }
        ],
        ...authGuard
    }

];

export default new vueRouter({
    mode: 'history',
    routes,
    // scrollBehavior(from, to, savedPostion) {
    //     return { x: 0, y: 0 }
    // }
});