<template>
  <div class="rs-content">
    <van-sticky>
      <!-- 列表上面时间 -->
      <div class="rs-top-select">
        <div class="rs-select-time" @click="TimeShow = true">
          <van-icon name="calender-o" size="18" color="#3296fa" />
          <span>选择</span>
        </div>
        <div class="rs-tab">
          <span :class="{on: tabindex == i}" v-for="(data, i) in dateTime" :key="i" @click="togtime(data, i)">{{
            data.time
          }}</span>
        </div>
      </div>
    </van-sticky>
    <ul class="rs-meetingroom-list">
      <li v-for="(liitem, lii) in data" :key="lii">
        <van-image class="rs-image" width="48" height="48" src="https://img.yzcdn.cn/vant/cat.jpeg" />
        <van-button class="rs-reserve-btn" color="#3296fa" plain>可预订</van-button>
        <div class="rs-media-body">
          <div class="rs-tit">{{ liitem.roomname }}</div>
          <div class="rs-tip">
            <p>坐席{{ liitem.capacity }}人</p>
            <p>会议室地点{{ liitem.location }}</p>
          </div>
          <div class="rs-keyword">
            <van-button color="#fbb441" plain v-for="(bu, bui) in liitem.tool" :key="bui">{{ bu }}</van-button>
          </div>
        </div>
        <!-- 已顶会议室信息 -->
        <div class="rs-media-bottom" v-if="liitem.ReserveData[0]">
          <p v-for="(item, i) in liitem.ReserveData" :key="i">
            <span>{{ item.StartTime }}-{{ item.EndTime }}</span>
            <span>{{ item.name }}</span>
            <span class="rs-text van-ellipsis">{{ item.text }}</span>
          </p>
        </div>
        <!-- 每天时间点 -->
        <div class="rs-dayinfo-box" v-show="liitem.dayInfoShow">
          <!-- 日期选择 -->
          <div class="rs-top-select">
            <div class="rs-select-time" @click="TimeShow = true">
              <span>选择日期</span>
            </div>
            <div class="rs-tab">
              <span :class="{on: i == 0}" v-for="(data, i) in dateTime" :key="i" :time="data.time">{{
                data.text
              }}</span>
            </div>
          </div>
          <div class="rs-time">
            <div
              class="rs-item"
              v-for="(item, i) in timeData"
              :key="i"
              :class="{no: item.isReserve}"
              @click="onReserve(item, $event)"
            >
              <div>{{ item.time }}</div>
              <div class="rs-chunk">
                <van-icon name="certificate" />
              </div>
            </div>
          </div>
          <p class="rs-tip">点击方块预订,每个方块60分钟</p>
        </div>
        <!-- 更多图标 -->
        <div class="rs-showMore" @click="onShowMore(liitem, lii)">
          <van-icon name="arrow-up" v-if="liitem.dayInfoShow" class="rs-icon" />
          <van-icon name="arrow-down" v-if="!liitem.dayInfoShow" class="rs-icon" />
        </div>
      </li>
    </ul>
    <!-- 日历 -->
    <van-calendar v-model="TimeShow" @confirm="onConfirm" :show-confirm="false" color="#3296fa" />
  </div>
</template>

