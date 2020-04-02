# WaitList 待办列表

### 接口函数

```js
// 列表数据获取
export function getWaitList(params) {
  return request({
    url: '/rmui-template/wait-list/waitList',
    method: 'get',
    params: params
  })
}
```

## 获取表单数据

### 请求地址 url

    /rmui-template/wait-list/waitList

### 请求类型 method

`GET`

### 请求参数 request

| 名称 | 类型 | 必填 | 默认值 | 描述 |
| ---- | ---- | ---- | ------ | ---- |
| -    | -    | -    | -      | -    |

### 响应参数 response

| 名称    | 类型     | 必填   | 默认值 | 可选值 | 描述     |
| ------- | -------- | ------ | ------ | ------ | -------- |
| approve | _string_ | `true` | -      | -      | 审批标题 |
| text    | _string_ | `true` | -      | -      | 内容     |
| site    | _string_ | `true` | -      | -      | 来源     |
| date    | _string_ | `true` | -      | -      | 日期     |
