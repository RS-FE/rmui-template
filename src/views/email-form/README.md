# EmailForm 邮件表单

### 接口函数

```js
// 邮件表单获取数据
export function getData(params) {
  return request({
    url: '/rmui-template/email-form/getData',
    method: 'get',
    params: params
  })
}

// 邮件表单提交数据
export function submitData(params) {
  return request({
    url: '/rmui-template/email-form/submitData',
    method: 'post',
    data: qs.stringify(params)
  })
}
```

## 获取表单数据

### 请求地址 url

    /rmui-template/email-form/getData

### 请求类型 method

`GET`

### 请求参数 request

| 名称 | 类型 | 必填 | 默认值 | 描述 |
| ---- | ---- | ---- | ------ | ---- |
| -    | -    | -    | -      | -    |

### 响应参数 response

| 名称      | 类型     | 必填   | 默认值 | 可选值 | 描述     |
| --------- | -------- | ------ | ------ | ------ | -------- |
| receiver  | _string_ | `true` | -      | -      | 收件人   |
| sender    | _string_ | `true` | -      | -      | 发件人   |
| title     | _string_ | `true` | -      | -      | 邮件标题 |
| text      | _string_ | `true` | -      | -      | 发送内容 |
| enclosure | _Array_  | `true` | -      | -      | 附件内容 |

### enclosure 数据结构

| 名称 | 类型     | 必填   | 默认值 | 可选值 | 描述     |
| ---- | -------- | ------ | ------ | ------ | -------- |
| url  | _string_ | `true` | -      | -      | 附件链接 |

## 提交表单数据

### 请求地址 url

    /rmui-template/email-form/submitData

### 请求类型 method

`POST`

### 请求参数 request

| 名称      | 类型     | 必填   | 默认值 | 可选值 | 描述     |
| --------- | -------- | ------ | ------ | ------ | -------- |
| receiver  | _string_ | `true` | -      | -      | 收件人   |
| sender    | _string_ | `true` | -      | -      | 发件人   |
| title     | _string_ | `true` | -      | -      | 邮件标题 |
| text      | _string_ | `true` | -      | -      | 发送内容 |
| enclosure | _Array_  | `true` | -      | -      | 附件内容 |

### enclosure 数据结构

| 名称 | 类型     | 必填   | 默认值 | 可选值 | 描述     |
| ---- | -------- | ------ | ------ | ------ | -------- |
| url  | _string_ | `true` | -      | -      | 附件链接 |

### 响应参数 response

| 名称 | 类型 | 必填 | 默认值 | 描述 |
| ---- | ---- | ---- | ------ | ---- |
| -    | -    | -    | -      | -    |
