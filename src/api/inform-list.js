// import qs from 'qs'
import request from '@/utils/request'
// api

// 新闻列表获取数据
export function getWaitList(params) {
  return request({
    url: '/rmui-template/inform-list/informList',
    method: 'get',
    params: params
  })
}
