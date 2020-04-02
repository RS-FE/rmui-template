import Mock from 'mockjs'

const pressList=Mock.mock({
    items: [
         {
            title: "外交部：明日增加临时航班",
            time: "2020-04-01 15:31:14",
            source:"新华网",
            img:"http://cms-bucket.ws.126.net/2020/0401/ae3fed7fp00q83pdo00eec000s600e3c.png"
          },
          {
            title: "西班牙公主病逝 成首位因新冠病毒去世的王室成员",
            time: "2020-04-01 13:56:16",
            source:"上观新闻",
            img:"http://cms-bucket.ws.126.net/2020/0401/af02cf38p00q83pl800a2c000s600e3c.png"
          },
          {
            title: "外媒叹服:疫情震中意大利华人社区5万居民无一感染",
            time: "2020-2-23 10:30:28",
            source:"1.2万跟帖",
            img:"http://cms-bucket.ws.126.net/2020/0401/ddee09ddp00q83nru00jyc000s600e3c.png"
          },
          {
            title: "美病毒专家确诊：1月在武汉没感染 3月在纽约感染",
            time: "2020-03-31 21:14:2",
            source:"1.3万跟贴",
            img:"http://cms-bucket.ws.126.net/2020/0401/86239a9bj00q82zyq0078c000s600e3c.jpg"
          }
        ]
});

export default [
    // 新闻列表获取数据
    {
      url: '/rmui-template/press-list/pressList',
      type: 'get',
      response: config => {
        const items = pressList.items
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



