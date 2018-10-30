const Hello1 = (resolve) => {
  import(/* webpackChunkName: 'Hello1' */ './Hello1').then((module) => {
    resolve(module)
  })
}
import './main1.css'
import './main2.css'
import './main3.less'
// import './main1.js'
// import './main2.js'
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import router from './router'
Vue.use(ElementUI)

Vue.config.productionTip = false
new Vue({
  el: '#app',
  template: '<hello1/>',
  components: {
    Hello1
  },
  router
})

console.log('this is main1')
// if (module.hot) {
//   module.hot.accept();
// }