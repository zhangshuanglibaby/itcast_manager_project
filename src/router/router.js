// 引入vue
import Vue from 'vue'

// 引入vue-router
import VueRouter from 'vue-router'

// 引入组件
import login from '@/views/login.vue'
import home from '@/views/home.vue'
import welcome from '@/views/welcome.vue'
import users from '@/views/users/users.vue'
import roles from '@/views/rights/roles.vue'
import rights from '@/views/rights/rights.vue'
import goodsList from '@/views/goods/goodsList.vue'
import addGood from '@/views/goods/addGood.vue'
import reports from '@/views/reports/reports.vue'

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
      component: home,
      // 重定向
      redirect: { name: 'welcome' },
      children: [
        {
          name: 'welcome',
          path: 'welcome',
          component: welcome
        },
        {
          name: 'users',
          path: 'users',
          component: users
        },
        {
          name: 'roles',
          path: 'roles',
          component: roles
        },
        {
          name: 'rights',
          path: 'rights',
          component: rights
        },
        {
          name: 'goods',
          path: 'goods',
          component: goodsList
        },
        {
          name: 'add',
          path: 'add',
          component: addGood
        },
        {
          name: 'reports',
          path: 'reports',
          component: reports
        }
      ]
    }]

})
