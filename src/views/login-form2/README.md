# LoginForm2 登录注册2

### 接口函数

```js
// 用户登录
export function login(params) {
  return request({
    url: '/rmui-template/login-form/login',
    method: 'post',
    data: qs.stringify(params)
  })
}

// 用户注册
export function register(params) {
  return request({
    url: '/rmui-template/login-form/register',
    method: 'post',
    data: qs.stringify(params)
  })
}
```

## 用户登录

### 请求地址 url

    /rmui-template/login-form/login

### 请求类型 method

`POST`

### 请求参数 request

| 名称     | 类型     | 必填   | 默认值 | 可选值 | 描述   |
| -------- | -------- | ------ | ------ | ------ | ------ |
| userName | _string_ | `true` | -      | -      | 用户名 |
| pwd      | _string_ | `true` | -      | -      | 密码   |

### 响应参数 response

| 名称 | 类型 | 必填 | 默认值 | 描述 |
| ---- | ---- | ---- | ------ | ---- |
| -    | -    | -    | -      | -    |

## 用户注册

### 请求地址 url

    /rmui-template/login-form/register

### 请求类型 method

`POST`

### 请求参数 request

| 名称     | 类型     | 必填   | 默认值 | 可选值 | 描述   |
| -------- | -------- | ------ | ------ | ------ | ------ |
| phone    | _string_ | `true` | -      | -      | 手机号 |
| userName | _string_ | `true` | -      | -      | 用户名 |
| pwd      | _string_ | `true` | -      | -      | 密码   |

### 响应参数 response

| 名称 | 类型 | 必填 | 默认值 | 描述 |
| ---- | ---- | ---- | ------ | ---- |
| -    | -    | -    | -      | -    |
