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
      <van-cell-group class="van-cell-group">
        <van-field
          required
          is-link
          readonly
          clickable
          name="receiveType"
          label="收文类别："
          :value="userData.receiveType"
          placeholder="请选择"
          @click="receiveType.showPicker = true"
          :rules="[{required: true, trigger: 'onChange', message: '收文类别不能为空'}]"
        />
        <van-popup v-model="receiveType.showPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="receiveType.columns"
            @confirm="onConfirmreceiveType"
            @cancel="receiveType.showPicker = false"
          />
        </van-popup>
      </van-cell-group>
      <van-cell-group class="van-cell-group">
        <van-field
          required
          v-model="userData.receiveCode"
          name="receiveCode"
          label="收文编号："
          placeholder="请输入收文编号"
          :rules="[{required: true, message: '收文编号不能为空'}]"
        />
        <van-field
          required
          is-link
          readonly
          clickable
          name="receiveDate"
          :value="userData.receiveDate"
          label="收文日期："
          placeholder="请选择"
          @click="receiveDate.showPicker = true"
          :rules="[{required: true, trigger: 'onChange', message: '收文日期不能为空'}]"
        />
        <van-popup v-model="receiveDate.showPicker" position="bottom">
          <van-datetime-picker
            type="date"
            :min-date="minDate"
            @confirm="onConfirmreceiveDate"
            @cancel="receiveDate.showPicker = false"
          />
        </van-popup>
        <van-field
          required
          is-link
          readonly
          clickable
          name="dealType"
          label="处理类别："
          :value="userData.dealType"
          placeholder="请选择"
          @click="dealType.showPicker = true"
          :rules="[{required: true, trigger: 'onChange', message: '处理类别不能为空'}]"
        />
        <van-popup v-model="dealType.showPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="dealType.columns"
            @confirm="onConfirmDealType"
            @cancel="dealType.showPicker = false"
          />
        </van-popup>
        <van-field
          required
          is-link
          readonly
          clickable
          name="hurryType"
          label="缓急程度："
          :value="userData.hurryType"
          placeholder="请选择"
          @click="hurryType.showPicker = true"
          :rules="[{required: true, trigger: 'onChange', message: '缓急程度不能为空'}]"
        />
        <van-popup v-model="hurryType.showPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="hurryType.columns"
            @confirm="onConfirmHurryType"
            @cancel="hurryType.showPicker = false"
          />
        </van-popup>
      </van-cell-group>
      <van-cell-group class="van-cell-group">
        <van-field
          required
          is-link
          readonly
          clickable
          name="secret"
          label="秘密等级："
          :value="userData.secret"
          placeholder="请选择"
          @click="secret.showPicker = true"
          :rules="[{required: true, trigger: 'onChange', message: '秘密等级不能为空'}]"
        />
        <van-popup v-model="secret.showPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="secret.columns"
            @confirm="onConfirmSecret"
            @cancel="secret.showPicker = false"
          />
        </van-popup>
        <van-field
          required
          is-link
          readonly
          clickable
          name="form"
          label="来文单位："
          :value="userData.from"
          placeholder="请选择"
          @click="from.showPicker = true"
          :rules="[{required: true, trigger: 'onChange', message: '来文单位不能为空'}]"
        />
        <van-popup v-model="from.showPicker" position="bottom">
          <van-picker show-toolbar :columns="from.columns" @cancel="from.showPicker = false" @confirm="onConfirmFrom" />
        </van-popup>
        <van-field
          required
          is-link
          readonly
          clickable
          name="fileDate"
          :value="userData.fileDate"
          label="文件日期："
          placeholder="请选择"
          @click="fileDate.showPicker = true"
          :rules="[{required: true, trigger: 'onChange', message: '文件日期不能为空'}]"
        />
        <van-popup v-model="fileDate.showPicker" position="bottom">
          <van-datetime-picker
            type="date"
            :min-date="minDate"
            @confirm="onConfirmFileDate"
            @cancel="fileDate.showPicker = false"
          />
        </van-popup>
        <van-field
          required
          v-model="userData.signPerson"
          name="signPerson"
          label="签发人："
          placeholder="请输入签发人"
          :rules="[{required: true, message: '签发人不能为空'}]"
        />
      </van-cell-group>
      <van-cell-group class="van-cell-group">
        <van-field
          required
          v-model="userData.articleCode"
          name="articleCode"
          label="来文字号："
          placeholder="请输入来文字号"
          :rules="[{required: true, message: '来文字号不能为空'}]"
        />
        <van-field
          required
          rows="1"
          autosize
          type="textarea"
          v-model="userData.articleTitle"
          name="articleTitle"
          label="文件标题："
          placeholder="请输入文件标题"
          :rules="[{required: true, message: '文件标题不能为空'}]"
        />
        <van-field
          rows="3"
          autosize
          type="textarea"
          v-model="userData.articleOther"
          name="articleOther"
          label="备注："
          placeholder="请输入备注"
        />
      </van-cell-group>
      <div class="van-uploader-group">
        <div class="van-uploader-title">文件上传</div>
        <div class="van-uploader-content">
          <van-field input-align="left" error-message-align="left" name="fileList" label="文件上传">
            <template #input>
              <van-uploader v-model="userData.fileList" accept="*" />
            </template>
          </van-field>
        </div>
      </div>
      <div class="van-button-group">
        <van-button type="info" native-type="submit">提交</van-button>
        <van-button class="vant-button-gray" native-type="reset" @click="onReset">重置</van-button>
      </div>
    </van-form>
  </demo-section>
