<template>
  <div class="content">
    <div ref="mescroll" class="mescroll">
      <div>
        <div v-for="(item, i) in newArr" :key="`box${i}`">
          <!-- 时间 -->
          <div class="rs-card-time">
            <span>{{ item.time }}</span>
          </div>
          <div class="rs-card-box" v-for="(k, ki) in item.data" :key="`card${ki}`">
            <div class="rs-card-left">
              <img class="rs-image" src="../../assets/msg-list/icon-1.png" alt v-if="k.type == 1" />
              <van-icon name="location-o" class="rs-icon" v-else />
            </div>
            <!-- type1 -->
            <div class="rs-card-body" v-if="k.type == 1">
              <div class="rs-body-header">{{ k.title }}</div>
              <div class="rs-body-content">
                <div class="rs-title rs-tit3">{{ k.title }}</div>
                <div class="rs-info">
                  <p>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：{{ k.name }}</p>
                  <p class="van-ellipsis">内容：{{ k.content }}</p>
                  <p>时&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;间：{{ k.time }}</p>
                </div>
              </div>
            </div>
            <!-- type1-->
            <!-- type2 -->
            <div class="rs-card-body" v-if="k.type == 2">
              <div class="rs-body-header">{{ k.time }}</div>
              <div class="rs-body-content">
                <div class="rs-title">{{ k.time }}外勤打卡成功</div>
                <div class="rs-time">
                  <p>{{ k.time2 }}</p>
                </div>
                <div class="rs-content">
                  <p>班次时间：{{ k.time3 }}下班</p>
                  <p>打卡地点：{{ k.site }}</p>
                </div>
                <div class="rs-btn">
                  <router-link to class="rs-link">查看详情</router-link>
                  <router-link to class="rs-link">汇报工作</router-link>
                </div>
              </div>
            </div>
            <!-- type2 -->
            <!-- type3 -->
            <div class="rs-card-body" v-if="k.type == 3">
              <div class="rs-body-header">{{ k.title }}</div>
              <div class="rs-body-content">
                <div class="rs-title rs-tit2">{{ k.title }}</div>
                <div class="rs-content">
                  <p>
                    {{ k.name }}，已为你生成{{ k.month }}月份考勤报告，共有{{ k.anomaly }}次考勤异常，记得尽快处理哦!
                  </p>
                </div>
                <div class="rs-info">
                  <router-link to>
                    <p>查看详情&gt;&gt;</p>
                  </router-link>
                </div>
              </div>
            </div>
            <!-- type3 -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入mescroll.min.js和mescroll.min.css
import MeScroll from 'mescroll.js'
import 'mescroll.js/mescroll.min.css'
import {getMsgList} from '@/api/msg-list.js'
const topSrc = require('@/plugins/mescroll/mescroll-totop.png')

export default {
  data() {
    return {
      newArr: [], // 数据列表
      mescroll: null // mescroll实例对象
    }
  },
  mounted() {
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
          size: 2 // 每页数据的数量
        },
        // noMoreSize: 5, // 如果列表已无数据,可设置列表的总数量要大于等于5条才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
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
    // init() {
    //   getMsgList()
    //     .then(res => {
    //       // console.log(res)
    //       this.data = res.data.items
    //     })
    //     .catch(() => {})
    // },
    /* 下拉刷新的回调 */
    downCallback() {
      console.log('this.mescroll.version=' + this.mescroll.version)
      // 加载数据
      getMsgList(0, 1)
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
    upCallback() {
      console.log('上拉回调')
      // 联网加载数据
      getMsgList()
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
.mescroll {
  position: fixed;
  top: 55px;
  bottom: 0;
  height: auto;
}
.rs-card-time {
  padding: 10px 0;
  font-size: 12px;
  text-align: center;
  span {
    display: inline-block;
    padding: 2px 10px;
    color: #666;
    border-radius: 10px;
    background-color: #f7f8f9;
  }
}
.rs-card-box {
  padding-bottom: 8px;
  margin-bottom: 10px;
  .rs-card-left {
    padding: 10px;
    width: 40px;
    float: left;
    .rs-image {
      width: 100%;
      height: 100%;
      display: block;
    }
    .rs-icon {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 20px;
      color: #fff;
      background-color: #65a7e4;
      font-size: 22px;
    }
  }
  .rs-card-body {
    margin-right: 50px;
    overflow: hidden;
    .rs-body-header {
      margin-bottom: 4px;
      color: #666;
    }
    .rs-body-content {
      padding: 10px 8px;
      line-height: 18px;
      background-color: #fff;
      box-shadow: 0 0 10px #ebedf0;
      border-radius: 10px;
      .rs-title {
        margin-bottom: 4px;
        font-size: 16px;
        color: #000;
        font-weight: bold;
        &.rs-tit2 {
          color: #65a7e4;
          font-weight: 400;
        }
        &.rs-tit3 {
          color: red;
          font-weight: 400;
        }
      }
      .rs-info {
        p {
          color: #999;
        }
      }
      .rs-time {
        margin-bottom: 4px;
        color: #999;
        font-size: 12px;
      }
      .rs-content {
        p {
          margin-bottom: 2px;
        }
      }
      .rs-btn {
        margin-bottom: -10px;
        margin-top: 10px;
        display: flex;
        border-top: 1px solid #e2e3e5;
        .rs-link {
          position: relative;
          height: 34px;
          line-height: 34px;
          text-align: center;
          color: #3b87f6;
          flex: 1;
          &::after {
            position: absolute;
            right: 0;
            top: 10px;
            width: 1px;
            height: 14px;
            content: '';
            background-color: #e2e3e5;
          }
          &:last-child::after {
            display: none;
          }
        }
      }
    }
  }
  p {
    margin: 0;
  }
}
</style>
