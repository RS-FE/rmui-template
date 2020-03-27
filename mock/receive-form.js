import Mock from 'mockjs'

const formData = Mock.mock({
  'receiveType|1': ['公文', '其他'],
  'receiveCode|1': /^2020[A-HJ-Z]\d{8}$/,
  receiveDate: '@date',
  'dealType|1': ['阅件', '批件'],
  'hurryType|1': ['紧急', '重要', '一般'],
  'secret|1': ['最高机密', '机密', '一般'],
  'from|1': ['环保局', '交通局', '卫生局'],
  fileDate: '@date',
  signPerson: '@cname',
  articleCode: /^[A-Z]\d{2}$/,
  articleTitle: '@ctitle',
  articleOther: '@cparagraph',
  fileList: [
    {
      file: '@cname',
      status: 'success',
      content: 'xxx'
    }
  ]
})

export default [
  // 获取表单数据
  {
    url: '/rmui-template/receive-form/getFormData',
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
    url: '/rmui-template/receive-form/submitFormData',
    type: 'post',
    response: config => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
