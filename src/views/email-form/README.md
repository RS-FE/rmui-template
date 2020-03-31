# EmailList 邮件列表

## 基础用法

```js
export default {
  data() {
    return {
      emailData: {
        receiver: '',
        sender: '',
        title: '',
        text: '',
        enclosure: [{}]
      }
    }
  }
}
```

## API

### Props

| 参数      | 说明         | 类型     |
| --------- | ------------ | -------- |
| emailData | 邮件表单数据 | `Object` |

### emailData 数据结构

| 键名      | 说明     | 类型     |
| --------- | -------- | -------- |
| receiver  | 收件人   | _string_ |
| sender    | 发件人   | _string_ |
| title     | 邮件标题 | _string_ |
| text      | 发送内容 | _string_ |
| enclosure | 附件内容 | _Array_  |
