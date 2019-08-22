// 引入vue
import Vue from 'vue'

// 引入vue-router
import VueRouter from 'vue-router'

// 引入组件
import login from '@/views/login.vue'
import home from '@/views/home.vue'

// 使用ues,让vue使用vue-router进行对路由的管理
Vue.use(VueRouter)

// 创建路由对象,实现路由映射组件
export default new VueRouter({
  // 使用routes进行路由配置
  routes: [
    {
      name: 'default',
      path: '/',
      redirect: { name: 'login' }
    },
    {
      name: 'login',
      path: '/login',
      component: login
    },
    {
      name: 'home',
      path: '/home',
      component: home
    }]

})
