# AddressList 通讯录列表

### 接口函数

```js
// 通讯录获取数据
export function getAddressList(params) {
  return request({
    url: '/rmui-template/address-list/addressList',
    method: 'get',
    params: params
  })
}
```

## 获取通讯录数据

### 请求地址 url

    /rmui-template/address-list/getAddressList

### 请求类型 method

`GET`

### 请求参数 request

| 名称 | 类型 | 必填 | 默认值 | 描述 |
| ---- | ---- | ---- | ------ | ---- |
| -    | -    | -    | -      | -    |

### 响应参数 response

| 名称       | 类型      | 必填   | 默认值 | 可选值 | 描述         |
| ---------- | --------- | ------ | ------ | ------ | ------------ |
| uuid       | _string_  | `true` | -      | -      | id           |
| parentUuid | _string_  | `true` | -      | -      | 上级节点 id  |
| title      | _string_  | `true` | -      | -      | 名称         |
| expanded   | _Boolean_ | `true` | false  | -      | 是否展开     |
| children   | _Array_   | `true` | -      | -      | 下级节点数据 |
