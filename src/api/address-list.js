// import qs from 'qs'
import request from '@/utils/request'
// api

// 通讯录获取数据
export function getAddressList(params) {
  return request({
    url: '/rmui-template/address-list/addressList',
    method: 'get',
    params: params
  })
}
