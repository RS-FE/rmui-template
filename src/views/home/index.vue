<template>
  <div class="demo-home">
    <h1 class="demo-home__title">
      <img src="@/assets/home/logo-rmui.png" />
      <span>Risen-M</span>
    </h1>
    <h2 v-if="description" class="demo-home__desc">
      {{ description }}
    </h2>
    <template v-for="(group, index) in homeNav">
      <demo-home-nav :group="group" :key="index" />
    </template>
  </div>
</template>

<script>
import DemoHomeNav from '@/components/DemoHomeNav'

export default {
  components: {
    DemoHomeNav
  },
  data() {
    return {
      description: '基于 Vant 开发的移动端组件库'
    }
  },
  computed: {
    homeNav() {
      return this.$store.state.nav.homeNav
    }
  }
}
</script>

<style lang="less">
.demo-home {
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
  padding: 46px 20px 20px;
  background: #fff;

  &__title,
  &__desc {
    padding-left: 16px;
    font-weight: normal;
    line-height: 1;
    user-select: none;
  }

  &__title {
    margin: 0 0 16px;
    font-size: 32px;

    img,
    span {
      display: inline-block;
      vertical-align: middle;
    }

    img {
      width: 90px;
    }

    span {
      margin-left: 16px;
      font-weight: 500;
      font-size: 16px;
    }

    &--small {
      font-size: 24px;
    }
  }

  &__desc {
    margin: 0 0 40px;
    color: rgba(69, 90, 100, 0.6);
    font-size: 14px;
  }
}
</style>
