<template>
  <div class="rm-wait">
    <div class="rm-tabs">
      <a
        href="javascript:;"
        class="rm-tabs-item"
        data-num="1"
        :class="active == 1 ? 'active' : ''"
        @click="change($event)"
      >
        <i class="iconfont">&#xe616;</i> 待办事项
        <!-- <span class="rm-num">7</span> -->
      </a>
      <a
        href="javascript:;"
        class="rm-tabs-item"
        data-num="2"
        :class="active == 2 ? 'active' : ''"
        @click="change($event)"
      >
        <i class="iconfont">&#xe602;</i>已办理
        <!-- <span class="rm-num">10</span> -->
      </a>
    </div>
    <!-- 搜索 -->
    <div class="rm-search">
      <van-search v-model="value" show-action placeholder="请输入搜索关键词" @search="onSearch">
        <template #action>
          <div @click="onSearch" class="rm-search-btn">搜索</div>
        </template>
      </van-search>
    </div>
    <!-- 内容区域 -->
    <div class="rm-contents">
      <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <div class="rm-contents-group" :class="active == 1 ? 'active' : ''">
          <a href="javascript:;" class="rm-item" v-for="(item, index) in dataList" :key="index">
            <div class="rm-item-eassy">
              <span class="rm-eassy-falg">{{ item.approve }}</span>
              <span class="rm-eassy-text">{{ item.text }}</span>
            </div>
            <div class="rm-item-info">
              <span class="rm-info-name">
                <label>来源:</label>
                <span>{{ item.site }}</span>
              </span>
              <span class="rm-info-time">{{ item.date }}</span>
            </div>
          </a>
        </div>
        <div class="rm-contents-group" :class="active == 2 ? 'active' : ''">
          <a href="javascript:;" class="rm-item" v-for="(item, index) in dataList1" :key="index">
            <div class="rm-item-eassy">
              <span class="rm-eassy-falg">{{ item.approve }}</span>
              <span class="rm-eassy-text">{{ item.text }}</span>
            </div>
            <div class="rm-item-info">
              <span class="rm-info-name">
                <label>来源:</label>
                <span>{{ item.site }}</span>
              </span>
              <span class="rm-info-time">{{ item.date }}</span>
            </div>
          </a>
        </div>
      </mescroll-vue>
    </div>
  </div>
</template>

