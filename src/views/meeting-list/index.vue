<template>
  <div class="rs-content">
    <div class="order-wrapper">
      <div class="order-panel">
        <div class="order-header">
          <i class="icon-filter"></i>
          <span>筛选条件</span>
          <cite>（以便我们为您匹配最佳的会场）</cite>
        </div>
        <div class="order-body searchDiv">
          <van-row>
            <van-col span="12">
              <div class="input-label">日期：</div>
              <div class="input-block">
                <div class="select-wrap" @click="TimeShow = true">
                  <input type="text" :value="nowDate" readonly />
                  <i></i>
                </div>
              </div>
            </van-col>
            <van-col span="12">
              <div class="input-label">场次：</div>
              <div class="input-block">
                <div class="select-wrap" @click="SessionType.showPicker = true">
                  <input type="text" class="searchs" readonly :value="session" />
                  <i></i>
                </div>
              </div>
            </van-col>
          </van-row>
          <van-row>
            <van-col span="24">
              <div class="input-label">状态：</div>
              <div class="input-block">
                <van-radio-group v-model="radio" direction="horizontal">
                  <van-radio name="1">可预约</van-radio>
                  <van-radio name="2">所有</van-radio>
                </van-radio-group>
              </div>
            </van-col>
          </van-row>
        </div>
      </div>
      <div ref="mescroll" class="mescroll">
        <div>
          <div class="order-panel" v-for="(item, index) in newArr" :key="index">
            <div class="order-header">
              <i class="icon-place"></i>
              <span>{{ item.fileTitle }}</span>
            </div>
            <div class="order-body">
              <div class="order-preview">
                <img class="pic" src="@/assets/address-list/pic1.jpg" />
                <div class="tag-group">
                  <span v-if="item.fileSubleft">坐席{{ item.fileSubleft }}人</span>
                  <span v-if="item.fileFlag">{{ item.fileFlag }}</span>
                </div>
                <div class="btn-group">
                  <span class="btn-green">上午场</span>
                  <span class="btn-orange">已预约</span>
                  <span class="btn-green">晚间场</span>
                </div>
                <div
                  class="info-list"
                  v-if="
                    (item.amList != null && item.amList.length > 0) ||
                      (item.pmList != null && item.pmList.length > 0) ||
                      (item.nightList != null && item.nightList.length > 0)
                  "
                >
                  <div class="list-item">
                    <template v-if="item.amList != null && item.amList.length > 0">
                      <span class="time">上午场</span>
                      <span class="name">{{ item.amList[0].fileSubright }}</span>
                      <span class="title">{{ item.amList[0].fileTitle }}</span>
                    </template>
                    <template v-if="item.pmList != null && item.pmList.length > 0">
                      <span class="time">下午场</span>
                      <span class="name">{{ item.pmList[0].fileSubright }}</span>
                      <span class="title">{{ item.pmList[0].fileTitle }}</span>
                    </template>
                    <template v-if="item.nightList != null && item.nightList.length > 0">
                      <span class="time">晚间场</span>
                      <span class="name">{{ item.nightList[0].fileSubright }}</span>
                      <span class="title">{{ item.nightList[0].fileTitle }}</span>
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <van-popup v-model="SessionType.showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="SessionType.columns"
        @confirm="onConfirmSession"
        @cancel="SessionType.showPicker = false"
      />
    </van-popup>
    <!-- 日历 -->
    <van-calendar v-model="TimeShow" @confirm="onConfirm" :show-confirm="false" color="#3296fa" />
  </div>
</template>

<script>
// 引入mescroll.min.js和mescroll.min.css
import MeScroll from 'mescroll.js'
import 'mescroll.js/mescroll.min.css'
import {getMeetingList} from '@/api/meeting-list.js'
const topSrc = require('@/plugins/mescroll/mescroll-totop.png')

