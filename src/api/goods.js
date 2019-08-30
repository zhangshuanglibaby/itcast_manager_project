import axios from '@/utils/myaxios.js'

// 获取商品管理的所有商品列表数据
export const getAllGoods = (params) => {
  return axios({
    url: 'goods',
    params
  })
}

// 添加商品
export const addGoods = (data) => {
  return axios({
    url: 'goods',
    method: 'post',
    data
  })
}
