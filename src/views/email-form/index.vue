<template>
  <div>
    <van-form @submit="onSubmit">
      <van-field
        required
        autosize
        type="textarea"
        rows="1"
        name="receiver"
        label="收件人："
        input-align="right"
        error-message-align="right"
        v-model="emailData.receiver"
        placeholder="点击选择收件人"
        :rules="[{required: true, message: '请填写收件人'}]"
      />
      <van-field
        required
        autosize
        type="textarea"
        rows="1"
        name="sender"
        label="发件人："
        input-align="right"
        error-message-align="right"
        v-model="emailData.sender"
        placeholder="点击选择发件人"
        :rules="[{required: true, message: '请填写收件人'}]"
      />
      <van-field
        required
        autosize
        type="textarea"
        rows="1"
        name="title"
        label="标题："
        input-align="right"
        error-message-align="right"
        v-model="emailData.title"
        placeholder="请输入邮件标题"
        :rules="[{required: true, message: '请填写邮件标题'}]"
      />
      <div style="margin: 16px 0;">
        <div class="van-cell lable-title">
          正文内容：
        </div>
        <van-field
          autosize
          rows="3"
          type="textarea"
          name="textarea"
          v-model="emailData.text"
          placeholder="请输入你的内容"
        />
      </div>
      <div class="van-cell lable-title">
        文件上传：
      </div>
      <van-field name="uploader">
        <template #input>
          <van-uploader v-model="emailData.enclosure" />
        </template>
      </van-field>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import {getEmailForm} from '@/api/email-form.js'
export default {
  data() {
    return {
      emailData: {
        receiver: '收件人',
        sender: '发件人',
        title: '邮件标题',
        text: '邮件正文',
        enclosure: [{url: 'https://img.yzcdn.cn/vant/leaf.jpg'}]
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      getEmailForm()
        .then(res => {
          this.emailData = res.data
          console.log(res)
        })
        .catch(() => {
          this.$toast.fail('获取数据失败')
        })
    },
    onSubmit(values) {
      console.log(values)
      this.$toast.success('控制台查看提交信息')
    }
  }
}
</script>

<style lang="less">
@import './index.less';
</style>
