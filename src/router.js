import Vue from 'vue'
import Router from 'vue-router'
const page1 = (resolve) => {
  import(/* webpackChunkName: 'page1' */ './page1').then((module) => {
    resolve(module)
  })
}
const page2 = (resolve) => {
  import(/* webpackChunkName: 'page2' */ './page2').then((module) => {
    resolve(module)
  })
}
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      name: '首页',
      component: page1
    },
    {
      path: '/page2',
      name: '提问解答',
      component: page2
    },
  ]
})

export default router
