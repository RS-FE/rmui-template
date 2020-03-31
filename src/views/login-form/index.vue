<template>
  <div class="login-container">
    <div class="login-title">手机登录</div>
    <van-form class="login-form" ref="vanForm" @submit="onSubmit" validate-first validate-trigger="onBlur">
      <van-field
        clearable
        type="number"
        v-model="phone"
        name="phone"
        label="手机号码"
        placeholder="请输入手机号码"
        :rules="[
          {required: true, message: '手机号不能为空'},
          {validator: phoneAdt, message: '请输入正确的手机号'}
        ]"
      />
      <van-field
        clearable
        class="van-cell-yzm"
        type="number"
        v-model="vfCode"
        name="vfCode"
        label="验证码"
        placeholder="请输入验证码"
        :rules="[
          {required: true, message: '验证码不能为空'},
          {validator: vfcodeAdt, message: '验证码为4位数字'}
        ]"
      >
        <van-button slot="button" :class="btnClass" @click="sendCode" native-type="button">
          {{ btnText }}
        </van-button>
      </van-field>
      <div class="btn-group">
        <van-button class="btn-primary" round block type="info" native-type="submit">
          登&nbsp;录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import {login} from '@/api/user.js'
export default {
  data() {
    return {
      phone: '',
      vfCode: '',
      isLock: false,
      btnText: '获取验证码'
    }
  },
  computed: {
    btnClass() {
      if (this.isLock) {
        return 'van-btn-yzm lock'
      } else {
        return 'van-btn-yzm'
      }
    }
  },
  methods: {
    sendCode() {
      var timer
      var lockTime = 61
      var that = this
      var fn = function() {
        lockTime--
        if (lockTime == 0) {
          that.btnText = '获取验证码'
          that.isLock = false
          clearInterval(timer)
          timer = null
        } else {
          that.btnText = '已发送 (' + lockTime + 's)'
        }
      }
      if (!that.isLock) {
        that.isLock = true
        timer = setInterval(fn, 1000)
        fn()
      }
    },
    phoneAdt(val) {
      return /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/.test(
        val
      )
    },
    vfcodeAdt(val) {
      return /^\d{4}$/.test(val)
    },
    onSubmit(values) {
      console.log('submit', values)

      const that = this
      login(values)
        .then(() => {
          that.$toast.success({
            message: '提交成功',
            onClose() {
              // that.$router.push({path: '/home'}).catch(err => err)
            }
          })
        })
        .catch(() => {
          this.$toast.fail('提交失败')
        })
    }
  }
}
</script>

<style lang="less" scoped>
@import './index.less';
</style>