<script>
import {getmeetingList} from '@/api/meeting-list.js'
export default {
  data() {
    return {
      tabindex: 0,
      time: new Date(),
      dateTime: [], // 今天、明天、后天日期
      timeData: [
        {time: '08:00'},
        {time: '09:00'},
        {time: '10:00'},
        {time: '11:00'},
        {time: '12:00'},
        {time: '13:00'},
        {time: '14:00'},
        {time: '15:00'},
        {time: '16:00'},
        {time: '17:00'},
        {time: '18:00'},
        {time: '19:00'},
        {time: '20:00'},
        {time: '21:00'},
        {time: '22:00'}
      ],
      TimeShow: false, //日历显示隐藏
      data: [] //数据
    }
  },
  mounted() {
    this.init()
    // 获取设置今天、明天、后天日期
    this.formatDate()
  },
  methods: {
    init() {
      getmeetingList()
        .then(res => {
          this.setdata(res)
        })
        .catch(() => {})
    },
    // 数据处理
    setdata(res) {
      this.data = res.data.items
      // 查询数据哪些时间点已预订
      for (var i = 0; i < this.timeData.length; i++) {
        for (var j = 0; j < this.data.length; j++) {
          for (var k = 0; k < this.data[j].ReserveData.length; k++) {
            var item = this.data[j].ReserveData[k]
            if (this.timeData[i].time == item.StartTime || this.timeData[i].time == item.EndTime) {
              // 时间块已预约
              this.timeData[i].isReserve = true
            }
          }
          // 数据添加属性  默认隐藏时间块
          this.data[j].dayInfoShow = false
        }
      }
    },
    togtime(time, i) {
      this.tabindex = i
      this.init({time: this.time})
    },
    // 点击切换时间块隐藏显示
    onShowMore(val, index) {
      val.dayInfoShow = !val.dayInfoShow
      var itemdata = val
      this.$set(this.data, index, itemdata)
    },
    // 弹出日历选择时间
    onConfirm(date) {
      this.TimeShow = false
      // 获取设置今天、明天、后天日期
      this.formatDate(date)
    },
    //点击时间块
    onReserve(val) {
      if (val.isReserve) {
        this.$toast.fail('已预订')
      } else {
        this.$toast(val.time)
      }
    },
    // 设置今天、明天、后天日期
    formatDate(date) {
      if (!date) {
        date = new Date()
      }
      //今天的时间
      var day1 = date
      day1.setTime(day1.getTime())
      var s1 = day1.getMonth() + 1 + '月' + day1.getDate() + '日'

      //明天的时间
      var day2 = date
      day2.setTime(day2.getTime() + 24 * 60 * 60 * 1000)
      var s2 = day2.getMonth() + 1 + '月' + day2.getDate() + '日'
      //后天的时间
      var day3 = date
      day3.setTime(day3.getTime() + 24 * 60 * 60 * 1000)
      var s3 = day3.getMonth() + 1 + '月' + day3.getDate() + '日'

      this.dateTime = [
        {
          time: s1,
          text: '今天'
        },
        {
          time: s2,
          text: '明天'
        },
        {
          time: s3,
          text: '后天'
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.rs-content {
  font-size: 14px;
  background-color: #fff;
}
.rs-top-select {
  padding: 8px 10px 0;
  line-height: 30px;
  border-bottom: 1px solid #e6e6e6;
  overflow: hidden;
  background-color: #fff;
  .rs-select-time {
    float: right;
    display: block;
    * {
      vertical-align: middle;
    }
  }
  .rs-tab {
    color: #666;
    span {
      display: inline-block;
      margin-right: 10px;
      &.on {
        color: #3296fa;
      }
    }
  }
}
.rs-meetingroom-list {
  li {
    padding: 8px 12px;
    position: relative;
    &::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 1px;
      background-color: #e6e6e6;
    }
    &:last-child::after {
      display: none;
    }
  }
  .rs-image {
    margin-right: 10px;
    float: left;
  }
  .rs-reserve-btn {
    position: absolute;
    top: 40px;
    right: 10px;
    height: 28px;
    line-height: 26px;
    padding: 0 10px;
  }
  .rs-media-body {
    overflow: hidden;
    line-height: 20px;
    .rs-tit {
      font-size: 16px;
    }
    .rs-tip {
      color: #666;
      margin-bottom: 5px;
      font-size: 12px;
    }
    .rs-keyword {
      button {
        margin-right: 2px;
        height: 22px;
        line-height: 20px;
        padding: 0 4px;
        font-size: 12px;
      }
    }
    p {
      margin: 0;
    }
  }
  .rs-media-bottom {
    margin-top: 0.5rem;
    padding: 2px 6px;
    background-color: #f3f6f9;
    p {
      line-height: 20px;
      margin: 0;
      color: #333333;
      span {
        float: left;
        margin-right: 6px;
      }
      .rs-text {
        float: none;
        display: block;
      }
    }
  }
  .rs-dayinfo-box {
    margin-top: 10px;
    background-color: #f4f9fd;
    color: #666;
    .rs-top-select {
      padding: 4px 10px 0;
      line-height: 22px;
    }
    .rs-time {
      padding: 4px 0;
      .rs-item {
        width: 20%;
        padding: 0 12px;
        display: inline-block;
        color: #333;
        vertical-align: middle;
        box-sizing: border-box;
        text-align: center;
        .rs-chunk {
          display: block;
          width: 100%;
          height: 22px;
          background-color: #fff;
          border: 1px solid #e5e5e5;
          .van-icon {
            display: none;
          }
        }
        &.on {
          .rs-chunk {
            background-color: #3296fa;
            border-color: #3296fa;
          }
        }
        &.no {
          .rs-chunk {
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #eeeeee;
            font-size: 16px;
            .van-icon {
              display: block;
              color: #cecbcb;
            }
          }
        }
      }
    }
    .rs-tip {
      margin: 0;
      padding: 0 12px;
      font-size: 12px;
    }
  }
  .rs-showMore {
    text-align: center;
    .rs-icon {
      padding: 2px;
      margin-top: 10px;
      border: 1px solid #666;
      color: #666;
      border-radius: 50%;
      font-size: 12px;
    }
  }
}
</style>
