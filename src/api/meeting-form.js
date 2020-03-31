// import qs from 'qs'
import request from '@/utils/request'
// api

// 会议表单获取数据
export function getMeetingForm(params) {
  return request({
    url: '/rmui-template/meeting-form/getform',
    method: 'get',
    params: params
  })
}
