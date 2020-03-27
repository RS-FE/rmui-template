// import qs from 'qs'
import request from '@/utils/request'
// api

// 会议室获取数据
export function getMeetiongList(params) {
  return request({
    url: '/rmui-template/meeting-list/meetiongList',
    method: 'get',
    params: params
  })
}
