# ReceiveForm 收发文传阅

### 接口函数

```js
// 收发文传阅获取数据
export function getFormData(params) {
  return request({
    url: '/rmui-template/receive-form/getFormData',
    method: 'get',
    params: params
  })
}

// 收发文传阅提交数据
export function submitFormData(params) {
  return request({
    url: '/rmui-template/receive-form/submitFormData',
    method: 'post',
    data: qs.stringify(params)
  })
}
```

## 获取表单数据

### 请求地址 url

    /rmui-template/receive-form/getFormData

### 请求类型 method

`GET`

### 请求参数 request

| 名称 | 类型 | 必填 | 默认值 | 描述 |
| ---- | ---- | ---- | ------ | ---- |
| -    | -    | -    | -      | -    |

### 响应参数 response

| 名称                | 类型     | 必填    | 默认值    | 可选值                     | 描述                 |
| ------------------- | -------- | ------- | --------- | -------------------------- | -------------------- |
| receiveType         | _string_ | `true`  | -         | `公文` `其他`              | 收文类别             |
| receiveCode         | _string_ | `true`  | -         | -                          | 收文编号             |
| receiveDate         | _string_ | `true`  | -         | -                          | 收文日期             |
| dealType            | _string_ | `true`  | -         | `阅件` `批件`              | 处理类别             |
| hurryType           | _string_ | `true`  | -         | `紧急` `重要` `一般`       | 缓急程度             |
| secret              | _string_ | `true`  | -         | `最高机密` `机密` `一般`   | 秘密等级             |
| from                | _string_ | `true`  | -         | `环保局` `交通局` `卫生局` | 来文单位             |
| fileDate            | _string_ | `true`  | -         | -                          | 文件日期             |
| signPerson          | _string_ | `true`  | -         | -                          | 签发人               |
| articleCode         | _string_ | `true`  | -         | -                          | 来文字号             |
| articleTitle        | _string_ | `true`  | -         | -                          | 文件标题             |
| articleOther        | _string_ | `false` | -         | -                          | 备注                 |
| fileList            | _array_  | `false` | -         | -                          | 文件上传             |
| fileList[i].file    | _string_ | `false` | -         | -                          | 文件上传附件名称     |
| fileList[i].status  | _string_ | `false` | `success` | -                          | 文件上传附件上传状态 |
| fileList[i].content | _string_ | `false` | -         | -                          | 文件上传附件具体内容 |

## 提交表单数据

### 请求地址 url

    /rmui-template/receive-form/submitFormData

### 请求类型 method

`POST`

### 请求参数 request

| 名称                | 类型     | 必填    | 默认值 | 可选值                     | 描述                 |
| ------------------- | -------- | ------- | ------ | -------------------------- | -------------------- |
| receiveType         | _string_ | `true`  | -      | `公文` `其他`              | 收文类别             |
| receiveCode         | _string_ | `true`  | -      | -                          | 收文编号             |
| receiveDate         | _string_ | `true`  | -      | -                          | 收文日期             |
| dealType            | _string_ | `true`  | -      | `阅件` `批件`              | 处理类别             |
| hurryType           | _string_ | `true`  | -      | `紧急` `重要` `一般`       | 缓急程度             |
| secret              | _string_ | `true`  | -      | `最高机密` `机密` `一般`   | 秘密等级             |
| from                | _string_ | `true`  | -      | `环保局` `交通局` `卫生局` | 来文单位             |
| fileDate            | _string_ | `true`  | -      | -                          | 文件日期             |
| signPerson          | _string_ | `true`  | -      | -                          | 签发人               |
| articleCode         | _string_ | `true`  | -      | -                          | 来文字号             |
| articleTitle        | _string_ | `true`  | -      | -                          | 文件标题             |
| articleOther        | _string_ | `false` | -      | -                          | 备注                 |
| fileList            | _array_  | `false` | -      | -                          | 文件上传             |
| fileList[i].file    | _string_ | `false` | -      | -                          | 文件上传附件名称     |
| fileList[i].status  | _string_ | `false` | -      | -                          | 文件上传附件上传状态 |
| fileList[i].content | _string_ | `false` | -      | -                          | 文件上传附件具体内容 |

### 响应参数 response

| 名称 | 类型 | 必填 | 默认值 | 描述 |
| ---- | ---- | ---- | ------ | ---- |
| -    | -    | -    | -      | -    |
