// import qs from 'qs'
import request from '@/utils/request'
// api

// 邮件表单获取数据
export function getEmailForm(params) {
  return request({
    url: '/rmui-template/email-form/getform',
    method: 'get',
    params: params
  })
}
