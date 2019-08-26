import axios from '@/utils/myaxios.js'

// 获取所有角色列表
export const getAllRoles = (params) => {
  return axios({
    url: 'roles',
    params
  })
}
