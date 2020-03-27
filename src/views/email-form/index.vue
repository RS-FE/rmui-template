<template>
  <div>
    <van-form @submit="onSubmit">
      <van-field
        readonly
        clickable
        name="receiver"
        :value="receivervalue"
        label="发件人："
        right-icon="add"
        placeholder="点击选择收件人"
        @click="showReceiver = true"
      />
      <van-field
        readonly
        clickable
        name="sender"
        :value="sendervalue"
        label="收件人："
        right-icon="arrow-down"
        placeholder="点击选择发件人"
        @click="showSender = true"
      />
      <van-field
        v-model="text"
        :rules="[{required: true, message: '请填写标题'}]"
        label="标题："
        name="title"
        placeholder="请输入邮件标题"
      />
      <div style="margin: 16px 0;">
        <div class="van-cell lable-title">
          正文内容：
        </div>
        <van-field v-model="textarea" rows="3" autosize type="textarea" placeholder="请输入你的内容" name="textarea" />
      </div>
      <div class="van-cell lable-title">
        文件上传：
      </div>
      <van-field name="uploader">
        <template #input>
          <van-uploader v-model="uploader" />
        </template>
      </van-field>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
      <!-- 弹出层 -->
      <van-popup v-model="showReceiver" position="bottom">
        <van-picker show-toolbar :columns="columns" @confirm="onConfirmReceiver" @cancel="showReceiver = false" />
      </van-popup>
      <van-popup v-model="showSender" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          default-index="1"
          @confirm="onConfirmSender"
          @cancel="showSender = false"
        />
      </van-popup>
    </van-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      receivervalue: '',
      sendervalue: '',
      columns: ['王力', '郑芳', '谭肖', '黄祥'],
      columns2: ['王力1', '郑芳1', '谭肖1', '黄祥1'],
      showReceiver: false,
      showSender: false,
      text: '',
      textarea: '',
      uploader: [{url: 'https://img.yzcdn.cn/vant/leaf.jpg'}]
    }
  },
  methods: {
    onSubmit(values) {
      console.log(values)
      this.$toast.success('控制台查看提交信息')
    },
    onConfirmReceiver(value) {
      this.receivervalue = value
      this.showReceiver = false
    },
    onConfirmSender(value) {
      this.sendervalue = value
      this.showSender = false
    }
  }
}
</script>

<style lang="less">
@import './index.less';
</style>
