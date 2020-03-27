<template>
  <div>
    <van-form @submit="onSubmit">
      <van-field
        v-model="meetingMsg.govReq"
        :rules="[{required: true, message: '请填写申请部门'}]"
        label="申请部门："
        name="gov-req"
        placeholder="请填写申请部门"
      />
      <van-field v-model="meetingMsg.govHost" label="主办部门：" name="govHost" placeholder="请填写主办部门" />
      <van-field v-model="meetingMsg.meetingPlace" label="会议地点" name="meetingPlace" placeholder="请填写会议地点" />
      <van-field v-model="meetingMsg.meetingTime" label="会议时间" name="meetingTime" placeholder="请填写会议时间" />
      <van-field v-model="meetingMsg.meetingDate" label="天数" name="meetingDate" placeholder="请填写天数" />
      <van-field v-model="meetingMsg.meetingTheme" label="会议主题" name="meetingTheme" placeholder="请填写会议主题" />
      <van-field v-model="meetingMsg.meetingNum" label="参会人数" name="meetingNum" placeholder="请填写参会人数" />
      <van-field
        v-model="meetingMsg.meetingArrvie"
        label="到达时间"
        name="meetingArrvie"
        placeholder="请填写到达时间"
      />
      <van-field name="checkboxGroup" label="会议级别：">
        <template #input>
          <van-checkbox-group v-model="checkboxGroup">
            <van-checkbox name="1" shape="square">大型会议</van-checkbox>
            <van-checkbox name="2" shape="square">中型会议</van-checkbox>
            <van-checkbox name="3" shape="square">小型会议</van-checkbox>
          </van-checkbox-group>
        </template>
      </van-field>
      <van-field name="switch" label="保密：">
        <template #input>
          <van-switch v-model="switchChecked" size="20" />
        </template>
      </van-field>
      <p class="title">场地布置：</p>
      <van-field class="lable-title" label="会场布置："></van-field>
      <van-field name="checkboxGroup2">
        <template #input>
          <van-checkbox-group v-model="checkboxGroup2" direction="horizontal">
            <van-checkbox name="1" shape="square">签到台</van-checkbox>
            <van-checkbox name="2" shape="square">课桌型</van-checkbox>
            <van-checkbox name="3" shape="square">回型</van-checkbox>
          </van-checkbox-group>
        </template>
      </van-field>
      <van-field class="lable-title" label="会议设备："></van-field>
      <van-field name="checkboxGroup3">
        <template #input>
          <van-checkbox-group v-model="checkboxGroup3" direction="horizontal">
            <van-checkbox name="1" shape="square">投影仪</van-checkbox>
            <van-checkbox name="2" shape="square">相机</van-checkbox>
            <van-checkbox name="3" shape="square">传真机</van-checkbox>
            <van-checkbox name="4" shape="square">插线板</van-checkbox>
            <van-checkbox name="5" shape="square">激光笔</van-checkbox>
            <van-checkbox name="6" shape="square">影响设备</van-checkbox>
          </van-checkbox-group>
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
export default {
  data() {
    return {
      meetingMsg: {
        govReq: '',
        govHost: '',
        meetingPlace: '',
        meetingTime: '',
        meetingDate: '',
        meetingTheme: '',
        meetingNum: '',
        meetingArrvie: ''
      },
      checkboxGroup: [],
      checkboxGroup2: [],
      checkboxGroup3: [],
      switchChecked: false
    }
  },
  methods: {
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
