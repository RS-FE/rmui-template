# NormalForm 通用表单

### 接口函数

```js
// 通用表单获取数据
export function getFormData(params) {
  return request({
    url: '/rmui-template/normal-form/getFormData',
    method: 'get',
    params: params
  })
}

// 通用表单提交数据
export function submitFormData(params) {
  return request({
    url: '/rmui-template/normal-form/submitFormData',
    method: 'post',
    data: qs.stringify(params)
  })
}
```

## 获取表单数据

### 请求地址 url

    /rmui-template/normal-form/getFormData

### 请求类型 method

`GET`

### 请求参数 request

| 名称 | 类型 | 必填 | 默认值 | 描述 |
| ---- | ---- | ---- | ------ | ---- |
| -    | -    | -    | -      | -    |

### 响应参数 response

| 名称        | 类型     | 必填    | 默认值 | 可选值                         | 描述                              |
| ----------- | -------- | ------- | ------ | ------------------------------ | --------------------------------- |
| username    | _string_ | `true`  | -      | -                              | 姓名                              |
| licenseType | _string_ | `true`  | -      | `护照` `身份证`                | 证照类型                          |
| licenseCode | _string_ | `true`  | -      | -                              | 证照号码                          |
| phone       | _number_ | `true`  | -      | -                              | 手机号码                          |
| isSick      | _string_ | `true`  | -      | `是` `否`                      | 当前有无发热咳嗽                  |
| isDanger    | _string_ | `true`  | -      | `是` `否`                      | 14 日内是否在湖北、温州、台州温岭 |
| date        | _string_ | `true`  | -      | -                              | 拟到达时间                        |
| area        | _string_ | `true`  | -      | -                              | 出发地                            |
| trafficType | _string_ | `true`  | -      | `airplane` `train` `bus` `car` | 交通方式                          |
| airplane    | _string_ | `false` | -      | -                              | 航班号                            |
| train       | _string_ | `false` | -      | -                              | 火车车次                          |
| bus         | _string_ | `false` | -      | -                              | 汽车车牌号码                      |
| car         | _string_ | `false` | -      | -                              | 自驾车牌号码                      |

## 提交表单数据

### 请求地址 url

    /rmui-template/normal-form/submitFormData

### 请求类型 method

`POST`

### 请求参数 request

| 名称        | 类型     | 必填    | 默认值 | 可选值                         | 描述                              |
| ----------- | -------- | ------- | ------ | ------------------------------ | --------------------------------- |
| username    | _string_ | `true`  | -      | -                              | 姓名                              |
| licenseType | _string_ | `true`  | -      | `护照` `身份证`                | 证照类型                          |
| licenseCode | _string_ | `true`  | -      | -                              | 证照号码                          |
| phone       | _number_ | `true`  | -      | -                              | 手机号码                          |
| isSick      | _string_ | `true`  | -      | `是` `否`                      | 当前有无发热咳嗽                  |
| isDanger    | _string_ | `true`  | -      | `是` `否`                      | 14 日内是否在湖北、温州、台州温岭 |
| date        | _string_ | `true`  | -      | -                              | 拟到达时间                        |
| area        | _string_ | `true`  | -      | -                              | 出发地                            |
| trafficType | _string_ | `true`  | -      | `airplane` `train` `bus` `car` | 交通方式                          |
| airplane    | _string_ | `false` | -      | -                              | 航班号                            |
| train       | _string_ | `false` | -      | -                              | 火车车次                          |
| bus         | _string_ | `false` | -      | -                              | 汽车车牌号码                      |
| car         | _string_ | `false` | -      | -                              | 自驾车牌号码                      |

### 响应参数 response

| 名称 | 类型 | 必填 | 默认值 | 描述 |
| ---- | ---- | ---- | ------ | ---- |
| -    | -    | -    | -      | -    |
