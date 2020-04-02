<template>
  <div class="rm-inform">
    <div class="rm-tabs">
      <a
        href="javascript:;"
        class="rm-tabs-item"
        data-num="1"
        :class="active == 1 ? 'active' : ''"
        @click="change($event)"
      >
        <i class="iconfont">&#xe616;</i> 我的接收
      </a>
      <a
        href="javascript:;"
        class="rm-tabs-item"
        data-num="2"
        :class="active == 2 ? 'active' : ''"
        @click="change($event)"
      >
        <i class="iconfont">&#xe602;</i>我的发送
      </a>
    </div>
    <!--内容区域-->
    <div class="rm-contents">
      <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <div class="rm-contents-group" :class="active == 1 ? 'active' : ''">
          <a href="javascript:;" class="rm-item" v-for="(item, index) in dataList" :key="index">
            <div class="rm-item-date">
              <p>{{ item.time1 }}</p>
              <p>{{ item.time2 }}</p>
            </div>
            <div class="rm-item-text">
              <div class="rm-text-one">
                <label>{{ item.label1 }}</label>
                <span>{{ item.labelText1 }}</span>
              </div>
              <div class="rm-text-two">
                <label>{{ item.label2 }}</label>
                <span>{{ item.labelText2 }}</span>
              </div>
              <div class="rm-text-three">
                <label>{{ item.label3 }}</label>
                <span>{{ item.labelText3 }}</span>
              </div>
            </div>
            <div class="rm-flag" :class="item.class">{{ item.flag }}</div>
          </a>
        </div>
        <div class="rm-contents-group" :class="active == 2 ? 'active' : ''">
          <a href="javascript:;" class="rm-item" v-for="(item, index) in dataList1" :key="index">
            <div class="rm-item-date">
              <p>{{ item.time1 }}</p>
              <p>{{ item.time2 }}</p>
            </div>
            <div class="rm-item-text">
              <div class="rm-text-one">
                <label>{{ item.label1 }}</label>
                <span>{{ item.labelText1 }}</span>
              </div>
              <div class="rm-text-two">
                <label>{{ item.label2 }}</label>
                <span>{{ item.labelText2 }}</span>
              </div>
              <div class="rm-text-three">
                <label>{{ item.label3 }}</label>
                <span>{{ item.labelText3 }}</span>
              </div>
            </div>
            <div class="rm-flag" :class="item.class">{{ item.flag }}</div>
          </a>
        </div>
      </mescroll-vue>
    </div>
  </div>
</template>

<script>
// 引入mescroll的vue组件
import MescrollVue from 'mescroll.js/mescroll.vue'
import {getWaitList} from '@/api/inform-list.js'
export default {
  components: {
    MescrollVue // 注册mescroll组件
  },
  data() {
    return {
      active: 1,
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
    init() {
      //获取mock数据
      getWaitList({
        num: 0, // 页码
        size: 3 // 每页长度
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
.rm-inform {
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
  }
  &-item.active {
    color: #55a8e6;
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
.rm-contents {
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  bottom: 0;
  &-group {
    display: none;
  }
  &-group.active {
    display: block;
  }
  .rm-item {
    position: relative;
    display: flex;
    align-items: center;
    padding: 10px 14px;
    background: #fff;
    margin-bottom: 10px;
  }
  .rm-item-date {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    color: #f6ab4a;
    border: 1px solid #f6ab4a;
    border-radius: 50%;
    margin-right: 10px;
  }
  .rm-item-text {
    flex: 0.8;
    & > div {
      line-height: 20px;
      display: flex;
      align-items: center;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    & > div + div {
      margin-top: 5px;
    }
  }
  .rm-text-one {
    font-size: 16px;
    color: #000;
  }
  .rm-text-two {
    font-size: 14px;
    color: #989898;
  }
  .rm-text-three {
    font-size: 14px;
    color: #989898;
  }

  .rm-flag {
    position: absolute;
    top: 10px;
    right: 14px;
    line-height: 20px;
    padding: 0 5px;
    font-size: 14px;
    color: #fff;
    border-radius: 3px;
  }
  .rm-gray {
    background: #d9d9d9;
  }
  .rm-blue {
    background: #4eb0fd;
  }
}
</style>
