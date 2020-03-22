import qs from 'qs'
import request from '@/utils/request'
// api

// 测试
export function getMsgList(params) {
  return request({
    url: '/rmui-template/list/msgList',
    method: 'get',
    data: qs.stringify(params)
  })
}

// 测试
export function getNewsList(params) {
  return request({
    url: '/rmui-template/list/newsList',
    method: 'get',
    data: qs.stringify(params)
  })
}
