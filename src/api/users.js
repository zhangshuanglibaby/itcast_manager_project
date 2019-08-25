// 获取用户数据列表

import axios from '@/utils/myaxios.js'

// 获取用户数据请求
export const getAllUsers = (params) => {
  return axios({
    url: 'users',
    params
  })
}

// 添加用户接口请求
export const addUser = (data) => {
  return axios({
    method: 'post',
    url: 'users',
    data
  })
}

// 编辑用户提交
export const editUser = (data) => {
  return axios({
    url: `users/${data.id}`,
    method: 'put',
    data
  })
}