<script>
// 引入mescroll的vue组件
import MescrollVue from 'mescroll.js/mescroll.vue'
import {getWaitList} from '@/api/wait-list.js'
export default {
  components: {
    MescrollVue // 注册mescroll组件
  },
  data() {
    return {
      active: 1,
      value: '',
      mescroll: null, // mescroll实例对象
      mescrollDown: {}, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则mescrollDown可不用写了)
      mescrollUp: {
        // 上拉加载的配置.
        callback: this.upCallback, // 上拉回调,此处简写; 相当于 callback: function(page, mescroll) { }
        //以下是一些常用的配置,当然不写也可以的.
        page: {
          num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
          size: 3 //每页数据条数,默认10
        },
        htmlNodata: '<p class="upwarp-nodata">没有更多数据</p>',
        noMoreSize: 0, //如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据;
        // 避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
        // 这就是为什么无更多数据有时候不显示的原因
        toTop: {
          //回到顶部按钮
          //src: './static/mescroll/mescroll-totop.png', //图片路径,默认null,支持网络图
          offset: 1000 //列表滚动1000px才显示回到顶部按钮
        },
        empty: {
          //列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
          warpId: 'xxid', //父布局的id (1.3.5版本支持传入dom元素)
          //icon: './static/mescroll/mescroll-empty.png', //图标,默认null,支持网络图
          tip: '暂无相关数据~' //提示
        }
      },
      dataList: [],
      dataList1: []
    }
  },
  mounted() {
    this.init() //实例被挂载后调用--数据
  },
  methods: {
    change(e) {
      //获取当前对象
      let theNode = e.target
      //获取当前自定义属性
      let num = theNode.getAttribute('data-num')
      if (num == 1) {
        this.active = 1
      } else {
        this.active = 2
      }
    },
    onSearch(val) {
      console.log(val)
    },
    init() {
      //获取mock数据
      getWaitList({
        num: 0, // 页码
        size: 10 // 每页长度
      })
        .then(res => {
          console.log(res)
          this.dataList = res.data.item1
          this.dataList1 = res.data.item2
        })
        .catch(() => {
          //请求失败处理
          console.log('获取数据失败')
        })
    },
    // mescroll组件初始化的回调,可获取到mescroll对象
    mescrollInit(mescroll) {
      this.mescroll = mescroll // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
    },
    // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
    upCallback(page, mescroll) {
      // console.log(page)
      // console.log(mescroll)
      let flag = this.active
      // console.log(flag)
      if (flag == 1) {
        // 联网请求
        getWaitList({
          num: page.num, // 页码
          size: page.size // 每页长度
        })
          .then(response => {
            // 请求的列表数据
            let arr = response.data.item1
            // 如果是第一页需手动置空列表
            if (page.num === 1) this.dataList = []
            // 把请求到的数据添加到列表
            this.dataList = this.dataList.concat(arr)
            // 数据渲染成功后,隐藏下拉刷新的状态
            this.$nextTick(() => {
              mescroll.endSuccess(arr.length)
            })
          })
          .catch(e => {
            // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
            console.log(e)
            mescroll.endErr()
          })
      } else if (flag == 2) {
        // 联网请求
        getWaitList({
          num: page.num, // 页码
          size: page.size // 每页长度
        })
          .then(response => {
            // 请求的列表数据
            let arr = response.data.item2
            // 如果是第一页需手动置空列表
            if (page.num === 1) this.dataList1 = []
            // 把请求到的数据添加到列表
            this.dataList1 = this.dataList1.concat(arr)
            // 数据渲染成功后,隐藏下拉刷新的状态
            this.$nextTick(() => {
              mescroll.endSuccess(arr.length)
            })
          })
          .catch(e => {
            // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
            console.log(e)
            mescroll.endErr()
          })
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../style/iconfont/iconfont.css';
.rm-wait {
  position: absolute;
  box-sizing: border-box;
  top: 56px;
  left: 0;
  right: 0;
  bottom: 0;
}
.rm-tabs {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 45px;
  left: 0;
  right: 0;
  top: 56px;
  z-index: 99;
  background: #fff;
  &-item {
    position: relative;
    display: flex;
    align-items: center;
    font-size: 14px;
    line-height: 45px;
    color: #bababa;
    padding: 0 20px;
    .iconfont {
      display: inline-block;
      font-size: 16px;
      margin-right: 6px;
    }
    .rm-num {
      position: absolute;
      display: none;
      top: 5px;
      right: 5px;
      font-size: 12px;
      color: #fff;
      width: 15px;
      height: 15px;
      line-height: 20px;
      text-align: center;
      border-radius: 50%;
      background: #ff3836;
    }
  }
  &-item.active {
    color: #55a8e6;
    .rm-num {
      display: block;
    }
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: #55a8e6;
    }
  }
}
.rm-search {
  position: absolute;
  z-index: 99;
  top: 45px;
  left: 0;
  right: 0;
  .van-search__action {
    background: #3295fa;
    color: #fff;
    margin-right: 12px;
  }
}
.rm-contents {
  position: absolute;
  top: 105px;
  left: 0;
  right: 0;
  bottom: 0;
  &-group {
    display: none;
    margin: 0 10px;
  }
  &-group.active {
    display: block;
  }
  .rm-item {
    position: relative;
    display: block;
    box-sizing: border-box;
    padding: 10px 14px;
    background: #fff;
    margin-bottom: 10px;
    &-eassy {
      position: relative;
      display: block;
      min-height: 60px;
      padding-bottom: 10px;
      border-bottom: 1px solid #eeeeee;
      .rm-eassy-falg {
        position: absolute;
        display: inline-block;
        font-size: 16px;
        height: 27px;
        line-height: 27px;
        padding: 0 8px;
        color: #35b896;
        border: 1px solid #35b896;
        border-radius: 5px;
        vertical-align: middle;
      }
      .rm-eassy-text {
        display: inline-block;
        font-size: 16px;
        font-weight: 500;
        text-indent: 95px;
        line-height: 30px;
        color: #000;
        vertical-align: middle;
      }
    }

    .rm-item-info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 40px;
      font-size: 14px;
      color: #929196;
      .rm-info-name {
        flex: 0.9;
      }
    }
  }
}
</style>
