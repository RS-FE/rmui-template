import Mock from 'mockjs'

const meetingList = Mock.mock({
  items: [
    {
      fileFlag: '回字形',
      fileSubleft: '50',
      fileTitle: 'F楼2110会议室',
      amList: null,
      nightList: null,
      pmList: [
        {
          fileSubright: '吴春鸿',
          fileTitle: '综合监督单位季度工作例会',
          fileType: '下午场'
        }
      ]
    },
    {
      amList: null,
      fileFlag: '圆形',
      fileSubleft: '22',
      fileSubright: 'F座2210室',
      fileTitle: 'F楼2210会议室（书记会议室）',
      nightList: null,
      pmList: null
    },
    {
      amList: null,
      fileContent: '音响 投影仪 钉钉无线投屏',
      fileFlag: '回字形',
      fileSubleft: '40',
      fileSubright: 'F座2306室',
      fileTitle: 'F楼2306会议室（常委会议室）',
      nightList: null,
      pmList: null
    },
    {
      amList: null,
      fileFlag: '课桌式',
      fileSubleft: '40',
      fileSubright: 'F座2313室',
      fileTitle: 'F楼2313会议室',
      nightList: null,
      pmList: null
    },
    {
      amList: null,
      fileContent: '音响 投影仪',
      fileFlag: '回字形',
      fileSubleft: '100',
      fileSubright: 'EF座23楼连廊',
      fileTitle: 'R6会议室（常委会议室）',
      nightList: null,
      pmList: null
    },
    {
      amList: null,
      fileContent: '投影仪 音响',
      fileFlag: '回字形',
      fileSubleft: '20',
      fileSubright: 'F座2401室',
      fileTitle: 'F楼2401会议室',
      nightList: null,
      pmList: null
    },
    {
      amList: null,
      fileFlag: '回字形',
      fileSubleft: '18',
      fileSubright: 'F座2413室',
      fileTitle: 'F楼2413会议室',
      nightList: null,
      pmList: null
    },
    {
      amList: null,
      fileContent: '投影仪',
      fileFlag: '回字形 课桌式',
      fileSubleft: '18',
      fileSubright: 'F座2502室',
      fileTitle: 'F楼2502会议室',
      nightList: null,
      pmList: null
    },
    {
      amList: null,
      fileFlag: '回字形',
      fileSubleft: '18',
      fileSubright: 'F座2615室',
      fileTitle: 'F楼2615会议室',
      nightList: null,
      pmList: null
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
      return {code: 20000, data: {total: items.length, items: items}}
    }
  }
]
