# PressList 新闻列表

### 接口函数

```js
// 列表数据获取
export function getPressList(params) {
  return request({
    url: '/rmui-template/press-list/pressList',
    method: 'get',
    params: params
  })
}
```

## 获取表单数据

### 请求地址 url

    /rmui-template/press-list/pressList

### 请求类型 method

`GET`

### 请求参数 request

| 名称 | 类型 | 必填 | 默认值 | 描述 |
| ---- | ---- | ---- | ------ | ---- |
| -    | -    | -    | -      | -    |

### 响应参数 response

| 名称   | 类型     | 必填   | 默认值 | 可选值 | 描述     |
| ------ | -------- | ------ | ------ | ------ | -------- |
| title  | _string_ | `true` | -      | -      | 标题     |
| time   | _string_ | `true` | -      | -      | 日期     |
| source | _string_ | `true` | -      | -      | 内容来源 |
| img    | _string_ | `true` | -      | -      | 图片     |
