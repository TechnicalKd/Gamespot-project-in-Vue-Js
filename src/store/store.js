import Vue from 'vue'
import Vuex from 'vuex'
import admin from './modules/admin.js'
import posts from './modules/posts'


Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        admin,
        posts
    }
})