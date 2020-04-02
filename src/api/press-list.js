// import qs from 'qs'
import request from '@/utils/request'
// api

// 新闻列表获取数据
export function getPressList(params) {
  return request({
    url: '/rmui-template/press-list/pressList',
    method: 'get',
    params: params
  })
}
