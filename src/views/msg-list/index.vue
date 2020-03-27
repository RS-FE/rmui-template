<template>
  <div class="content">
    <!-- 时间 -->
    <div v-for="(item, i) in data" :key="`box${i}`">
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
              <p>发证单位：姓名</p>
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
              <p>{{ k.name }}，已为你生成{{ k.month }}月份考勤报告，共有{{ k.anomaly }}次考勤异常，记得尽快处理哦!</p>
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
</template>

<script>
import {getMsgList} from '@/api/msg-list.js'
export default {
  data() {
    return {data: []}
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      getMsgList()
        .then(res => {
          // console.log(res)
          this.data = res.data.items
        })
        .catch(() => {})
    }
  }
}
</script>
<style lang="less" scoped>
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
    padding: 10px 6px;
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
