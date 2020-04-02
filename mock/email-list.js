import Mock from 'mockjs'

const emailList = Mock.mock({
  'items|25': [
    {
      id: '@id',
      name: '@cname',
      time: '@datetime',
      text: '@cparagraph(1,3)',
      attach: '@boolean',
      hasread: '@boolean',
      hascollected: '@boolean'
    }
  ]
})

export default [
  // 邮件列表获取数据
  {
    url: '/rmui-template/email-list/emailList',
    type: 'get',
    response: config => {
      const items = emailList.items
      return {
        code: 20000,
        data: {
          total: items.length,
          emailData: items
        }
      }
    }
  }
]
