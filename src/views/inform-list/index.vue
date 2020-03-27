<template>
  <div class="rm-infrom-wrapper" @click="lose($event)">
    <div class="rm-banner">
      <img src="@/assets/inform-list/inform.png" alt />
    </div>
    <!-- 搜索 -->
    <div class="rm-serch">
      <van-field v-model="value" ref="my" class="rm-serch-input" @click.stop="input($event)" />
      <div class="rm-placeholder" @click.stop="placeholder($event)">
        <i class="rm-serch-icon"></i>
        <span>请输入用户名</span>
      </div>
    </div>
    <!-- 数据列表 -->
    <div class="rm-data">
      <ul>
        <li v-for="(good, index) in goods" class="rm-data-item" :index="index" :key="index">
          <a href="javascript:;">
            <p class="rm-title">{{ good.text }}</p>
            <div class="rm-date">
              <div class="rm-date-time">
                <img src="@/assets/inform-list/time.png" alt />
                <span>{{ good.date }}</span>
              </div>
              <div class="rm-date-eaey">
                <img src="@/assets/inform-list/eaey.png" alt />
                <span>{{ good.num }}</span>
              </div>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '',
      goods: [
        {
          text: '中央组织部党员教育中心主任李博一行来调研1',
          date: '2020-3-17',
          num: '1002'
        },
        {
          text: '中央组织部党员教育中心主任李博一行来调研2',
          date: '2020-3-18',
          num: '1002'
        },
        {
          text: '中央组织部党员教育中心主任李博一行来调研3',
          date: '2020-3-18',
          num: '1002'
        }
      ]
    }
  },
  methods: {
    placeholder($event) {
      let theNode = $event.currentTarget
      //获取兄弟节点
      // let brother = theNode.parentNode.children[0]
      //获取焦点
      this.$refs.my.focus()
      theNode.style.display = 'none'
    },
    input($event) {
      let theNode = $event.currentTarget
      //获取兄弟节点
      let brother = theNode.parentNode.children[1]
      brother.style.display = 'none'
    },
    lose($event) {
      let theNode = $event.currentTarget
      //console.log(theNode) //获取当前元素
      //获取兄弟节点
      let brother1 = theNode.children[1].children[1]
      let brother2 = theNode.children[1].children[0].children[0].children[0].children[0]

      let val = brother2.value.trim()
      console.log(val)
      if (val == '') {
        brother1.style.display = 'flex'
        //获取焦点
        this.$refs.my.blur()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.rm-infrom-wrapper {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
  background: #f4f8ff;
  .rm-banner {
    margin: 0 15px;
    img {
      width: 100%;
      height: 160px;
      vertical-align: middle;
    }
  }

  .rm-serch {
    position: relative;
    margin: 15px 15px;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 0 2px 0 #ebf2ff;
    box-sizing: border-box;
    padding: 10px;
    overflow: hidden;
    &-input {
      border: 1px solid #e0e3ea;
      border-radius: 5px;
      padding: 5px 15px;
    }
    .rm-placeholder {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 100%;
      height: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      color: #999;
      .rm-serch-icon {
        width: 15px;
        height: 15px;
        margin-right: 12px;
        background: url('../../assets/inform-list/serch.png') no-repeat center;
        background-size: 100% 100%;
      }
    }
  }
  .rm-data {
    position: relative;
    margin: 15px 15px;
    &-item {
      width: 100%;
      min-height: 67.5px;
      margin-bottom: 15px;
      background: #fff;
      border-radius: 5px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      padding: 7.5px 7.5px;
      & > a {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        color: #030303;
      }
      .rm-title {
        position: relative;
        width: 90%;
        font-size: 15px;
        line-height: 23px;
        padding-left: 10px;
        color: #030303;
        font-weight: bold;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        &:before {
          display: block;
          content: '';
          position: absolute;
          top: 50%;
          margin-top: -2px;
          left: 0;
          width: 4px;
          height: 4px;
          border-radius: 100%;
          background: #6198fb;
        }
      }
      .rm-date {
        margin-top: 5px;
        display: flex;
        align-items: center;
        &-time {
          display: flex;
          align-items: center;
          img {
            width: 13px;
            height: 13px;
            margin-right: 5px;
          }

          span {
            font-size: 13px;
            color: #6a6a6a;
            vertical-align: middle;
            font-weight: 500;
          }
        }
        &-eaey {
          display: flex;
          align-items: center;
          margin-left: 100px;
          img {
            width: 16.5px;
            height: 13px;
            margin-right: 5px;
          }
          span {
            font-size: 13px;
            color: #6a6a6a;
            vertical-align: middle;
            font-weight: 500;
          }
        }
      }
    }
  }
}
</style>
