<template>
  <!-- 内容 -->
  <div class="rs-content">
    <van-sticky>
      <!-- 顶部时间选择 -->
      <van-row class="rs-top-btn">
        <van-col span="7">
          <van-button block color="#38acff" @click="onTogtime('-')">上一周</van-button>
        </van-col>
        <van-col span="10" class="rs-tima-select">
          <van-button icon="calender-o" color="#34a5f5" type="primary" @click="calendarshow = true">
            {{ timaDay }}
            <van-icon name="arrow-down" class="rs-down-icon" />
          </van-button>
        </van-col>
        <van-col span="7">
          <van-button block color="#38acff" @click="onTogtime('+')">下一周</van-button>
        </van-col>
      </van-row>
    </van-sticky>
    <div class="rs-MeetingRoom">
      <table>
        <thead>
          <tr>
            <th>会议室名称</th>
            <th>时间</th>
            <td v-for="(item, itemi) in timeData" :key="`time${itemi}`">
              <span>{{ item.week }}</span>
              <i>{{ item.day }}</i>
            </td>
          </tr>
        </thead>
        <tbody>
          <template v-for="(tditem, index) in data">
            <tr :key="`1${index}`">
              <th rowspan="2">{{ tditem.roomname }}</th>
              <th>上午</th>
              <td v-for="(dom, i) in timeData" :key="i" @click="onReserve(dom, tditem, '0')">
                <template v-for="(item, ikey) in tditem.ReserveData">
                  <van-icon
                    name="flag-o"
                    size="20"
                    v-if="
                      dom.time.year == item.day.year &&
                        dom.time.month == item.day.month &&
                        dom.time.day == item.day.day &&
                        item.time == 0
                    "
                    :key="`icon1${ikey}`"
                  />
                </template>
              </td>
            </tr>
            <tr :key="`2${index}`">
              <th>下午</th>
              <td v-for="(dom, i) in timeData" :key="i" @click="onReserve(dom, tditem, '1')">
                <template v-for="(item, ikey) in tditem.ReserveData">
                  <van-icon
                    name="flag-o"
                    size="20"
                    v-if="
                      dom.time.year == item.day.year &&
                        dom.time.month == item.day.month &&
                        dom.time.day == item.day.day &&
                        item.time == 1
                    "
                    :key="`icon2${ikey}`"
                  />
                </template>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <!-- 日期选择 -->
    <van-popup v-model="calendarshow" position="bottom">
      <van-datetime-picker v-model="currentDate" type="date" @confirm="onConfirm" @cancel="cancel" />
    </van-popup>
  </div>
</template>
<script>
import {getMeetiongList} from '@/api/meeting-list.js'
export default {
  data() {
    return {
      timaDay: null, //时间
      currentDate: new Date(), //开始标准时间
      calendarshow: false, //日历显示隐藏
      timeData: [], //星期
      //假数据
      data: [],
      currentFirstDate: null
    }
  },
  mounted() {
    this.init()
    // 获取当前周
    this.setDate()
    // 获取今天
    var day = new Date()
    day.setTime(day.getTime())
    this.timaDay = day.getFullYear() + '-' + (day.getMonth() + 1) + '-' + day.getDate()
  },
  methods: {
    init() {
      getMeetiongList()
        .then(res => {
          this.data = res.data.items
        })
        .catch(() => {})
    },
    // 时间点击确定
    onConfirm() {
      this.calendarshow = false
      this.timaDay = `${this.currentDate.getFullYear()}-${this.currentDate.getMonth() +
        1}-${this.currentDate.getDate()}`

      this.setDate(new Date(this.currentDate))
    },
    // 时间点击取消
    cancel() {
      this.calendarshow = false
    },
    formatDate(date) {
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var day = date.getDate()
      var week = ['日', '一', '二', '三', '四', '五', '六'][date.getDay()]

      return {
        time: {
          year: year,
          month: month,
          day: day
        },
        day: month + '/' + day,
        week: week
      }
    },
    addDate(date, n) {
      date.setDate(date.getDate() + n)
      return date
    },
    setDate(date) {
      if (!date) {
        date = new Date()
      }
      var week = date.getDay() - 1
      date = this.addDate(date, week * -1)

      this.currentFirstDate = new Date(date)

      for (var i = 0; i < 7; i++) {
        var time = this.formatDate(i == 0 ? this.addDate(date, 0) : this.addDate(date, 1))

        this.$set(this.timeData, i, {
          time: time['time'],
          day: time['day'],
          week: time['week']
        })
      }
    },
    // 上一周 下一周
    onTogtime(type) {
      // 上一周
      if (type == '-') {
        this.setDate(this.addDate(new Date(this.currentFirstDate), -7))
      } else {
        this.setDate(this.addDate(new Date(this.currentFirstDate), 7))
      }
      let time = new Date(this.currentFirstDate)
      this.timaDay = `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`
    },
    onReserve(val, data, type) {
      // console.log(val);
      // console.log(data);
      for (var i = 0; i < data.ReserveData.length; i++) {
        var item = data.ReserveData[i]
        var isTimeTrue =
          val.time.year == item.day.year &&
          val.time.month == item.day.month &&
          val.time.day == item.day.day &&
          type == item.time

        if (isTimeTrue) {
          if (item.time == 0) {
            this.$toast(data.roomname + val.day + '星期' + val.week + '上午')
          } else if (item.time == 1) {
            this.$toast(data.roomname + val.day + '星期' + val.week + '下午')
          }
          break
        } else {
          this.$toast('未预约')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.rs-content {
  background-color: #fff;
}
.rs-top-btn {
  background-color: #38acff;
  color: #fff;
  padding: 4px 0;
  .rs-tima-select {
    .rs-down-icon {
      vertical-align: -2px;
    }
  }
  .van-button {
    height: 32px;
    line-height: 32px;
  }
}
.rs-MeetingRoom {
  padding: 6px;
  table {
    width: 100%;
    border-spacing: 0;
    border-collapse: collapse;
    td,
    th {
      border: 1px solid #cccccc;
      text-align: center;
      font-weight: 400;
      color: #333333;
    }
    thead {
      tr {
        background: linear-gradient(#f9f9fa, #f3f6f8);
      }
      td {
        width: 10%;
        height: 10px;
        i {
          display: block;
          font-size: 12px;
          color: #484848;
          font-style: normal;
        }
      }
    }
    tbody {
      th {
        background: #fbfbfb;
      }
      td {
        height: 36px;
        color: #ff0000;
        .van-icon {
          vertical-align: middle;
        }
      }
    }
  }
}
</style>
