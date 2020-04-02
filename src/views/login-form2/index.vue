<template>
  <div class="login-container">
    <img src="@/assets/login-form2/logo-rmui.png" alt="" class="logo" />
    <van-form class="login-form" ref="vanForm" @submit="onSubmit" validate-first validate-trigger="onBlur">
      <div class="van-field-group">
        <van-field v-if="!hasRegister" clearable type="number" v-model="phone" name="phone" placeholder="手机号" />
        <van-field clearable v-model="userName" name="userName" placeholder="用户名" />
        <van-field
          clearable
          :class="pwdClass"
          :type="pwdType"
          v-model="pwd"
          name="pwd"
          placeholder="密码"
          right-icon="eye"
          @click-right-icon="changePwdType"
        >
        </van-field>
      </div>
      <div class="van-btn-group">
        <van-button class="btn-primary" block type="info" native-type="submit">
          {{ hasRegister ? '登&nbsp;录' : '注&nbsp;册' }}
        </van-button>
      </div>
      <div v-show="hasRegister" class="van-helper">
        <span class="register" @click="hasRegister = false">注册账号</span>
        <span v-show="!showThird" class="third" @click="showThird = !showThird">第三方登录</span>
      </div>
      <div v-show="!hasRegister" class="van-helper">
        <span class="register" @click="hasRegister = true">已有账号</span>
      </div>
      <div v-show="showThird && hasRegister" class="van-third">
        <p>第三方登录</p>
        <span class="iconfont icon-aui-icon-weichat"></span>
        <span class="iconfont icon-qq"></span>
        <span class="iconfont icon-weibo"></span>
      </div>
    </van-form>
  </div>
</template>

<script>
import {login, register} from '@/api/login-form.js'
export default {
  data() {
    return {
      phone: '',
      userName: '',
      pwd: '',
      pwdType: 'password',
      hasRegister: true,
      showThird: false
    }
  },
  computed: {
    pwdClass() {
      return 'van-field-' + this.pwdType
    }
  },
  methods: {
    changePwdType() {
      if (this.pwdType === 'password') {
        this.pwdType = 'text'
      } else {
        this.pwdType = 'password'
      }
    },
    onSubmit(values) {
      console.log('submit', values)
      const that = this
      // 没注册的需要检验手机号
      if (!that.hasRegister) {
        if (!values.phone) {
          that.$dialog.alert({
            title: '提示',
            message: '手机号不能为空！'
          })
          return false
        }
        if (
          !/^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/.test(
            values.phone
          )
        ) {
          that.$dialog.alert({
            title: '提示',
            message: '手机号不合法！'
          })
        }
      }
      if (!values.userName) {
        that.$dialog.alert({
          title: '提示',
          message: '用户名不能为空！'
        })
        return false
      }
      if (!/\w/.test(values.userName)) {
        that.$dialog.alert({
          title: '提示',
          message: '用户名只能由大小写字母、数字或下划线组成！'
        })
      }
      if (!values.pwd) {
        that.$dialog.alert({
          title: '提示',
          message: '密码不能为空！'
        })
        return false
      }
      if (!/.{6,}/.test(values.pwd)) {
        that.$dialog.alert({
          title: '提示',
          message: '密码不能少于6位！'
        })
        return false
      }
      if (that.hasRegister) {
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
      } else {
        register(values)
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
}
</script>

<style lang="less" scoped>
@import '../../style/iconfont2/iconfont.css';
@import './index.less';
</style>
