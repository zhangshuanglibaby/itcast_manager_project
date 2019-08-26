// 获取所有权限列表
import axios from '@/utils/myaxios.js'

export const getAllrights = (list) => {
  return axios({
    url: `rights/${list}`
  })
}
