import Vue from 'vue'
// 引入element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App.vue'

Vue.config.productionTip = false

Vue.use(ElementUI)

new Vue({
  render: h => h(App)
}).$mount('#app')
