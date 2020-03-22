import Mock from 'mockjs'

const msgList = Mock.mock({
  'items|30': [
    {
      id: '@id',
      title: '@sentence(10, 20)',
      'status|1': ['published', 'draft', 'deleted'],
      author: 'name',
      display_time: '@datetime',
      pageviews: '@integer(300, 5000)'
    }
  ]
})

const newsList = Mock.mock({
  'items|30': [
    {
      id: '@id',
      title: '@sentence(10, 20)'
    }
  ]
})

export default [
  {
    url: '/rmui-template/list/msgList',
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
  },
  {
    url: '/rmui-template/list/newsList',
    type: 'get',
    response: config => {
      const items = newsList.items
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
