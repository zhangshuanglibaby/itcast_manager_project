import moment from 'moment'

export const timeFormat = (time) => {
  return moment(time * 1000).format('YYYY-MM-DD HH:mm:ss')
}

export const payFormat = (pay) => {
  if (pay === '0') {
    return '未付'
  } else {
    return '已付'
  }
}
