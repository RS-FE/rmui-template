# InformList 通知列表

### 接口函数

```js
// 列表数据获取
export function getWaitList(params) {
  return request({
    url: '/rmui-template/inform-list/informList',
    method: 'get',
    params: params
  })
}
```

## 获取表单数据

### 请求地址 url

    /rmui-template/inform-list/informList

### 请求类型 method

`GET`

### 请求参数 request

| 名称 | 类型 | 必填 | 默认值 | 描述 |
| ---- | ---- | ---- | ------ | ---- |
| -    | -    | -    | -      | -    |

### 响应参数 response

| 名称       | 类型     | 必填   | 默认值 | 可选值 | 描述     |
| ---------- | -------- | ------ | ------ | ------ | -------- |
| time1      | _number_ | `true` | -      | -      | 时间     |
| time2      | _string_ | `true` | -      | -      | 时间     |
| label1     | _string_ | `true` | -      | -      | 会议形式 |
| labelText1 | _string_ | `true` | -      | -      | 会议方式 |
| label2     | _string_ | `true` | -      | -      | 会议地点 |
| labelText2 | _string_ | `true` | -      | -      | 位置     |
| label3     | _string_ | `true` | -      | -      | 会议时间 |
| labelText3 | _string_ | `true` | -      | -      | 日期     |
| flag       | _string_ | `true` | -      | -      | 是否参加 |
| class      | _string_ | `true` | -      | -      | 按钮类型 |
