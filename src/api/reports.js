import axios from '@/utils/myaxios.js'

export const getReports = (type) => {
  return axios({
    url: `reports/type/${type}`
  })
}
