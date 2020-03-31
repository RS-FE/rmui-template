# EmailList 邮件列表

## 基础用法

```js
export default {
  data() {
    return {
      meetingData: {
        govReq: '',
        govHost: '',
        place: '',
        time: '',
        date: '',
        theme: '',
        num: '',
        arrive: '',
        level: [],
        secrecy: false,
        decorate: [],
        equip: []
      }
    }
  }
}
```

## API

### Props

| 参数      | 说明         | 类型    |
| --------- | ------------ | ------- |
| emailData | 会议表单数据 | `Array` |

### emailData 数据结构

| 键名     | 说明     | 类型     |
| -------- | -------- | -------- |
| govReq   | 申请部门 | _string_ |
| govHost  | 主办部门 | _string_ |
| place    | 会议地点 | _string_ |
| time     | 会议时间 | _string_ |
| date     | 天数     | _Array_  |
| theme    | 会议主题 | _string_ |
| num      | 参会人数 | _string_ |
| arrive   | 到达时间 | _string_ |
| level    | 会议级别 | _string_ |
| secrecy  | 保密     | _string_ |
| decorate | 会场布置 | _Array_  |
| equip    | 会议设备 | _Array_  |