export default {
  data() {
    return {
      radio: '1',
      session: '全部', // 场次
      SessionType: {
        showPicker: false,
        columns: ['全部', '上午场', '下午场', '晚间场']
      },
      nowDate: null, // 当前日期
      TimeShow: false, //日历显示隐藏
      newArr: [] // 数据列表
    }
  },
  mounted() {
    this.init()
    // 获取今天日期
    this.getDate()

    // 创建MeScroll对象:为避免配置的id和父组件id重复,这里使用ref的方式初始化mescroll
    this.mescroll = new MeScroll(this.$refs.mescroll, {
      // 在mounted生命周期初始化mescroll,以确保您配置的dom元素能够被找到.
      down: {
        auto: false, // 是否在初始化完毕之后自动执行下拉回调callback; 默认true
        callback: this.downCallback // 下拉刷新的回调
      },
      up: {
        auto: true, // 是否在初始化时以上拉加载的方式自动加载第一页数据; 默认false
        callback: this.upCallback, // 上拉回调,此处可简写; 相当于 callback: function (page) { upCallback(page); }
        page: {
          num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
          size: 9 // 每页数据的数量
        },
        noMoreSize: 5, // 如果列表已无数据,可设置列表的总数量要大于等于5条才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
        toTop: {
          // 配置回到顶部按钮
          src: topSrc
        }
      }
    })
  },
  beforeRouteEnter(to, from, next) {
    // 如果没有配置回到顶部按钮或isBounce,则beforeRouteEnter不用写
    next(vm => {
      if (vm.mescroll) {
        // 恢复到之前设置的isBounce状态
        if (vm.mescroll.lastBounce != null) vm.mescroll.setBounce(vm.mescroll.lastBounce)
        // 滚动到之前列表的位置(注意:路由使用keep-alive才生效)
        if (vm.mescroll.lastScrollTop) {
          vm.mescroll.setScrollTop(vm.mescroll.lastScrollTop)
          setTimeout(() => {
            // 需延时,因为setScrollTop内部会触发onScroll,可能会渐显回到顶部按钮
            vm.mescroll.setTopBtnFadeDuration(0) // 设置回到顶部按钮显示时无渐显动画
          }, 16)
        }
      }
    })
  },
  beforeRouteLeave(to, from, next) {
    // 如果没有配置回到顶部按钮或isBounce,则beforeRouteLeave不用写
    if (this.mescroll) {
      this.mescroll.lastBounce = this.mescroll.optUp.isBounce // 记录当前是否禁止ios回弹
      this.mescroll.setBounce(true) // 允许bounce
      this.mescroll.lastScrollTop = this.mescroll.getScrollTop() // 记录当前滚动条的位置
      this.mescroll.hideTopBtn(0) // 隐藏回到顶部按钮,无渐隐动画
    }
    next()
  },
  methods: {
    init() {
      getMeetingList()
        .then(res => {
          this.data = res.data.items
        })
        .catch(() => {})
    },
    // 弹出日历选择时间
    onConfirm(date) {
      this.TimeShow = false

      this.nowDate = this.getDate(date)
    },
    getDate(date) {
      if (!date) {
        date = new Date()
      }
      let yy = date.getFullYear()
      let mm = date.getMonth() + 1
      if (mm < 10) mm = '0' + mm
      let dd = date.getDate()
      if (dd < 10) dd = '0' + dd
      return (this.nowDate = yy + '-' + mm + '-' + dd)
    },
    onConfirmSession(value) {
      this.session = value
      this.SessionType.showPicker = false
    },
    /* 下拉刷新的回调 */
    downCallback() {
      console.log('this.mescroll.version=' + this.mescroll.version)
      // 加载数据
      getMeetingList(0, 1)
        .then(res => {
          // 添加新数据到列表顶部
          this.newArr = res.data.items
          // 数据渲染成功后,隐藏下拉刷新的状态
          this.$nextTick(() => {
            this.mescroll.endSuccess() // 结束下拉刷新,无参
          })
        })
        .catch(() => {
          // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
          this.mescroll.endErr()
        })
    },
    // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
    upCallback(page) {
      console.log('上拉回调')
      // 联网加载数据
      getMeetingList({
        num: page.num, // 页码
        size: page.size // 每页长度
      })
        .then(res => {
          // console.log(res)
          // this.data = res.data.items
          // 添加列表数据
          this.newArr = this.newArr.concat(res.data.items)
          console.log(this.newArr)
          // 数据渲染成功后,隐藏下拉刷新的状态
          this.$nextTick(() => {
            this.mescroll.endSuccess(res.data.items.length)
          })
        })
        .catch(() => {
          // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
          this.mescroll.endErr()
        })
    }
  }
}
</script>

