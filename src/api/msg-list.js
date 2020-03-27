// import qs from 'qs'
import request from '@/utils/request'
// api

// 消息列表获取数据
export function getMsgList(params) {
  return request({
    url: '/rmui-template/msg-list/msgList',
    method: 'get',
    params: params
  })
}
