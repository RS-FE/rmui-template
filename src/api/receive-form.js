import qs from 'qs'
import request from '@/utils/request'
// api

// 收发文传阅获取数据
export function getFormData(params) {
  return request({
    url: '/rmui-template/receive-form/getFormData',
    method: 'get',
    params: params
  })
}

// 收发文传阅提交数据
export function submitFormData(params) {
  return request({
    url: '/rmui-template/receive-form/submitFormData',
    method: 'post',
    data: qs.stringify(params)
  })
}
