import Vue from 'vue'
import App from './App'
import 'style/reset.styl'
Vue.config.productionTip = false
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})