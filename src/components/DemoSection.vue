<template>
  <section class="van-doc-demo-section" :class="demoName">
    <slot />
  </section>
</template>

<script>
import {decamelize} from '@/utils/index.js'

export default {
  name: 'demo-section',
  computed: {
    demoName() {
      const name = this.$route.name
      if (name) {
        return `demo-${decamelize(name)}`
      }
      return ''
    }
  }
}
</script>

<style lang="less">
.van-doc-demo-section {
  box-sizing: border-box;
  min-height: calc(100vh - 56px);
  padding-bottom: 20px;
}
</style>
