<template>
  <div></div>
</template>

<script>
import {getMsgList} from '@/api/list.js'
export default {
  mounted() {
    this.init()
  },
  methods: {
    init() {
      getMsgList()
        .then(res => {
          console.log(res)
        })
        .catch(() => {})
    }
  }
}
</script>
