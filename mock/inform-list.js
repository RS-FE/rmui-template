import Mock from 'mockjs'

const informList=Mock.mock({
    item1: [{
        time1: 27,
        time2: "03月27",
        label1: "表格形式会议:",
        labelText1: "会议记录",
        label2: "会议地点:",
        labelText2: "会展中心A栋18楼",
        label3: "会议时间:",
        labelText3: "2020-03-27 16:10",
        flag: "未反馈",
        class: "rm-gray"
      },
      {
        time1: 28,
        time2: "03月28",
        label1: "文本形式会议:",
        labelText1: "会议备忘录",
        label2: "会议地点:",
        labelText2: "会展中心B栋18楼",
        label3: "会议时间:",
        labelText3: "2020-03-27 16:10",
        flag: "参加",
        class: "rm-blue"
      },
      {
        time1: 29,
        time2: "03月28",
        label1: "文本形式会议:",
        labelText1: "备忘录",
        label2: "会议地点:",
        labelText2: "会展中心B栋18楼",
        label3: "会议时间:",
        labelText3: "2020-03-27 16:10",
        flag: "参加",
        class: "rm-blue"
      },
      {
        time1: 29,
        time2: "03月28",
        label1: "文本形式会议:",
        labelText1: "备忘录",
        label2: "会议地点:",
        labelText2: "会展中心B栋18楼",
        label3: "会议时间:",
        labelText3: "2020-03-27 16:10",
        flag: "参加",
        class: "rm-blue"
      },
      {
        time1: 29,
        time2: "03月28",
        label1: "文本形式会议:",
        labelText1: "备忘录",
        label2: "会议地点:",
        labelText2: "会展中心B栋18楼",
        label3: "会议时间:",
        labelText3: "2020-03-27 16:10",
        flag: "参加",
        class: "rm-blue"
      }, {
        time1: 29,
        time2: "03月28",
        label1: "文本形式会议:",
        labelText1: "备忘录",
        label2: "会议地点:",
        labelText2: "会展中心B栋18楼",
        label3: "会议时间:",
        labelText3: "2020-03-27 16:10",
        flag: "参加",
        class: "rm-blue"
      }
    ],
    item2: [{
        time1: 27,
        time2: "03月27",
        label1: "表格形式会议:",
        labelText1: "会议记录",
        label2: "会议地点:",
        labelText2: "会展中心A栋18楼",
        label3: "会议时间:",
        labelText3: "2020-03-27 16:10",
        flag: "未反馈",
        class: "rm-gray"
      },
      {
        time1: 28,
        time2: "03月28",
        label1: "文本形式会议:",
        labelText1: "会议备忘录",
        label2: "会议地点:",
        labelText2: "会展中心B栋18楼",
        label3: "会议时间:",
        labelText3: "2020-03-27 16:10",
        flag: "参加",
        class: "rm-blue"
      },
      {
        time1: 29,
        time2: "03月28",
        label1: "文本形式会议:",
        labelText1: "备忘录",
        label2: "会议地点:",
        labelText2: "会展中心B栋18楼",
        label3: "会议时间:",
        labelText3: "2020-03-27 16:10",
        flag: "参加",
        class: "rm-blue"
      }
    ]
});

export default [
    // 通知列表获取数据
    {
      url: '/rmui-template/inform-list/informList',
      type: 'get',
      response: config => {
        const item1 = informList.item1
        const item2 = informList.item2
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