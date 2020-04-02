import Mock from 'mockjs'

const msgList = Mock.mock({
  'items|4': [
    {
      time: '08-08 12:08',
      data: [
        {
          type: 1,
          title: '新邮件通知',
          name: '姓名',
          content: '已为你生成本月考勤邮件已为你生成本月考勤邮件',
          time: '2020年3月21日'
        },
        {
          type: 2,
          title: '考勤打卡',
          name: '姓名',
          time: '19:56',
          day: '02月12日',
          time2: '02-12 18:00',
          site: '湖北省湖北省湖北省湖北省湖北省'
        },
        {
          type: 3,
          title: '考勤打卡',
          name: '姓名',
          time: '19:56',
          day: '02月12日',
          month: 2,
          time2: '02-12 18:00',
          site: '湖北省湖北省湖北省湖北省湖北省',
          anomaly: 12
        }
      ]
    },
    {
      time: '08-19 12:08',
      data: [
        {
          type: 1,
          title: '新邮件通知',
          name: '姓名',
          content: '已为你生成本月考勤邮件已为你生成本月考勤邮件',
          time: '2020年3月21日'
        },
        {
          type: 3,
          title: '考勤打卡',
          name: '姓名',
          time: '19:56',
          day: '02月12日',
          month: 2,
          time2: '02-12 18:00',
          site: '湖北省湖北省湖北省湖北省湖北省',
          anomaly: 12
        }
      ]
    }
  ]
})

export default [
  // 消息列表获取数据
  {
    url: '/rmui-template/msg-list/msgList',
    type: 'get',
    response: config => {
      const items = msgList.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
