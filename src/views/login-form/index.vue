<template>
  <div></div>
</template>

<script>
import {login, getUserInfo} from '@/api/user.js'
export default {
  mounted() {
    this.init()
  },
  methods: {
    init() {
      login({username: 'admin'})
        .then(() => {})
        .catch(() => {})
      getUserInfo({token: 'admin-token'})
        .then(() => {})
        .catch(() => {})
    }
  }
}
</script>
