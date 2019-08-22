// 这里封装了验证登录的验证方法

// 引入axios

import axios from '@/utils/myaxios.js'

// 实现登录验证
export const login = (data) => {
  return axios({
    method: 'post',
    url: 'login',
    data
  })
}
