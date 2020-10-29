import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './css/index.scss'
import Vant from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'
import '@/utils/day'

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
