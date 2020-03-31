import Mock from 'mockjs'

const emailForm = Mock.mock({
  id: '@id',
  receiver: '@cname',
  sender: '@cname',
  title: '@csentence',
  text: '@cparagraph(1,3)',
  enclosure: [{url: 'https://img.yzcdn.cn/vant/leaf.jpg'}]
})

export default [
  // 邮件表单获取数据
  {
    url: '/rmui-template/email-form/getform',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: emailForm
      }
    }
  }
]
