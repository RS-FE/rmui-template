import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routes = [
  {
    path: '*',
    name: '404',
    component: () => import('@/views/404'),
    keepAlive: true
  },
  {
    path: '/',
    redirect: 'home'
  },
  {
    name: 'home',
    component: () => import('@/views/home'),
    meta: {
      keepAlive: false,
      title: '主页'
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
    name: 'msg-list',
    component: () => import('@/views/msg-list'),
    meta: {
      keepAlive: false,
      title: '消息列表'
    }
  },
  {
    name: 'news-list',
    component: () => import('@/views/news-list'),
    meta: {
      keepAlive: false,
      title: '新闻列表'
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
