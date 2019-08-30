import axios from '@/api/upload.js'

export const uploadFiles = (data) => {
  return axios({
    url: 'upload',
    method: 'post',
    data
  })
}
