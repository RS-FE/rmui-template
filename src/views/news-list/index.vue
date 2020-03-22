<template>
  <div></div>
</template>

<script>
import {getNewsList} from '@/api/list.js'
export default {
  mounted() {
    this.init()
  },
  methods: {
    init() {
      getNewsList()
        .then(res => {
          console.log(res)
        })
        .catch(() => {})
    }
  }
}
</script>
