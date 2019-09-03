import axios from '@/utils/myaxios.js'

export const getAllOrdersList = (params) => {
  return axios({
    url: 'orders',
    params
  })
}
