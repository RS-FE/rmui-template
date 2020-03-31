<template>
  <div>
    <custom-nav />
    <van-form>
      <form action="/">
        <van-search v-model="searchValue" show-action placeholder="请输入人名">
          <template #action>
            <div @click="onSearch">搜索</div>
          </template>
        </van-search>
      </form>
      <ul class="email-list">
        <van-checkbox-group v-model="checkboxArray" ref="checkboxGroup">
          <li
            class="email-li"
            v-for="item in emailData"
            :key="item.id"
            @click="
              chooseSingle(item.id)
              goDetail(item.id, $event)
            "
          >
            <van-checkbox v-if="operaMode" :name="item" :ref="item.id" class="checkSingle"></van-checkbox>
            <div class="email-img">
              <!-- {{ item.name.split('')[0] }} -->
              <img v-if="item.hasread" src="@/assets/email-list/notread.png" alt="" />
              <img v-else src="@/assets/email-list/hasread.png" alt="" />
            </div>
            <div class="email-content">
              <p class="email-msg">
                <span class="email-sender">
                  <i v-if="item.hasread" class="reddot"></i>
                  {{ item.name }}
                </span>
                <span class="email-time">
                  <van-icon v-if="item.hascollected" color="#e7af03" name="star" class="email-collect" />
                  {{ item.time }}
                </span>
              </p>
              <p class="email-intro">
                <span class="email-text">{{ item.content }}</span>
                <img v-if="item.attach" src="@/assets/email-list/enclosure.png" alt="" class="email-enclosure" />
              </p>
              <p class="email-reply">
                {{ item.reply }}
              </p>
            </div>
          </li>
        </van-checkbox-group>
      </ul>
      <van-tabbar v-if="operaMode" active-color="#7d7e80">
        <van-tabbar-item icon="passed" @click="chooseAll">全选</van-tabbar-item>
        <van-tabbar-item icon="eye-o" @click="readMark">标记已读</van-tabbar-item>
        <van-tabbar-item icon="closed-eye" @click="unreadMark">标记未读</van-tabbar-item>
        <van-tabbar-item icon="completed" @click="collect">收藏</van-tabbar-item>
        <van-tabbar-item icon="failure" @click="uncollect">取消收藏</van-tabbar-item>
        <van-tabbar-item icon="close" @click="remove">删除</van-tabbar-item>
      </van-tabbar>
    </van-form>
  </div>
</template>

<script>
import customNav from './custom-nav.vue'
import {getEmailList} from '@/api/email-list.js'
export default {
  name: 'email-list',
  components: {
    customNav
  },
  data() {
    return {
      initData: [],
      emailData: [],
      searchValue: ''
    }
  },
  computed: {
    checkboxArray: {
      get() {
        return this.$store.state.emailList.checkboxArray
      },
      set(val) {
        this.$store.state.emailList.checkboxArray = val
      }
    },
    operaMode: {
      get() {
        return this.$store.state.emailList.operaMode
      },
      set(val) {
        this.$store.state.emailList.operaMode = val
      }
    }
  },
  mounted() {
    this.init()
    this.operaMode = false
  },
  methods: {
    init() {
      getEmailList()
        .then(res => {console.log(res)
          this.initData = res.data.emailData
          this.emailData = res.data.emailData
        })
        .catch(() => {})
    },
    goDetail(itemId, e) {
      if (this.operaMode == false) {
        console.log(itemId, e.currentTarget)
      }
    },
    onSearch() {
      this.checkboxArray = []
      if (this.searchValue) {
        var searchArr = []
        for (var i = 0; i < this.initData.length; i++) {
          if (this.initData[i].name.indexOf(this.searchValue) >= 0) {
            searchArr.push(this.initData[i])
          }
        }
        this.emailData = searchArr
      } else {
        this.emailData = this.initData
      }
    },
    chooseSingle(itemId) {
      if (this.operaMode == true) {
        this.$refs[itemId][0].toggle()
      }
    },
    chooseAll() {
      if (this.checkboxArray.length == this.emailData.length) {
        this.$refs.checkboxGroup.toggleAll()
      } else {
        this.$refs.checkboxGroup.toggleAll(true)
      }
    },
    readMark() {
      var emailData = this.emailData
      var checkboxArray = this.checkboxArray
      for (var i = 0; i < emailData.length; i++) {
        for (var j = 0; j < checkboxArray.length; j++) {
          if (checkboxArray[j].id == emailData[i].id) {
            emailData[i].hasread = false
          }
        }
      }
      this.emailData = emailData
    },
    unreadMark() {
      var emailData = this.emailData
      var checkboxArray = this.checkboxArray
      for (var i = 0; i < emailData.length; i++) {
        for (var j = 0; j < checkboxArray.length; j++) {
          if (checkboxArray[j].id == emailData[i].id) {
            emailData[i].hasread = true
          }
        }
      }
      this.emailData = emailData
    },
    collect() {
      var emailData = this.emailData
      var checkboxArray = this.checkboxArray
      for (var i = 0; i < emailData.length; i++) {
        for (var j = 0; j < checkboxArray.length; j++) {
          if (checkboxArray[j].id == emailData[i].id) {
            emailData[i].hascollected = true
          }
        }
      }
      this.emailData = emailData
    },
    uncollect() {
      var emailData = this.emailData
      var checkboxArray = this.checkboxArray
      for (var i = 0; i < emailData.length; i++) {
        for (var j = 0; j < checkboxArray.length; j++) {
          if (checkboxArray[j].id == emailData[i].id) {
            emailData[i].hascollected = false
          }
        }
      }
      this.emailData = emailData
    },
    remove() {
      var initData = this.initData
      var emailData = this.emailData
      var checkboxArray = this.checkboxArray
      var arr = [...emailData].filter(x => [...checkboxArray].every(y => y.id !== x.id))
      var arr2 = [...initData].filter(x => [...checkboxArray].every(y => y.id !== x.id))
      this.emailData = arr
      this.initData = arr2
    }
  }
}
</script>

<style lang="less">
@import './index.less';
</style>
