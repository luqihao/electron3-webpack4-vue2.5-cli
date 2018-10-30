const Hello2 = (resolve) => {
  import(/* webpackChunkName: 'Hello2' */ './Hello2').then((module) => {
    resolve(module)
  })
}
import './main1.css'
import './main2.css'
// import './main3.less'
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
  template: '<hello2/>',
  components: {
    Hello2
  },
  router
})

console.log('this is main2')

// if (module.hot) {
//   module.hot.accept();
// }