<template>
  <div id="app">
    <demo-nav />
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<script>
export default {
  name: 'App',
  methods: {
    siteInit() {
      const that = this
      window.addEventListener('message', e => {
        if (e.data && typeof e.data === 'string' && e.data.indexOf('path') !== -1) {
          const data = JSON.parse(e.data)
          let hasRoutes = false
          const routers = that.$router.options.routes
          for (let i = 0; i < routers.length; i++) {
            if (data.path === routers[i].path) {
              hasRoutes = true
              break
            }
          }
          if (!hasRoutes) {
            that.$router.replace({path: '/'})
          } else if (hasRoutes && that.$router.currentRoute.path !== data.path) {
            that.$router.replace({path: data.path})
          }
        }
      })
    }
  },
  mounted() {
    // 文档模式, 配置为 iframe
    if (process.env.NODE_ENV === 'site') {
      this.siteInit()
    }
  }
}
</script>

<style lang="less">
body {
  min-width: 100vw;
}

::-webkit-scrollbar {
  width: 0;
  background: transparent;
}
</style>
