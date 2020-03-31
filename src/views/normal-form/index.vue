<template>
  <demo-section>
    <van-form
      ref="vanForm"
      @submit="onSubmit"
      validate-first
      validate-trigger="onBlur"
      input-align="right"
      error-message-align="right"
    >
      <van-cell-group title="基本信息">
        <van-field
          required
          v-model="userData.username"
          name="username"
          label="姓名"
          placeholder="请输入姓名"
          :rules="[{required: true, message: '姓名不能为空'}]"
        />
        <van-field
          required
          is-link
          readonly
          clickable
          name="licenseType"
          label="证件类型"
          :value="userData.licenseType"
          placeholder="请选择"
          @click="licenseType.showPicker = true"
          :rules="[{required: true, trigger: 'onChange', message: '证件类型不能为空'}]"
        />
        <van-popup v-model="licenseType.showPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="licenseType.columns"
            @confirm="onConfirmLicense"
            @cancel="licenseType.showPicker = false"
          />
        </van-popup>
        <van-field
          required
          v-model="userData.licenseCode"
          name="licenseCode"
          label="证件号码"
          placeholder="请输入证件号码"
          :rules="[
            {required: true, message: '证件号码不能为空'},
            {validator: licenseTypeAdt, message: '请先选择证件类型'},
            {validator: licenseAdt, message: '请输入正确的护照号码'},
            {validator: idCardAdt, message: '请输入正确的身份证号码'}
          ]"
        />
        <van-field
          required
          v-model="userData.phone"
          type="number"
          name="phone"
          label="手机号码"
          placeholder="请输入手机号码"
          :rules="[
            {required: true, message: '手机号码不能为空'},
            {validator: phoneAdt, message: '请输入正确的手机号码'}
          ]"
        />
      </van-cell-group>
      <van-cell-group title="接触史">
        <van-cell required title="当前有无发热咳嗽">
          <template #right-icon>
            <van-switch v-model="isSick" size="24" @change="switchSick" />
          </template>
        </van-cell>
        <van-field type="hidden" name="isSick" v-model="userData.isSick" style="display: none" />
        <van-cell required title="14日内是否在湖北、温州、台州温岭">
          <template #right-icon>
            <van-switch v-model="isDanger" size="24" @change="switchDanger" />
          </template>
        </van-cell>
        <van-field type="hidden" name="isDanger" v-model="userData.isDanger" style="display: none" />
      </van-cell-group>
      <van-cell-group title="其他信息">
        <van-field
          required
          is-link
          readonly
          clickable
          name="date"
          :value="userData.date"
          label="拟到达时间"
          placeholder="请选择"
          @click="date.showPicker = true"
          :rules="[{required: true, trigger: 'onChange', message: '拟到达时间不能为空'}]"
        />
        <van-popup v-model="date.showPicker" position="bottom">
          <van-datetime-picker
            type="date"
            :min-date="minDate"
            @confirm="onConfirmDate"
            @cancel="date.showPicker = false"
          />
        </van-popup>
        <van-field
          required
          is-link
          readonly
          clickable
          name="area"
          label="出发地"
          :value="userData.area"
          placeholder="请选择"
          @click="area.showArea = true"
          :rules="[{required: true, trigger: 'onChange', message: '出发地不能为空'}]"
        />
        <van-popup v-model="area.showArea" position="bottom">
          <van-area :area-list="area.areaList" @confirm="onConfirmArea" @cancel="area.showArea = false" />
        </van-popup>
        <van-field required name="trafficType" label="交通方式" :rules="[{required: true, message: '请选择交通方式'}]">
          <template #input>
            <van-checkbox-group v-model="userData.trafficType" direction="horizontal">
              <van-checkbox name="airplane" shape="square">飞机</van-checkbox>
              <van-checkbox name="train" shape="square">火车</van-checkbox>
              <van-checkbox name="bus" shape="square">汽车</van-checkbox>
              <van-checkbox name="car" shape="square">自驾</van-checkbox>
            </van-checkbox-group>
          </template>
        </van-field>
        <van-field
          v-if="userData.trafficType && userData.trafficType.indexOf('airplane') !== -1"
          required
          v-model="userData.airplane"
          name="airplane"
          label="飞机"
          placeholder="请输入您的飞机航班次"
          :rules="[
            {required: true, message: '飞机航班次不能为空'},
            {validator: airplaneAdt, message: '请输入正确的飞机航班次'}
          ]"
        />
        <van-field
          v-if="userData.trafficType && userData.trafficType.indexOf('train') !== -1"
          required
          v-model="userData.train"
          name="train"
          label="火车"
          placeholder="请输入您的火车车次"
          :rules="[
            {required: true, message: '火车车次不能为空'},
            {validator: trainAdt, message: '请输入正确的火车车次'}
          ]"
        />
        <van-field
          v-if="userData.trafficType && userData.trafficType.indexOf('bus') !== -1"
          required
          v-model="userData.bus"
          name="bus"
          label="汽车"
          placeholder="请输入您乘坐的汽车车牌号码"
          :rules="[
            {required: true, message: '车牌号码不能为空'},
            {validator: busAdt, message: '请输入正确的车牌号码'}
          ]"
        />
        <van-field
          v-if="userData.trafficType && userData.trafficType.indexOf('car') !== -1"
          required
          v-model="userData.car"
          name="car"
          label="自驾"
          placeholder="请输入您的车牌号码"
          :rules="[
            {required: true, message: '车牌号码不能为空'},
            {validator: carAdt, message: '请输入正确的车牌号码'}
          ]"
        />
      </van-cell-group>
      <div class="van-button-group">
        <van-button type="info" native-type="submit">提交</van-button>
        <van-button class="vant-button-gray" native-type="reset" @click="onReset">重置</van-button>
      </div>
    </van-form>
  </demo-section>
