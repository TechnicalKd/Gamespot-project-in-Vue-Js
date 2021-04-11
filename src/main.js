import Vue from 'vue'
import App from './App.vue'
import router from './routes'
import Button from './components/ui/button.vue'
import { MdCard, MdButton, MdDialog, MdContent } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import vueResouce from 'vue-resource'
import store from './store/store.js'
import vuelidate from 'vuelidate'
import wysiwyg from "vue-wysiwyg";


Vue.use(MdCard)
Vue.use(MdButton)
Vue.use(MdDialog)
Vue.use(MdContent)
Vue.use(vueResouce)
Vue.use(vuelidate)
Vue.use(wysiwyg, {});


Vue.http.options.root = 'https://gamespot-dfd7d-default-rtdb.firebaseio.com/'
Vue.config.productionTip = false
Vue.component('app-button', Button)
new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')