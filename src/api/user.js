import qs from 'qs'
import request from '@/utils/request'
// api

// 登录
export function login(params) {
  return request({
    url: '/rmui-template/user/login',
    method: 'post',
    data: qs.stringify(params)
  })
}
// 用户信息
export function getUserInfo(params) {
  return request({
    url: '/rmui-template/user/info',
    method: 'get',
    params: params
  })
}
