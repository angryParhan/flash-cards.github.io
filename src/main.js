import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { longClickDirective } from 'vue-long-click'

const longClickInstance = longClickDirective({ delay: 900, interval: 1000 })
Vue.directive('longclick', longClickInstance)





import 'normalize.css'
import '../src/reset/reset.css'

Vue.config.productionTip = false




new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
