import qs from 'qs'
import request from '@/utils/request'
// api

// 用户登录
export function login(params) {
  return request({
    url: '/rmui-template/login-form/login',
    method: 'post',
    data: qs.stringify(params)
  })
}

// 用户注册
export function register(params) {
  return request({
    url: '/rmui-template/login-form/register',
    method: 'post',
    data: qs.stringify(params)
  })
}
