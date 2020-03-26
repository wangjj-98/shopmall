import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Notify, SubmitBar } from 'vant'
import 'vant/lib/index.css'
import moment from 'moment'
import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'
// import 'lib-flexible/flexible'

Vue.config.productionTip = false

Vue.use(Notify);
Vue.use(SubmitBar);
Vue.filter('formatDate', function (input) {
  return moment(input).format('YYYY-MM-DD')
})
Vue.use(VueLazyload)
//解决移动端300毫秒延迟
FastClick.attach(document.body)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
