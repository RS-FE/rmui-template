import Mock from 'mockjs'

const addressList = Mock.mock({
  items: [
    {
      title: '一级节点1',
      expanded: true,
      children: [
        {
          title: '二级节点1',
          expanded: true,
          children: [
            {
              title: '三级节点1-1',
              children: [
                {
                  title: '四级节点1-1'
                },
                {
                  title: '四级节点1-2'
                }
              ]
            },
            {
              title: '三级节点1-2'
            },
            {
              title: '三级节点1-3'
            }
          ]
        },
        {
          title: '二级节点2',
          children: [
            {
              title: '三级节点2-1'
            },
            {
              title: '三级节点2-2'
            }
          ]
        }
      ]
    },
    {
      title: '一级节点2',
      children: false
    },
    {
      title: '一级节点3',
      children: [
        {
          title: '二级节点3-1'
        },
        {
          title: '二级节点3-2'
        }
      ]
    }
  ]
})

export default [
  // 通讯录获取数据
  {
    url: '/rmui-template/address-list/addressList',
    type: 'get',
    response: config => {
      const items = addressList.items
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
