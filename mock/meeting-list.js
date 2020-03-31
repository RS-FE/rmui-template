import Mock from 'mockjs'

const meetingList = Mock.mock({
  'items|8': [
    {
      id: '@id',
      'status|1': ['1', '2'],
      'roomname|1': ['A座会议室', 'B座会议室', 'C座会议室', 'D座会议室', 'E座会议室'],
      'capacity|1': [30, 40, 50],
      'location|1': ['409', '410', '411'],
      tool: ['投影仪', '会议桌椅'],
      'ReserveData|2': [
        {
          day: {
            year: '2020',
            'month|1': [3, 4, 5],
            'day|1-30': 30
          },
          'time|1': ['0', '1'], // 0 上午 1 下午
          StartTime: '08:00',
          EndTime: '09:00',
          name: '张长军',
          'text|1': [
            '关于垃圾分类的会议1关于垃圾分类的会议',
            '关于垃圾分类的会议2',
            '关于垃圾分类的会议3',
            '关于垃圾分类的会议4'
          ]
        }
      ]
    }
  ]
})

export default [
  // 会议室预约
  {
    url: '/rmui-template/meeting-list/meetingList',
    type: 'get',
    response: config => {
      const items = meetingList.items
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
