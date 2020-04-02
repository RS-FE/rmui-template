import Mock from 'mockjs'

const addressList = Mock.mock({
  items: [
    {
      title: '综合办',
      expanded: true,
      children: [
        {
          title: '人事',
          expanded: true,
          children: [
            {
              title: '人事1'
            },
            {
              title: '人事2'
            },
            {
              title: '人事3'
            },
            {
              title: '人事4'
            }
          ]
        },
        {
          title: '内勤',
          children: [
            {
              title: '内勤1'
            },
            {
              title: '内勤2'
            }
          ]
        },
        {
          title: '公关',
          children: [
            {
              title: '公关1'
            },
            {
              title: '公关2'
            },
            {
              title: '公关3'
            }
          ]
        }
      ]
    },
    {
      title: '采购部',
      children: [
        {
          title: '基药',
          children: [
            {
              title: '基药1'
            },
            {
              title: '基药2'
            },
            {
              title: '基药3'
            }
          ]
        },
        {
          title: '新药',
          children: [
            {
              title: '新药1'
            },
            {
              title: '新药2'
            }
          ]
        },
        {
          title: '调拨',
          children: [
            {
              title: '调拨1'
            },
            {
              title: '调拨2'
            }
          ]
        }
      ]
    },
    {
      title: '财务部',
      children: [
        {
          title: '出纳',
          children: [
            {
              title: '出纳1'
            },
            {
              title: '出纳2'
            },
            {
              title: '出纳3'
            },
            {
              title: '出纳4'
            }
          ]
        },
        {
          title: '会计',
          children: [
            {
              title: '会计1'
            },
            {
              title: '会计2'
            }
          ]
        }
      ]
    },
    {
      title: '仓储部',
      children: [
        {
          title: '物流',
          children: [
            {
              title: '物流1'
            },
            {
              title: '物流2'
            }
          ]
        },
        {
          title: '司机',
          children: [
            {
              title: '司机1'
            },
            {
              title: '司机2'
            }
          ]
        }
      ]
    },
    {
      title: '营销中心',
      children: [
        {
          title: '销售部',
          children: [
            {
              title: '组1',
              children: [
                {
                  title: '销售部组1-1'
                },
                {
                  title: '销售部组1-2'
                }
              ]
            },
            {
              title: '组2',
              children: [
                {
                  title: '销售部组2-1'
                },
                {
                  title: '销售部组2-2'
                }
              ]
            }
          ]
        },
        {
          title: '开票部',
          children: [
            {
              title: '开票部1'
            },
            {
              title: '开票部2'
            }
          ]
        },
        {
          title: '客服部',
          children: [
            {
              title: '客服部1'
            },
            {
              title: '客服部2'
            }
          ]
        },
        {
          title: '门店',
          children: [
            {
              title: '门店1'
            },
            {
              title: '门店2'
            }
          ]
        }
      ]
    },
    {
      title: '质管部',
      children: [
        {
          title: '验收',
          children: [
            {
              title: '验收1'
            },
            {
              title: '验收2'
            }
          ]
        },
        {
          title: '养护',
          children: [
            {
              title: '养护1'
            },
            {
              title: '养护2'
            }
          ]
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
