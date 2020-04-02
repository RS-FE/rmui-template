# MeetingForm 会议表单

### 接口函数

```js
// 会议表单获取数据
export function getData(params) {
  return request({
    url: '/rmui-template/meeting-form/getData',
    method: 'get',
    params: params
  })
}

// 会议表单提交数据
export function submitData(params) {
  return request({
    url: '/rmui-template/meeting-form/submitData',
    method: 'post',
    data: qs.stringify(params)
  })
}
```

## 获取表单数据

### 请求地址 url

    /rmui-template/meeting-form/getData

### 请求类型 method

`GET`

### 请求参数 request

| 名称 | 类型 | 必填 | 默认值 | 描述 |
| ---- | ---- | ---- | ------ | ---- |
| -    | -    | -    | -      | -    |

### 响应参数 response

| 名称     | 类型      | 必填   | 默认值 | 可选值                                                | 描述     |
| -------- | --------- | ------ | ------ | ----------------------------------------------------- | -------- |
| govReq   | _string_  | `true` | -      | -                                                     | 申请部门 |
| govHost  | _string_  | `true` | -      | -                                                     | 主办部门 |
| place    | _string_  | `true` | -      | -                                                     | 会议地点 |
| time     | _string_  | `true` | -      | -                                                     | 会议时间 |
| days     | _string_  | `true` | -      | -                                                     | 天数     |
| theme    | _string_  | `true` | -      | -                                                     | 会议主题 |
| num      | _string_  | `true` | -      | -                                                     | 参会人数 |
| arrive   | _string_  | `true` | -      | -                                                     | 到达时间 |
| secrecy  | _boolean_ | `true` | -      | -                                                     | 保密     |
| level    | _string_  | `true` | -      | `大型会议` `中型会议` `小型会议`                      | 会议级别 |
| decorate | _Array_   | `true` | -      | `签到台` `课桌型` `回型`                              | 会场布置 |
| equip    | _Array_   | `true` | -      | `投影仪` `相机` `传真机` `插线板` `激光笔` `音响设备` | 会议设备 |

## 提交表单数据

### 请求地址 url

    /rmui-template/meeting-form/submitData

### 请求类型 method

`POST`

### 请求参数 request

| 名称     | 类型      | 必填   | 默认值 | 可选值                                                | 描述     |
| -------- | --------- | ------ | ------ | ----------------------------------------------------- | -------- |
| govReq   | _string_  | `true` | -      | -                                                     | 申请部门 |
| govHost  | _string_  | `true` | -      | -                                                     | 主办部门 |
| place    | _string_  | `true` | -      | -                                                     | 会议地点 |
| time     | _string_  | `true` | -      | -                                                     | 会议时间 |
| days     | _string_  | `true` | -      | -                                                     | 天数     |
| theme    | _string_  | `true` | -      | -                                                     | 会议主题 |
| num      | _string_  | `true` | -      | -                                                     | 参会人数 |
| arrive   | _string_  | `true` | -      | -                                                     | 到达时间 |
| secrecy  | _boolean_ | `true` | -      | -                                                     | 保密     |
| level    | _string_  | `true` | -      | `大型会议` `中型会议` `小型会议`                      | 会议级别 |
| decorate | _Array_   | `true` | -      | `签到台` `课桌型` `回型`                              | 会场布置 |
| equip    | _Array_   | `true` | -      | `投影仪` `相机` `传真机` `插线板` `激光笔` `音响设备` | 会议设备 |

### 响应参数 response

| 名称 | 类型 | 必填 | 默认值 | 描述 |
| ---- | ---- | ---- | ------ | ---- |
| -    | -    | -    | -      | -    |
