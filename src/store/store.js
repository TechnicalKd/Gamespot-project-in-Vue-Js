import Vue from 'vue'
import Vuex from 'vuex'
import admin from './modules/admin.js'


Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        admin
    }
})