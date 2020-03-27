// 文档模式
import Vue from 'vue'
import router from '@/router'

if (process.env.NODE_ENV === 'site') {
  window.syncRouter = function(to) {
    if (window.parent) {
      window.parent.postMessage(JSON.stringify(to), '*')
    }
  }

  router.afterEach(to => {
    if (!router.currentRoute.redirectedFrom) {
      Vue.nextTick(window.syncRouter(to))
    }
  })
}
