<template>
  <div>
    <van-form @submit="onSubmit">
      <van-field
        required
        input-align="right"
        error-message-align="right"
        v-model="meetingData.govReq"
        label="申请部门："
        name="meeting-govReq"
        placeholder="请填写申请部门"
        :rules="[{required: true, message: '请填写申请部门'}]"
      />
      <van-field
        required
        input-align="right"
        error-message-align="right"
        v-model="meetingData.govHost"
        label="主办部门："
        name="meeting-govHost"
        placeholder="请填写主办部门"
        :rules="[{required: true, message: '请填写主办部门'}]"
      />
      <van-field
        required
        input-align="right"
        error-message-align="right"
        v-model="meetingData.place"
        label="会议地点："
        name="meeting-place"
        placeholder="请填写会议地点"
        :rules="[{required: true, message: '请填写会议地点'}]"
      />
      <van-field
        required
        readonly
        clickable
        input-align="right"
        error-message-align="right"
        v-model="meetingData.time"
        label="会议时间："
        name="meeting-time"
        placeholder="请填写会议时间"
        :rules="[{required: true, trigger: 'onChange', message: '会议时间不能为空'}]"
        @click="picker.time = true"
      />
      <van-popup v-model="picker.time" position="bottom">
        <van-datetime-picker type="date" :min-date="minDate" @confirm="onConfirmTime" @cancel="picker.time = false" />
      </van-popup>
      <van-field
        required
        input-align="right"
        error-message-align="right"
        v-model="meetingData.days"
        label="天数："
        name="meeting-days"
        placeholder="请填写天数"
        :rules="[{required: true, validator: validatorNum, message: '请填写正确天数'}]"
      />
      <van-field
        required
        autosize
        type="textarea"
        rows="1"
        input-align="right"
        error-message-align="right"
        v-model="meetingData.theme"
        label="会议主题："
        name="meeting-theme"
        placeholder="请填写会议主题"
        :rules="[{required: true, message: '请填写会议主题'}]"
      />
      <van-field
        required
        input-align="right"
        error-message-align="right"
        v-model="meetingData.num"
        label="参会人数："
        name="meeting-num"
        placeholder="请填写参会人数"
        :rules="[{required: true, validator: validatorNum, message: '请填写参会人数'}]"
      />
      <van-field
        required
        readonly
        clickable
        input-align="right"
        error-message-align="right"
        v-model="meetingData.arrive"
        label="到达时间："
        name="meeting-arrive"
        placeholder="请填写到达时间"
        :rules="[{required: true, message: '请填写到达时间'}]"
        @click="picker.arrive = true"
      />
      <van-popup v-model="picker.arrive" position="bottom">
        <van-datetime-picker
          type="date"
          :min-date="minDate"
          @confirm="onConfirmArrive"
          @cancel="picker.arrive = false"
        />
      </van-popup>
      <van-field input-align="right" name="meeting-secrecy" label="保密：">
        <template #input>
          <van-switch v-model="meetingData.secrecy" size="20" />
        </template>
      </van-field>
      <div class="van-cell van-cell--required lable-title">
        会议级别：
      </div>
      <van-field
        error-message-align="right"
        name="meeting-level"
        :rules="[{required: true, trigger: 'onChange', message: '请选择会议级别'}]"
      >
        <template #input>
          <van-radio-group v-model="meetingData.level" direction="horizontal">
            <van-radio name="大型会议">大型会议</van-radio>
            <van-radio name="中型会议">中型会议</van-radio>
            <van-radio name="小型会议">小型会议</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-cell-group title="场地布置：">
        <div class="van-cell lable-title">
          会场布置：
        </div>
        <van-field name="meeting-decorate">
          <template #input>
            <van-checkbox-group v-model="meetingData.decorate" direction="horizontal">
              <van-checkbox name="签到台" shape="square">签到台</van-checkbox>
              <van-checkbox name="课桌型" shape="square">课桌型</van-checkbox>
              <van-checkbox name="回型" shape="square">回型</van-checkbox>
            </van-checkbox-group>
          </template>
        </van-field>
        <div class="van-cell lable-title">
          会议设备：
        </div>
        <van-field name="meeting-equip">
          <template #input>
            <van-checkbox-group v-model="meetingData.equip" direction="horizontal">
              <van-checkbox name="投影仪" shape="square">投影仪</van-checkbox>
              <van-checkbox name="相机" shape="square">相机</van-checkbox>
              <van-checkbox name="传真机" shape="square">传真机</van-checkbox>
              <van-checkbox name="插线板" shape="square">插线板</van-checkbox>
              <van-checkbox name="激光笔" shape="square">激光笔</van-checkbox>
              <van-checkbox name="音响设备" shape="square">音响设备</van-checkbox>
            </van-checkbox-group>
          </template>
        </van-field>
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import {parseTime} from '@/utils/index.js'
import {getData, submitData} from '@/api/meeting-form.js'
export default {
  data() {
    return {
      picker: {
        time: false,
        arrive: false
      },
      meetingData: {
        govReq: '申请部门',
        govHost: '主办部门',
        place: '会议地点',
        time: '2020-03-31',
        days: '1',
        theme: '会议主题',
        num: '10',
        arrive: '2020-03-31',
        secrecy: true,
        level: '小型会议',
        decorate: ['签到台'],
        equip: ['投影仪', '插线板', '激光笔']
      }
    }
  },
  computed: {
    minDate() {
      return new Date()
    }
  },
  methods: {
    init() {
      getData()
        .then(res => {
          console.log(res)
          this.meetingData = res.data
        })
        .catch(() => {
          this.$toast.fail('获取数据失败')
        })
    },
    onSubmit(values) {
      console.log('submit', values)
      const that = this
      submitData(values)
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
    },
    onConfirmTime(time) {
      this.meetingData.time = parseTime(time, '{y}-{m}-{d}')
      this.picker.time = false
    },
    onConfirmArrive(time) {
      this.meetingData.arrive = parseTime(time, '{y}-{m}-{d}')
      this.picker.arrive = false
    },
    validatorNum(val) {
      return /^[0-9]*$/.test(val)
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style lang="less">
@import './index.less';
</style>
