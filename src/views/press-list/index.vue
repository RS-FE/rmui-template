<template>
  <div class="rm-press">
    <div class="rm-press-data">
      <!--mescroll滚动区域的基本结构-->
      <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <ul>
          <li class="rm-press-item" v-for="(item, index) in dataList" :index="index" :key="index">
            <a href="javascript:;">
              <div class="rm-way">
                <p class="rm-title">{{ item.title }}</p>
                <img :src="item.img" alt="" />
              </div>
              <div class="rm-source">
                <p class="rm-source-name">
                  {{ item.source }}
                </p>
                <p class="rm-time">
                  <span>{{ item.time }}</span>
                </p>
              </div>
            </a>
          </li>
        </ul>
      </mescroll-vue>
    </div>
  </div>
</template>

<script>
// 引入mescroll的vue组件
import MescrollVue from 'mescroll.js/mescroll.vue'
import {getPressList} from '@/api/press-list.js'
export default {
  components: {
    MescrollVue // 注册mescroll组件
  },
  data() {
    return {
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
        htmlNodata: '<p class="upwarp-nodata">-- END --</p>',
        noMoreSize: 10, //如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据;
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
      dataList: []
    }
  },
  mounted() {
    this.init() //实例被挂载后调用--数据
  },
  methods: {
    init() {
      //获取mock数据
      getPressList({
        num: 0, // 页码
        size: 10 // 每页长度
      })
        .then(res => {
          console.log(res)
          this.dataList = res.data.items
        })
        .catch(() => {
          //请求失败处理
          // this.$toast.fail('获取数据失败')
        })
    },
    // mescroll组件初始化的回调,可获取到mescroll对象
    mescrollInit(mescroll) {
      this.mescroll = mescroll // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
    },
    // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
    upCallback(page, mescroll) {
      console.log(page)
      console.log(mescroll)
      // 联网请求
      getPressList({
        num: page.num, // 页码
        size: page.size // 每页长度
      })
        .then(response => {
          // 请求的列表数据
          let arr = response.data.items
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
    }
  }
}
</script>

<style lang="less" scoped>
.rm-press {
  position: absolute;
  box-sizing: border-box;
  top: 56px;
  left: 0;
  right: 0;
  bottom: 0;
  &-data {
    position: absolute;
    top: 2px;
    left: 0;
    right: 0;
    bottom: 0;
    & > ul {
      position: relative;
      height: auto;
    }
  }
  &-item {
    position: relative;
    background: #fff;
    & > a {
      display: block;
      box-sizing: border-box;
      padding: 15px 15px;
      height: 100%;
      border-bottom: 1px solid #eeeeee;
    }
    .rm-way {
      display: flex;
      justify-content: space-between;
      .rm-title {
        flex: 0.9;
        color: #000;
        line-height: 25px;
        font-size: 16px;
        font-weight: 400;
      }
      & > img {
        width: 117px;
        height: 73px;
      }
    }
    .rm-source {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
      .rm-source-name {
        line-height: 20px;
        font-size: 14px;
        color: #a8a8a8;
      }
      .rm-time {
        display: flex;
        align-items: center;
        line-height: 20px;
        font-size: 14px;
        color: #a8a8a8;
        .iconfont {
          font-size: 20px;
        }
      }
    }
  }
}
</style>
