// import qs from 'qs'
import request from '@/utils/request'
// api

// 邮件列表获取数据
export function getData(params) {
  return request({
    url: '/rmui-template/email-list/emailList',
    method: 'get',
    params: params
  })
}
