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

// 删除商品
export const delGood = (id) => {
  return axios({
    url: `goods/${id}`,
    method: 'delete'
  })
}

// 根据id查询商品 --- 编辑商品的默认数据展示
export const getGoodInfoById = (id) => {
  return axios({
    url: `goods/${id}`
  })
}

// 编辑提交商品
export const editGood = (id, data) => {
  return axios({
    url: `goods/${id}`,
    method: 'put',
    data
  })
}
