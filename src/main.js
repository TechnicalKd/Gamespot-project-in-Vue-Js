import Vue from 'vue'
import App from './App.vue'
import router from './routes'
import Button from './components/ui/button.vue'
import { MdCard } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import vueResouce from 'vue-resource'
import store from './store/store.js'


Vue.use(MdCard)
Vue.use(vueResouce)


Vue.http.options.root = ''
Vue.config.productionTip = false
Vue.component('app-button', Button)
new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')