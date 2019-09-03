import Vue from 'vue'
import axios from 'axios'
// 引入element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入路由
import router from '@/router/router.js'

// 引入样式
import '@/styles/index.less'

import App from './App.vue'
Vue.prototype.$axios = axios

Vue.config.productionTip = false

Vue.use(ElementUI)

// 设置导航守卫
router.beforeEach((to, from, next) => {
  // console.log(to)
  // 读取本地的token
  let mytoken = localStorage.getItem('itcast_manger')
  // 如果是登录页面或者已经登陆过的,则不用返回登录页面
  if (mytoken || to.path === '/login') {
    next()
  } else {
    // 跳转到登录页面
    next({ path: '/login' })
  }
})
new Vue({
  // 注入路由
  router,
  render: h => h(App)
}).$mount('#app')
