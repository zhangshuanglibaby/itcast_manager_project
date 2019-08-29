import axios from '@/utils/myaxios.js'

// 获取商品管理的所有商品列表数据
export const getAllGoods = (params) => {
  return axios({
    url: 'goods',
    params
  })
}
