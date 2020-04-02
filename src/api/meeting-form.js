import qs from 'qs'
import request from '@/utils/request'
// api

// 会议表单获取数据
export function getData(params) {
  return request({
    url: '/rmui-template/meeting-form/getData',
    method: 'get',
    params: params
  })
}

// 会议表单提交数据
export function submitData(params) {
  return request({
    url: '/rmui-template/meeting-form/submitData',
    method: 'post',
    data: qs.stringify(params)
  })
}
