const state = {
  homeNav: [
    {
      title: '列表',
      items: [
        {
          path: 'msg-list',
          title: '消息列表'
        },
        {
          path: 'news-list',
          title: '新闻列表'
        }
      ]
    },
    {
      title: '表单',
      items: [
        {
          path: 'login-form',
          title: '登录注册'
        }
      ]
    }
  ]
}
export default {
  namespaced: true,
  state
}
