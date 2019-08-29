import axios from '@/utils/myaxios.js'

// 获取商品分类的商品数据列表
export const getAllCates = (type) => {
  return axios({
    url: 'categories',
    params: { type }
  })
}
