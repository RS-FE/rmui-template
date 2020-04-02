import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routes = [
  // {
  //   path: '*',
  //   name: '404',
  //   component: () => import('@/views/404'),
  //   keepAlive: true
  // },
  {
    path: '*',
    redirect: '/home'
  },
  {
    name: 'home',
    component: () => import('@/views/home'),
    meta: {
      keepAlive: false,
      title: '主页',
      customTitle: true
    }
  },
  {
    name: 'meeting-list',
    component: () => import('@/views/meeting-list'),
    meta: {
      keepAlive: false,
      title: '会议室预约列表'
    }
  },
  // {
  //   name: 'meeting-list2',
  //   component: () => import('@/views/meeting-list2'),
  //   meta: {
  //     keepAlive: false,
  //     title: '会议室预约列表2'
  //   }
  // },
  {
    name: 'msg-list',
    component: () => import('@/views/msg-list'),
    meta: {
      keepAlive: false,
      title: '消息列表'
    }
  },
  {
    name: 'address-list',
    component: () => import('@/views/address-list'),
    meta: {
      keepAlive: false,
      title: '通讯录'
    }
  },
  {
    name: 'inform-list',
    component: () => import('@/views/inform-list'),
    meta: {
      keepAlive: false,
      title: '通知列表'
    }
  },
  {
    name: 'wait-list',
    component: () => import('@/views/wait-list'),
    meta: {
      keepAlive: false,
      title: '待办列表'
    }
  },
  {
    name: 'press-list',
    component: () => import('@/views/press-list'),
    meta: {
      keepAlive: false,
      title: '新闻列表'
    }
  },
  // {
  //   name: 'falls-list',
  //   component: () => import('@/views/falls-list'),
  //   meta: {
  //     keepAlive: false,
  //     title: '瀑布列表'
  //   }
  // },
  {
    name: 'email-list',
    component: () => import('@/views/email-list'),
    meta: {
      keepAlive: false,
      title: '邮件列表',
      customTitle: '操作'
    }
  },
  {
    name: 'login-form',
    component: () => import('@/views/login-form'),
    meta: {
      keepAlive: false,
      title: '登录注册'
    }
  },
  {
    name: 'login-form2',
    component: () => import('@/views/login-form2'),
    meta: {
      keepAlive: false,
      title: '登录注册2'
    }
  },
  {
    name: 'normal-form',
    component: () => import('@/views/normal-form'),
    meta: {
      keepAlive: false,
      title: '通用表单'
    }
  },
  {
    name: 'receive-form',
    component: () => import('@/views/receive-form'),
    meta: {
      keepAlive: false,
      title: '收发文传阅'
    }
  },
  {
    name: 'email-form',
    component: () => import('@/views/email-form'),
    meta: {
      keepAlive: false,
      title: '邮件表单'
    }
  },
  {
    name: 'meeting-form',
    component: () => import('@/views/meeting-form'),
    meta: {
      keepAlive: false,
      title: '会议表单'
    }
  }
]

// 添加路由路径
routes.forEach(route => {
  route.path = route.path || '/' + (route.name || '')
})

// 实例化路由
const createRouter = () =>
  new VueRouter({
    // mode: 'history', // require service support
    scrollBehavior: () => ({y: 0}),
    routes
  })
const router = createRouter()

// 重置路由
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

// 设置页面标题
router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title
  if (title) {
    document.title = title
  }
  next()
})

export default router