<style lang="less" scoped>
@color-1: #1989fa;
.rs-content {
  font-size: 14px;
}
.mescroll {
  position: fixed;
  top: 213px;
  bottom: 0;
  left: 8px;
  right: 8px;
  height: auto;
  width: auto;
}
.order-wrapper {
  padding: 8px;
  i,
  cite {
    font-style: normal;
  }
  .van-row {
    position: relative;
    padding: 6px 10px;
    font-size: 15px;
    &::before {
      content: '';
      height: 1px;
      position: absolute;
      left: 10px;
      right: 10px;
      bottom: 0;
      background: #f7f7f7;
    }
    &:last-child:before {
      display: none;
    }
    .input-label {
      padding-left: 10px;
      float: left;
      color: #666;
      text-align: right;
      line-height: 30px;
    }
    .input-block {
      height: 30px;
      display: flex;
      align-items: center;
      overflow: hidden;
      .van-radio__label {
        color: #666;
      }
    }
    .select-wrap {
      padding-right: 26px;
      position: relative;
      background: @color-1;
      border: 1px solid @color-1;
      height: 28px;
      box-sizing: content-box;
      border-radius: 2px;
      overflow: hidden;
      input {
        margin: 0;
        padding: 0 5px;
        height: 28px;
        line-height: 28px;
        width: 100%;
        font-size: 14px;
        color: #666666;
        border: none;
        outline: none;
        border-radius: 0;
        background: #fff;
        box-sizing: border-box;
      }
      i {
        margin-top: -4px;
        content: '';
        position: absolute;
        right: 6px;
        top: 50%;
        width: 14px;
        height: 8px;
        background: url(../../assets/meeting-list/icon-edge.png) no-repeat center;
        background-size: 100% 100%;
      }
    }
  }
  .order-panel {
    margin-bottom: 8px;
    padding-top: 8px;
    padding-bottom: 8px;
    background: #fff;
  }
  .order-header {
    padding-left: 30px;
    position: relative;
    height: 40px;
    line-height: 40px;
    cite {
      color: #999;
    }
    span {
      font-size: 17px;
      color: #333;
    }
    i {
      margin-top: -8px;
      position: absolute;
      left: 8px;
      top: 50%;
    }
    .icon-filter {
      width: 15px;
      height: 15px;
      background: url(../../assets/meeting-list/icon-filter.png) no-repeat center;
      background-size: 100% 100%;
    }
    .icon-place {
      width: 15px;
      height: 15px;
      background: url(../../assets/meeting-list/icon-place.png) no-repeat center;
      background-size: 100% 100%;
    }
  }
  .order-preview {
    padding: 0 20px;
    .pic {
      width: 100%;
      height: auto;
      border: 1px solid #f6f6f6;
      display: block;
    }
    .tag-group {
      margin-top: 5px;
      display: block;
      overflow: hidden;
      span {
        margin-right: 4px;
        margin-bottom: 2px;
        display: inline-block;
        padding: 0 8px;
        height: 24px;
        line-height: 26px;
        color: @color-1;
        background: #fff;
        border: 1px solid #bde4ff;
        border-radius: 2px;
        font-size: 12px;
      }
    }
    .btn-group {
      margin-top: 8px;
      color: #fff;
      span {
        margin-right: 4px;
        margin-bottom: 4px;
        height: 28px;
        line-height: 30px;
        padding: 0 12px;
        display: inline-block;
        border-radius: 2px;
      }
      .btn-green {
        background: #0bbf14;
      }
      .btn-orange {
        background: #f1b117;
      }
      .btn-green {
        background: #0bbf14;
      }
    }
    .info-list {
      margin-bottom: 6px;
      .list-item {
        height: 26px;
        line-height: 26px;
        color: #666;
        .time {
          float: left;
          margin-right: 12px;
        }
        .name {
          float: right;
          margin-left: 12px;
        }
        .title {
          display: block;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
