import Mock from 'mockjs'
const waitList=Mock.mock({
    item1:[
        {
          approve:"出国审批",
          text:"出国教师在指定时间到指定地点带上所需材料，前往领事馆留取生物指纹信息。",
          site:"院校",
          date:"2020-03-17"
        },
          {
          approve:"会议审批",
          text:"根据会议管理有关规定,结合我局实际,制定本制度。",
          site:"管理",
          date:"2020-03-18"
        },
          {
          approve:"会议审批",
          text:"会议召开要由相关科室提出意见。",
          site:"科室",
          date:"2020-03-18"
        },
        {
            approve:"会议审批",
            text:"会议召开要由相关科室提出意见。",
            site:"科室",
            date:"2020-03-18"
          }
    ],
    item2:[
        {
            approve: "已审批",
            text: "出国教师在指定时间到指定地点带上所需材料，前往领事馆留取生物指纹信息。",
            site: "院校",
            date: "2020-03-17"
          },
          {
            approve: "已审批",
            text: "根据会议管理有关规定,结合我局实际,制定本制度。",
            site: "管理",
            date: "2020-03-18"
          },
          {
            approve: "已审批",
            text: "会议召开要由相关科室提出意见。",
            site: "科室",
            date: "2020-03-18"
          }
    ]
});


export default [
    // 待办列表获取数据
    {
      url: '/rmui-template/wait-list/waitList',
      type: 'get',
      response: config => {
        const item1 = waitList.item1
        const item2 = waitList.item2
        return {
          code: 20000,
          data: {
            total1: item1.length,
            item1: item1,
            total2: item2.length,
            item2: item2
          }
        }
      }
    }
  ]