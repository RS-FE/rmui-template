const state = {
  homeNav: [
    {
      title: '列表',
      items: [
        {
          path: 'meeting-list',
          title: '会议室预约列表'
        },
        {
          path: 'meeting-list2',
          title: '会议室预约列表2'
        },
        {
          path: 'msg-list',
          title: '消息列表'
        },
        {
          path: 'address-list',
          title: '通讯录'
        },
        {
          path: 'inform-list',
          title: '通知列表'
        },
        {
          path: 'wait-list',
          title: '待办列表'
        },
        {
          path: 'press-list',
          title: '新闻列表'
        },
        {
          path: 'falls-list',
          title: '瀑布列表'
        },
        {
          path: 'email-list',
          title: '邮件列表'
        }
      ]
    },
    {
      title: '表单',
      items: [
        {
          path: 'login-form',
          title: '登录注册'
        },
        {
          path: 'normal-form',
          title: '通用表单'
        },
        {
          path: 'receive-form',
          title: '收发文传阅'
        },
        {
          path: 'email-form',
          title: '邮件表单'
        },
        {
          path: 'meeting-form',
          title: '会议表单'
        }
      ]
    }
  ]
}
export default {
  namespaced: true,
  state
}
