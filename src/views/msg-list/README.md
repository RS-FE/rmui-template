# NormalList 通用列表

## 获取会议室预约数据

### 请求地址 url

    /rmui-template/msg-list/getMsgList

### 请求类型 method

`GET`

### 请求参数 request

| 名称 | 类型 | 必填 | 默认值 | 描述 |
| ---- | ---- | ---- | ------ | ---- |
| -    | -    | -    | -      | -    |

### 响应参数 response

| 名称    | 类型     | 必填   | 默认值 | 可选值 | 描述             |
| ------- | -------- | ------ | ------ | ------ | ---------------- |
| time    | _string_ | `true` | -      | -      | 时间             |
| data    | _Array_  | `true` | -      | -      | 当前日期消息数据 |
| title   | _string_ | `true` | -      | -      | 消息标题         |
| name    | _string_ | `true` | -      | -      | 姓名             |
| time    | _string_ | `true` | -      | -      | 打卡时间         |
| day     | _Object_ | `true` | -      | -      | 打卡日期         |
| month   | _number_ | `true` | -      | -      | 日               |
| time2   | _string_ | `true` | -      | -      | 消息时间         |
| time3   | _string_ | `true` | -      | -      | 上班时间         |
| site    | _string_ | `true` | -      | -      | 上班地点         |
| anomaly | _number_ | `true` | -      | -      | 异常提示数量     |
