export default [
  // 用户登录
  {
    url: '/rmui-template/login-form/login',
    type: 'post',
    response: config => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  // 用户注册
  {
    url: '/rmui-template/login-form/register',
    type: 'post',
    response: config => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
