// 封装axios的基准路径
import axios from 'axios'

// 设置基准路径
// axios.defaults.baseURL = 'http://192.168.70.42:8888/api/private/v1/'
axios.defaults.baseURL = 'http://192.168.70.79:8888/api/private/v1/'

// 添加请求拦截器,设置请求报文
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 获取token
  let mytoken = localStorage.getItem('itcast_manger')
  if (mytoken) {
    config.headers.Authorization = mytoken
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 暴露
export default axios
