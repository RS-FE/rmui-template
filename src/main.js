// 兼容
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import '@vant/touch-emulator'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 全局组件
import DemoBlock from '@/components/DemoBlock'
import DemoNav from '@/components/DemoNav'
import DemoSection from '@/components/DemoSection'
Vue.component(DemoBlock.name, DemoBlock)
Vue.component(DemoNav.name, DemoNav)
Vue.component(DemoSection.name, DemoSection)

// 全局样式
import '@/style/index.less'

// 开发环境下开启 vconsole 调试
// import '@/plugins/vconsole'

// 按需引入UI库 vant
import '@/plugins/vant'

// 上拉加载插件
import '@/plugins/vue-scroll'

// tree 插件
import '@/plugins/tree'

// 文档模式配置 iframe 路由同步
import '@/plugins/site'

// 移动端适配
import 'lib-flexible/flexible.js'

// 过滤器
import './filters'

if (process.env.NODE_ENV !== 'production') {
  Vue.config.productionTip = false
}

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
