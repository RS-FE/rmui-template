# EmailList 邮件列表

### 接口函数

```js
// 邮件列表获取数据
export function getData(params) {
  return request({
    url: '/rmui-template/email-list/emailList',
    method: 'get',
    params: params
  })
}
```

## 获取列表数据

### 请求地址 url

    /rmui-template/email-list/emailList

### 请求类型 method

`GET`

### 请求参数 request

| 名称 | 类型 | 必填 | 默认值 | 描述 |
| ---- | ---- | ---- | ------ | ---- |
| -    | -    | -    | -      | -    |

### 响应参数 response

| 参数      | 类型    | 描述         |
| --------- | ------- | ------------ |
| emailData | `Array` | 邮件列表数据 |

### emailData 数据结构

| 名称         | 类型      | 必填   | 默认值 | 可选值 | 描述     |
| ------------ | --------- | ------ | ------ | ------ | -------- |
| id           | _string_  | `true` | -      | -      | 唯一标识 |
| name         | _string_  | `true` | -      | -      | 发送人名 |
| time         | _string_  | `true` | -      | -      | 发送时间 |
| text         | _string_  | `true` | -      | -      | 发送内容 |
| attach       | _boolean_ | `true` | -      | -      | 有无附件 |
| hasread      | _boolean_ | `true` | -      | -      | 是否已读 |
| hascollected | _boolean_ | `true` | -      | -      | 是否收藏 |
