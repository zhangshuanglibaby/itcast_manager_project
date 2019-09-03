import axios from '@/utils/myaxios.js'

// 获取分类参数的参数列表
export const getAllParams = (id, sel) => {
  return axios({
    url: `categories/${id}/attributes`,
    params: { sel }
  })
}

// 根据id查询参数
// export const getParamsInfo = (id, attrId, params) => {
//   return axios({
//     url: `categories/${id}/attributes/${attrId}`,
//     params
//   })
// }

// 添加动态参数或者静态属性
export const addParams = (id, data) => {
  return axios({
    url: `categories/${id}/attributes`,
    method: 'post',
    data
  })
}

// 编辑提交参数
export const editParams = (id, attrId) => {
  return axios({
    url: `categories/${id}/attributes/${attrId}`,
    method: 'put'
  })
}

// 删除参数
export const delParams = (id, attrId) => {
  return axios({
    url: `categories/${id}/attributes/${attrId}`,
    method: 'delete'
  })
}
