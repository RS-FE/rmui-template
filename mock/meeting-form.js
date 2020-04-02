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
  secrecy: true,
  level: '小型会议',
  decorate: ['签到台'],
  equip: ['投影仪', '插线板', '激光笔']
})

export default [
  // 会议表单获取数据
  {
    url: '/rmui-template/meeting-form/getData',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: meetingForm
      }
    }
  },
  // 会议表单提交数据
  {
    url: '/rmui-template/meeting-form/submitData',
    type: 'post',
    response: config => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
