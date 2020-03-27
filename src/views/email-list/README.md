# emailList 邮件列表

## 基础用法

```html
<emailList :emailData="emailData"></emailList>
```

```js
export default {
  data() {
    return {
      emailData: [
        {
          id: '1',
          name: '黄祥',
          time: '3月22日 11:11',
          content: '邮件内容1',
          hasread: 'true',
          hascollected: 'false'
        },
        {
          id: '2',
          name: '郑芳',
          time: '3月22日 11:12',
          content: '邮件内容2邮件内容2邮件内容2',
          hasread: 'true',
          hascollected: 'false'
        },
        {
          id: '3',
          name: '谭肖',
          time: '3月22日 11:13',
          content: '邮件内容3邮件内容3邮件内容3邮件内容3邮件内容3',
          hasread: 'true',
          hascollected: 'false'
        }
      ]
    }
  }
}
```

## API

### Props

| 参数      | 说明     | 类型    |
| --------- | -------- | ------- |
| emailData | 菜单选项 | `Array` |

### emailData 数据结构

| 键名         | 说明     | 类型      |
| ------------ | -------- | --------- |
| id           | 唯一标识 | _string_  |
| name         | 发送人名 | _string_  |
| time         | 发送时间 | _string_  |
| content      | 发送内容 | _string_  |
| hasread      | 是否已读 | _boolean_ |
| hascollected | 是否收藏 | _boolean_ |