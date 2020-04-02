import Mock from 'mockjs'

const addressList = Mock.mock({
  items: [
    {
      uuid: '1',
      title: '综合办',
      expanded: true,
      children: [
        {
          uuid: '1-1',
          parentUuid: '1',
          title: '人事',
          expanded: true,
          children: [
            {
              uuid: '1-1-1',
              parentUuid: '1-1',
              title: '人事1'
            },
            {
              uuid: '1-1-2',
              parentUuid: '1-1',
              title: '人事2'
            },
            {
              uuid: '1-1-3',
              parentUuid: '1-1',
              title: '人事3'
            },
            {
              uuid: '1-1-4',
              parentUuid: '1-1',
              title: '人事4'
            }
          ]
        },
        {
          uuid: '1-2',
          parentUuid: '1',
          title: '内勤',
          children: [
            {
              uuid: '1-2-1',
              parentUuid: '1-2',
              title: '内勤1'
            },
            {
              uuid: '1-2-1',
              parentUuid: '1-2',
              title: '内勤2'
            }
          ]
        },
        {
          uuid: '1-3',
          parentUuid: '1',
          title: '公关',
          children: [
            {
              uuid: '1-3-1',
              parentUuid: '1-3',
              title: '公关1'
            },
            {
              uuid: '1-3-2',
              parentUuid: '1-3',
              title: '公关2'
            },
            {
              uuid: '1-3-3',
              parentUuid: '1-3',
              title: '公关3'
            }
          ]
        }
      ]
    },
    {
      uuid: '2',
      title: '采购部',
      children: [
        {
          uuid: '2-1',
          parentUuid: '2',
          title: '基药',
          children: [
            {
              uuid: '2-1-1',
              parentUuid: '2-1',
              title: '基药1'
            },
            {
              uuid: '2-1-2',
              parentUuid: '2-1',
              title: '基药2'
            },
            {
              uuid: '2-1-3',
              parentUuid: '2-1',
              title: '基药3'
            }
          ]
        },
        {
          uuid: '2-2',
          parentUuid: '2',
          title: '新药',
          children: [
            {
              uuid: '2-2-1',
              parentUuid: '2-2',
              title: '新药1'
            },
            {
              uuid: '2-2-2',
              parentUuid: '2-2',
              title: '新药2'
            }
          ]
        },
        {
          uuid: '2-3',
          parentUuid: '2',
          title: '调拨',
          children: [
            {
              uuid: '2-3-1',
              parentUuid: '2-3',
              title: '调拨1'
            },
            {
              uuid: '2-3-2',
              parentUuid: '2-3',
              title: '调拨2'
            }
          ]
        }
      ]
    },
    {
      uuid: '3',
      title: '财务部',
      children: [
        {
          uuid: '3-1',
          parentUuid: '3',
          title: '出纳',
          children: [
            {
              uuid: '3-1',
              parentUuid: '3-1',
              title: '出纳1'
            },
            {
              uuid: '3-2',
              parentUuid: '3-1',
              title: '出纳2'
            },
            {
              uuid: '3-3',
              parentUuid: '3-1',
              title: '出纳3'
            },
            {
              uuid: '3-4',
              parentUuid: '3-1',
              title: '出纳4'
            }
          ]
        },
        {
          uuid: '3-2',
          parentUuid: '3',
          title: '会计',
          children: [
            {
              uuid: '3-2-1',
              parentUuid: '3-2',
              title: '会计1'
            },
            {
              uuid: '3-2-2',
              parentUuid: '3-2',
              title: '会计2'
            }
          ]
        }
      ]
    },
    {
      uuid: '4',
      title: '仓储部',
      children: [
        {
          uuid: '4-1',
          parentUuid: '4',
          title: '物流',
          children: [
            {
              uuid: '4-1-1',
              parentUuid: '4-1',
              title: '物流1'
            },
            {
              uuid: '4-1-2',
              parentUuid: '4-1',
              title: '物流2'
            }
          ]
        },
        {
          uuid: '4-2',
          parentUuid: '4',
          title: '司机',
          children: [
            {
              uuid: '4-2-1',
              parentUuid: '4-2',
              title: '司机1'
            },
            {
              uuid: '4-2-2',
              parentUuid: '4-2',
              title: '司机2'
            }
          ]
        }
      ]
    },
    {
      uuid: '5',
      title: '营销中心',
      children: [
        {
          uuid: '5-1',
          parentUuid: '5',
          title: '销售部',
          children: [
            {
              uuid: '5-1-1',
              parentUuid: '5-1',
              title: '组1',
              children: [
                {
                  uuid: '5-1-1-1',
                  parentUuid: '5-1-1',
                  title: '销售部组1-1'
                },
                {
                  uuid: '5-1-1-2',
                  parentUuid: '5-1-1',
                  title: '销售部组1-2'
                }
              ]
            },
            {
              uuid: '5-1-2',
              parentUuid: '5-1',
              title: '组2',
              children: [
                {
                  uuid: '5-1-2-1',
                  parentUuid: '5-1-2',
                  title: '销售部组2-1'
                },
                {
                  uuid: '5-1-2-2',
                  parentUuid: '5-1-2',
                  title: '销售部组2-2'
                }
              ]
            }
          ]
        },
        {
          uuid: '5-2',
          parentUuid: '5',
          title: '开票部',
          children: [
            {
              uuid: '5-2-1',
              parentUuid: '5-2',
              title: '开票部1'
            },
            {
              uuid: '5-2-2',
              parentUuid: '5-2',
              title: '开票部2'
            }
          ]
        },
        {
          uuid: '5-3',
          parentUuid: '5',
          title: '客服部',
          children: [
            {
              uuid: '5-3-1',
              parentUuid: '5-3',
              title: '客服部1'
            },
            {
              uuid: '5-3-2',
              parentUuid: '5-3',
              title: '客服部2'
            }
          ]
        },
        {
          uuid: '5-4',
          parentUuid: '5',
          title: '门店',
          children: [
            {
              uuid: '5-4-1',
              parentUuid: '5-4',
              title: '门店1'
            },
            {
              uuid: '5-4-2',
              parentUuid: '5-4',
              title: '门店2'
            }
          ]
        }
      ]
    },
    {
      uuid: '6',
      title: '质管部',
      children: [
        {
          uuid: '6-1',
          parentUuid: '6',
          title: '验收',
          children: [
            {
              uuid: '6-1-1',
              parentUuid: '6-1',
              title: '验收1'
            },
            {
              uuid: '6-1-2',
              parentUuid: '6-1',
              title: '验收2'
            }
          ]
        },
        {
          uuid: '6-2',
          parentUuid: '6',
          title: '养护',
          children: [
            {
              uuid: '6-2-1',
              parentUuid: '6-2',
              title: '养护1'
            },
            {
              uuid: '6-2-2',
              parentUuid: '6-2',
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
