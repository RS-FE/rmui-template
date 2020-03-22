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
import DemoNav from './components/DemoNav'

export default {
  name: 'App',
  components: {DemoNav}
}
</script>

<style lang="less">
@import './style/var';
@import './style/base';

body {
  min-width: 100vw;
}

::-webkit-scrollbar {
  width: 0;
  background: transparent;
}
</style>
