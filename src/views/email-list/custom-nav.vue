<template>
  <div v-show="title" class="demo-nav">
    <div class="demo-nav__title">{{ title }}</div>
    <svg class="demo-nav__back" viewBox="0 0 1000 1000" @click="onBack">
      <path fill="#969799" fill-rule="evenodd" :d="path" />
    </svg>
    <div class="demo-nav__operation" v-if="customTitle" @click="onOpera">{{ operaText }}</div>
  </div>
</template>

<script>
/* eslint-disable max-len */
export default {
  name: 'demo-nav',
  data() {
    return {
      path:
        'M296.114 508.035c-3.22-13.597.473-28.499 11.079-39.105l333.912-333.912c16.271-16.272 42.653-16.272 58.925 0s16.272 42.654 0 58.926L395.504 498.47l304.574 304.574c16.272 16.272 16.272 42.654 0 58.926s-42.654 16.272-58.926 0L307.241 528.058a41.472 41.472 0 0 1-11.127-20.023z',
      customTitle: true,
      operaText: ''
    }
  },
  computed: {
    title() {
      const meta = this.$route.meta || {}
      return meta.title !== '主页' ? meta.title : ''
    }
  },
  mounted() {
    const meta = this.$route.meta || {}
    this.operaText = meta.customTitle ? meta.customTitle : ''
  },
  methods: {
    onBack() {
      history.back()
    },
    onOpera() {
      if (this.operaText == '操作') {
        this.operaText = '取消'
      } else {
        this.operaText = '操作'
      }
      this.$store.commit('changeEmailListMode')
    }
  }
}
</script>

<style lang="less">
.demo-nav {
  position: relative;
  height: 56px;
  line-height: 56px;
  text-align: center;
  background-color: #fff;

  &__title {
    font-weight: 500;
    font-size: 17px;
    text-transform: capitalize;
  }

  &__back {
    position: absolute;
    top: 50%;
    left: 16px;
    width: 24px;
    height: 24px;
    transform: translateY(-50%);
    cursor: pointer;
  }

  &__operation {
    font-weight: 500;
    font-size: 17px;
    position: absolute;
    top: 0;
    right: 16px;
  }
}
</style>
