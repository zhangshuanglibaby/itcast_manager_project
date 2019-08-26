import axios from '@/utils/myaxios.js'

// 获取所有角色列表
export const getAllRoles = () => {
  return axios({
    url: 'roles'
  })
}

// 添加角色
export const addRole = (data) => {
  return axios({
    url: 'roles',
    method: 'post',
    data
  })
}

// 删除角色指定权限
export const delRoleRightbyId = (roleId, rightId) => {
  return axios({
    url: `roles/${roleId}/rights/${rightId}`,
    method: 'delete'
  })
}
