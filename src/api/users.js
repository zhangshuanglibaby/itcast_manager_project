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

// 分配用户角色
export const grantRole = (data) => {
  return axios({
    url: `users/${data.id}/role`,
    method: 'put',
    data
  })
}

// 修改用户状态
export const changeUserStatus = (uId, type) => {
  return axios({
    url: `users/${uId}/state/${type}`,
    method: 'put'
  })
}

// 删除用户
export const delUserById = (id) => {
  return axios({
    url: `users/${id}`,
    method: 'delete'
  })
}
