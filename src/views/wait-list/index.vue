<template>
  <div class="rm-wait-wrapper">
    <div class="rm-tabs">
      <a
        href="javascript:;"
        class="rm-tabs-item"
        data-num="1"
        :class="index == 1 ? 'active' : ''"
        @click="change($event)"
        >待处理</a
      >
      <a
        href="javascript:;"
        class="rm-tabs-item"
        data-num="2"
        :class="index == 2 ? 'active' : ''"
        @click="change($event)"
        >已处理</a
      >
    </div>
    <!-- 数据框 -->
    <div class="rm-contents">
      <div class="rm-contents-item" :class="index == 1 ? 'active' : ''">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh($event)">
          <!-- 数据列表 -->
          <ul class="rm-data">
            <li v-for="(item, index) in ready1" :index1="index" :key="index">
              <p class="rm-text">{{ item.text }}</p>
              <div class="rm-person-time">
                <div class="rm-person">
                  <img src="@/assets/wait-list/icon-person.png" alt />
                  <span>{{ item.name }}</span>
                </div>
                <div class="rm-time">
                  <img src="@/assets/wait-list/icon-date.png" alt />
                  <span>{{ item.date }}</span>
                </div>
              </div>
              <span class="rm-circle"></span>
            </li>
          </ul>
        </van-pull-refresh>
      </div>
      <div class="rm-contents-item" :class="index == 2 ? 'active' : ''">
        <ul class="rm-data">
          <li v-for="(item, index) in ready2" :index2="index" :key="index">
            <p class="rm-text">{{ item.text }}</p>
            <div class="rm-person-time">
              <div class="rm-person">
                <img src="@/assets/wait-list/icon-person.png" alt />
                <span>{{ item.name }}</span>
              </div>
              <div class="rm-time">
                <img src="@/assets/wait-list/icon-date.png" alt />
                <span>{{ item.date }}</span>
              </div>
            </div>
            <span class="rm-circle"></span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {Toast} from 'vant'
export default {
  data() {
    return {
      index: 1,
      isLoading: false,
      ready1: [
        {
          text: '办公：测试党建要闻',
          name: '张三',
          date: '2019年7月29'
        },
        {
          text: '办公：测试党建要闻',
          name: '张三',
          date: '2019年7月29'
        }
      ],
      ready2: [
        {
          text: '办公：测试党建要闻2',
          name: '张三',
          date: '2019年7月29'
        },
        {
          text: '办公：测试党建要闻',
          name: '张三2',
          date: '2019年7月29'
        }
      ]
    }
  },
  methods: {
    change(e) {
      //获取当前对象
      let theNode = e.target
      //获取当前自定义属性
      let num = theNode.getAttribute('data-num')
      if (num == 1) {
        this.index = 1
      } else {
        this.index = 2
      }
    },
    onRefresh() {
      let arr1 = [
        {
          text: '办公：测试党建要闻',
          name: '张三3',
          date: '2019年7月29'
        },
        {
          text: '办公：测试党建要闻',
          name: '张三',
          date: '2019年7月29'
        }
      ]
      setTimeout(() => {
        Toast('刷新成功')
        this.isLoading = false
        for (let i = 0; i < arr1.length; i++) {
          this.ready1.push(arr1[i])
        }
      }, 1000)
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
.rm-wait-wrapper {
  position: relative;
  box-sizing: border-box;
  padding-top: 56px;
  width: 100%;
  height: auto;
  background: #f4f8ff;
  .rm-tabs {
    position: fixed;
    display: flex;
    top: 56px;
    left: 0;
    right: 0;
    align-items: center;
    justify-content: space-around;
    z-index: 1000;
    height: 43px;
    background: #fff;
    a.rm-tabs-item {
      position: relative;
      line-height: 43px;
      font-size: 14px;
      color: #787777;
      padding: 0 20px;
      cursor: pointer;
    }
    a.rm-tabs-item.active {
      color: #3296fa !important;
      &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: #58b9fe;
      }
    }
  }
  .rm-contents {
    position: relative;
    margin: 0 15px;
    &-item {
      display: none;
      position: absolute;
      // top: 55px;
      height: auto;
      left: 0;
      right: 0;
    }
    &-item.active {
      display: block;
    }
    .rm-data {
      position: relative;
      box-sizing: border-box;
      background: #fff;
      & > li {
        position: relative;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        padding: 10px 10px 10px 20px;
        .rm-text {
          width: 100%;
          font-size: 13px;
          line-height: 14px;
          color: #070707;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .rm-circle {
          position: absolute;
          z-index: 10;
          top: 12px;
          left: 6px;
          width: 7px;
          height: 7px;
          background: #fff;
          border-radius: 50%;
          border: 1px solid #56a9fb;
        }
        .rm-person-time {
          display: flex;
          justify-content: space-between;
          color: #787777;
          margin-top: 7.5px;
          font-size: 13px;
          line-height: 14px;
          .rm-person img {
            width: 10.5px;
            height: 11px;
            margin-right: 5px;
          }
          .rm-time img {
            width: 10.5px;
            height: 10.5px;
            margin-right: 5px;
          }
        }
      }
      & > li:last-child:after {
        content: '';
        position: absolute;
        z-index: 99;
        bottom: 0;
        top: 45px;
        left: 10px;
        width: 2px;
        background: #fff;
      }
      &:after {
        content: '';
        position: absolute;
        bottom: 0;
        top: 16px;
        left: 10px;
        width: 1px;
        background: #e5e5e5;
      }
    }
  }
}
</style>
