import qs from 'qs'
import request from '@/utils/request'
// api

// 邮件表单获取数据
export function getData(params) {
  return request({
    url: '/rmui-template/email-form/getData',
    method: 'get',
    params: params
  })
}

// 邮件表单提交数据
export function submitData(params) {
  return request({
    url: '/rmui-template/email-form/submitData',
    method: 'post',
    data: qs.stringify(params)
  })
}