</template>

<script>
import {parseTime} from '@/utils/index.js'
import {getFormData, submitFormData} from '@/api/receive-form.js'
export default {
  data() {
    return {
      receiveType: {
        showPicker: false,
        columns: ['公文', '其他']
      },
      receiveDate: {
        showPicker: false
      },
      dealType: {
        showPicker: false,
        columns: ['阅件', '批件']
      },
      hurryType: {
        showPicker: false,
        columns: ['紧急', '重要', '一般']
      },
      secret: {
        showPicker: false,
        columns: ['最高机密', '机密', '一般']
      },
      from: {
        showPicker: false,
        columns: ['环保局', '交通局', '卫生局']
      },
      fileDate: {
        showPicker: false
      },
      userData: {
        receiveType: '',
        receiveCode: '',
        receiveDate: '',
        dealType: '',
        hurryType: '',
        secret: '',
        from: '',
        fileDate: '',
        signPerson: '',
        articleCode: '',
        articleTitle: '',
        articleOther: '',
        fileList: []
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
    },
    onConfirmreceiveType(value) {
      this.userData.receiveType = value
      this.receiveType.showPicker = false
    },
    onConfirmreceiveDate(time) {
      this.userData.receiveDate = parseTime(time, '{y}-{m}-{d}')
      this.receiveDate.showPicker = false
    },
    onConfirmDealType(value) {
      this.userData.dealType = value
      this.dealType.showPicker = false
    },
    onConfirmHurryType(value) {
      this.userData.hurryType = value
      this.hurryType.showPicker = false
    },
    onConfirmSecret(value) {
      this.userData.secret = value
      this.secret.showPicker = false
    },
    onConfirmFrom(value) {
      this.userData.from = value
      this.from.showPicker = false
    },
    onConfirmFileDate(time) {
      this.userData.fileDate = parseTime(time, '{y}-{m}-{d}')
      this.fileDate.showPicker = false
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
        userData: {
          receiveType: '',
          receiveCode: '',
          receiveDate: '',
          dealType: '',
          hurryType: '',
          secret: '',
          from: '',
          fileDate: '',
          signPerson: '',
          articleCode: '',
          articleTitle: '',
          articleOther: '',
          fileList: []
        }
      }
      this.userData = defaultData.userData
      setTimeout(() => {
        this.$refs.vanForm.resetValidation()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.van-cell-group + .van-cell-group {
  margin-top: 16px;
}
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
.van-uploader-group {
  margin-top: 16px;
  background: #fff;
  .van-uploader-title {
    padding: 10px 16px;
  }
  /deep/ .van-field__label {
    display: none;
  }
}
</style>
