import qs from 'qs'
import request from '@/utils/request'
// api

// 手机号登录
export function login(params) {
  return request({
    url: '/rmui-template/user/login',
    method: 'post',
    data: qs.stringify(params)
  })
}
