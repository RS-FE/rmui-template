import qs from 'qs'
import request from '@/utils/request'
// api

// 通用表单获取数据
export function getFormData(params) {
  return request({
    url: '/rmui-template/normal-form/getFormData',
    method: 'get',
    params: params
  })
}

// 通用表单提交数据
export function submitFormData(params) {
  return request({
    url: '/rmui-template/normal-form/submitFormData',
    method: 'post',
    data: qs.stringify(params)
  })
}
