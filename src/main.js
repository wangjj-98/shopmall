import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Lazyload, Notify, SubmitBar } from 'vant'
import 'vant/lib/index.css'
import moment from 'moment'

Vue.config.productionTip = false
Vue.use(Lazyload, {
  lazyComponent: true
});
Vue.use(Notify);
Vue.use(SubmitBar);
Vue.filter('formatDate', function (input) {
  return moment(input).format('YYYY-MM-DD')
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
