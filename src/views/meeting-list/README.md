# MeetingList 会议室预约列表

### 接口函数

```js
// 会议室获取数据
export function getMeetingList(params) {
  return request({
    url: '/rmui-template/meeting-list/meetingList',
    method: 'get',
    params: params
  })
}
```

## 获取会议室预约数据

### 请求地址 url

    /rmui-template/meeting-list/meetingList

### 请求类型 method

`GET`

### 请求参数 request

| 名称 | 类型 | 必填 | 默认值 | 描述 |
| ---- | ---- | ---- | ------ | ---- |
| -    | -    | -    | -      | -    |

### 响应参数 response

| 名称        | 类型     | 必填   | 默认值 | 可选值 | 描述             |
| ----------- | -------- | ------ | ------ | ------ | ---------------- |
| fileTitle   | _string_ | `true` | -      | -      | 名称             |
| fileSubleft | _number_ | `true` | -      | -      | 座位数           |
| fileFlag    | _string_ | `true` | -      | -      | 会议室形状       |
| amList      | _Array_  | `true` | -      | -      | 上午场已预约数据 |
| pmList      | _Array_  | `true` | -      | -      | 下午场已预约数据 |
| nightList   | _Array_  | `true` | -      | -      | 晚上场已预约数据 |
