import Mock from 'mockjs'

const meetingForm = Mock.mock({
  govReq: '@cname',
  govHost: '@cname',
  place: '@city',
  time: '@date',
  days: '@natural(1, 5)',
  theme: '@csentence(8,16)',
  num: '@natural(1, 20)',
  arrive: '@date',
  level: '小型会议',
  secrecy: true,
  decorate: ['签到台'],
  equip: ['投影仪', '插线板', '激光笔']
})

export default [
  // 邮件表单获取数据
  {
    url: '/rmui-template/meeting-form/getform',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: meetingForm
      }
    }
  }
]
