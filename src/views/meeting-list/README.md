# NormalList 通用列表

## 获取会议室预约数据

### 请求地址 url

    /rmui-template/meetiong-list/getMeetiongList

### 请求类型 method

`GET`

### 请求参数 request

| 名称 | 类型 | 必填 | 默认值 | 描述 |
| ---- | ---- | ---- | ------ | ---- |
| -    | -    | -    | -      | -    |

### 响应参数 response

| 名称        | 类型     | 必填   | 默认值 | 可选值  | 描述             |
| ----------- | -------- | ------ | ------ | ------- | ---------------- |
| roomname    | _string_ | `true` | -      | -       | 会议室名称       |
| capacity    | _number_ | `true` | -      | -       | 会议室座位数     |
| location    | _string_ | `true` | -      | -       | 会议室地址       |
| tool        | _string_ | `true` | -      | -       | 会议室仪器       |
| ReserveData | _Array_  | `true` | -      | -       | 已预约数据       |
| time        | _number_ | `true` | -      | `0` `1` | 预约上午或者下午 |
| StartTime   | _number_ | `true` | -      | -       | 预约开始时间     |
| EndTime     | _number_ | `true` | -      | -       | 预约结束时间     |
| name        | _number_ | `true` | -      | -       | 预约人           |
| text        | _number_ | `true` | -      | -       | 会议内容         |
