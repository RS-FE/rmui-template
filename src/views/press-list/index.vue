<template>
  <div class="rm-press">
    <scroller :on-infinite="infinite" :on-refresh="refresh" ref="my_scroller" style="top:60x;">
      <ul>
        <li class="rm-press-item" v-for="(item, index) in list" :key="index">
          <a href="javascript:;">
            <div class="rm-fl">
              <img src="@/assets/press-list/img.png" alt />
            </div>
            <div class="rm-fr">
              <p class="rm-text">{{ item.text }}</p>
            </div>
          </a>
        </li>
      </ul>
    </scroller>
  </div>
</template>

<script>
export default {
  data() {
    return {
      noData: '',
      list: [
        {
          text: '省科普作家协会组织慰问解放军凭匠心和爱心带领农民增收致富1'
        },
        {
          text: '省科普作家协会组织慰问解放军凭匠心和爱心带领农民增收致富2'
        },
        {
          text: '省科普作家协会组织慰问解放军凭匠心和爱心带领农民增收致富3'
        },
        {
          text: '省科普作家协会组织慰问解放军凭匠心和爱心带领农民增收致富4'
        }
      ]
    }
  },
  methods: {
    infinite(done) {
      //上拉加载
      console.log(this.noData)
      if (this.noData) {
        setTimeout(() => {
          this.$refs.my_scroller.finishInfinite(2)
        })
        return
      }
      let self = this
      let i = 1
      console.log(i)
      let arr = [
        {
          text: '省科普作家协会组织慰问解放军凭匠心和爱心带领农民增收致富5'
        },
        {
          text: '省科普作家协会组织慰问解放军凭匠心和爱心带领农民增收致富6'
        }
      ]
      for (let j = 0; j < arr.length; j++) {
        this.list.push(arr[j])
      }
      let start = this.list.length
      setTimeout(() => {
        for (var k = 0; k < 0; k++) {
          self.list.push(k)
        }
        i++
        console.log(start)
        // console.log(start / i)
        // if (start / i < 0) {
        //   self.noData = '没有更多数据'
        // }
        if (start == 8) {
          self.noData = '没有更多数据'
        }

        if (self.$refs.my_scroller) {
          self.$refs.my_scroller.resize()
        }

        done()
      }, 1500)
    },
    refresh: function() {
      //下拉刷新
      //   console.log('refresh')
      this.timeout = setTimeout(() => {
        //停止下拉刷新
        if (this.$refs.my_scroller) {
          this.$refs.my_scroller.finishPullToRefresh()
        }
      }, 1500)
    }
  }
}
</script>

<style lang="less" scoped>
.demo-nav {
  position: fixed;
  right: 0;
  left: 0;
  z-index: 1000;
}

.rm-press {
  position: absolute;
  box-sizing: border-box;
  top: 65px;
  width: 100%;
  min-height: 100vh;

  &-item {
    position: relative;
    box-sizing: border-box;
    padding: 10px 8px;
    background: #fff;
    border-bottom: 1px dashed #eeeeee;
    &:last-child {
      border-bottom: none;
    }
    & > a {
      display: flex;
      align-items: flex-start;
      height: 100%;
    }
    .rm-fl {
      width: 120px;
      height: 100px;
      & > img {
        width: 100%;
        height: 100%;
      }
    }
    .rm-fr {
      height: 100px;
      flex: 1;
      margin-left: 10px;
      .rm-text {
        position: relative;
        color: #666;
        font-size: 15px;
        line-height: 23px;
        white-space: normal;
      }
    }
  }
}
</style>