</template>

<script>
import {parseTime} from '@/utils/index.js'
import AreaList from '@/utils/area.js'
import {getFormData, submitFormData} from '@/api/normal-form.js'
export default {
  data() {
    return {
      isSick: false,
      isDanger: false,
      licenseType: {
        showPicker: false,
        columns: ['护照', '身份证']
      },
      date: {
        showPicker: false
      },
      area: {
        showArea: false,
        areaList: AreaList
      },
      userData: {
        username: '',
        licenseCode: '',
        phone: '',
        isSick: '否',
        isDanger: '否',
        licenseType: '',
        date: '',
        area: '',
        trafficType: [],
        airplane: '',
        train: '',
        bus: '',
        car: ''
      }
    }
  },
  computed: {
    minDate() {
      return new Date()
    }
  },
  mounted() {
    getFormData({name: '111'})
      .then(res => {
        if (res.code === 20000) {
          console.log(res.data)
          this.initData(res.data)
        }
      })
      .catch(() => {
        this.$toast.fail('获取数据失败')
      })
  },
  methods: {
    initData(data) {
      this.userData = data
      if (this.userData.isSick === '是') {
        this.isSick = true
      } else {
        this.isSick = false
      }
      if (this.userData.isDanger === '是') {
        this.isDanger = true
      } else {
        this.isDanger = false
      }
    },
    licenseTypeAdt() {
      if (this.userData.licenseType) {
        return true
      } else {
        return false
      }
    },
    licenseAdt(val) {
      if (this.userData.licenseType === '护照') {
        return /(^[EeKkGgDdSsPpHh]\d{8}$)|(^(([Ee][a-fA-F])|([DdSsPp][Ee])|([Kk][Jj])|([Mm][Aa])|(1[45]))\d{7}$)/.test(
          val
        )
      } else {
        return true
      }
    },
    idCardAdt(val) {
      if (this.userData.licenseType === '身份证') {
        return /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/.test(
          val
        )
      } else {
        return true
      }
    },
    phoneAdt(val) {
      return /^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(val)
    },
    airplaneAdt(val) {
      return /^[A-Z\d]{2}\d{3,4}$/.test(val)
    },
    trainAdt(val) {
      return /^[GCDZTSPKXLY1-9]\d{1,4}$/.test(val)
    },
    busAdt(val) {
      return /^(?:[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-HJ-NP-Z]{1}(?:(?:[0-9]{5}[DF])|(?:[DF](?:[A-HJ-NP-Z0-9])[0-9]{4})))|(?:[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9 挂学警港澳]{1})$/.test(
        val
      )
    },
    carAdt(val) {
      return /^(?:[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-HJ-NP-Z]{1}(?:(?:[0-9]{5}[DF])|(?:[DF](?:[A-HJ-NP-Z0-9])[0-9]{4})))|(?:[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9 挂学警港澳]{1})$/.test(
        val
      )
    },
    switchSick(value) {
      const v = value ? '是' : '否'
      this.userData.isSick = v
    },
    switchDanger(value) {
      const v = value ? '是' : '否'
      this.userData.isDanger = v
    },
    onConfirmLicense(value) {
      this.userData.licenseType = value
      this.licenseType.showPicker = false
    },
    onConfirmArea(values) {
      this.userData.area = values.map(item => item.name).join('/')
      this.area.showArea = false
    },
    onConfirmDate(time) {
      this.userData.date = parseTime(time, '{y}-{m}-{d}')
      this.date.showPicker = false
    },
    onSubmit(values) {
      console.log('submit', values)

      const that = this
      submitFormData(values)
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
    onReset() {
      const defaultData = {
        isSick: false,
        isDanger: false,
        userData: {
          username: '',
          licenseCode: '',
          phone: '',
          isSick: '否',
          isDanger: '否',
          licenseType: '',
          date: '',
          area: '',
          trafficType: [],
          airplane: '',
          train: '',
          bus: '',
          car: ''
        }
      }
      this.isSick = defaultData.isSick
      this.isDanger = defaultData.isDanger
      this.userData = defaultData.userData
      setTimeout(() => {
        this.$refs.vanForm.resetValidation()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.van-button-group {
  margin: 16px 16px 0;
  display: flex;
  button {
    flex: 1;
  }
  button + button {
    margin-left: 10px;
  }
  .van-button {
    border-radius: 3px;
  }
  .vant-button-gray {
    background: #ccc;
    color: #fff;
  }
}
/deep/ .van-checkbox--horizontal {
  margin-right: 10px;
}
/deep/ .van-checkbox__label {
  margin-left: 4px;
}
</style>
