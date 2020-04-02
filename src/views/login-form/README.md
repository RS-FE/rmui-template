# LoginForm2 登录注册2

### 接口函数

```js
// 手机号登录
export function login(params) {
  return request({
    url: '/rmui-template/user/login',
    method: 'post',
    data: qs.stringify(params)
  })
}
```

## 手机号登录

### 请求地址 url

    /rmui-template/user/login

### 请求类型 method

`POST`

### 请求参数 request

| 名称   | 类型     | 必填   | 默认值 | 可选值 | 描述     |
| ------ | -------- | ------ | ------ | ------ | -------- |
| phone  | _string_ | `true` | -      | -      | 手机号码 |
| vfCode | _string_ | `true` | -      | -      | 验证码   |

### 响应参数 response

| 名称 | 类型 | 必填 | 默认值 | 描述 |
| ---- | ---- | ---- | ------ | ---- |
| -    | -    | -    | -      | -    |
