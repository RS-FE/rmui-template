import Mock from 'mockjs'

const formData = Mock.mock({
  username: '@cname',
  licenseType: '身份证',
  licenseCode: /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/,
  phone: /^1[3-9]\d{9}$/,
  isSick: '是',
  isDanger: '否',
  date: '@date',
  'area|1': ['辽宁省沈阳市和平区', '湖北省武汉市江夏区', '湖北省武汉市洪山区'],
  trafficType: ['airplane', 'bus'],
  airplane: /^[A-Z\d]{2}\d{3,4}$/,
  bus: /^(?:[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-HJ-NP-Z]{1}(?:(?:[0-9]{5}[DF])|(?:[DF](?:[A-HJ-NP-Z0-9])[0-9]{4})))|(?:[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9 挂学警港澳]{1})$/
})

export default [
  // 获取表单数据
  {
    url: '/rmui-template/normal-form/getFormData',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: formData
      }
    }
  },
  // 提交表单数据
  {
    url: '/rmui-template/normal-form/submitFormData',
    type: 'post',
    response: config => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
