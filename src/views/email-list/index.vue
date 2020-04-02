<template>
  <div>
    <custom-nav />
    <van-form>
      <!-- 收件 -->
      <div v-show="tabbarActive != 4">
        <mescroll-vue ref="mescroll" :up="mescrollUp" @init="mescrollInit">
          <ul class="email-list">
            <van-checkbox-group v-model="checkboxArray" ref="checkboxGroup">
              <li
                class="email-li"
                v-for="(item, index) in emailData"
                :key="index"
                @click="
                  chooseSingle(item.id)
                  goDetail(item.id, $event)
                "
              >
                <van-checkbox v-if="operaMode" :name="item" :ref="item.id" class="checkSingle"></van-checkbox>
                <div v-if="!operaMode" class="email-img">
                  {{ item.name.split('')[0] }}
                </div>
                <div class="email-content" :class="{hasread: !item.hasread}">
                  <p class="email-msg">
                    <span class="email-sender">
                      <i v-if="item.hasread" class="reddot"></i>
                      {{ item.name }}
                      <img v-if="item.attach" src="@/assets/email-list/enclosure.png" class="attach" />
                    </span>
                    <span class="email-time">
                      <van-icon v-if="item.hascollected" color="#e7af03" name="star" class="email-collect" />
                      {{ item.time }}
                    </span>
                  </p>
                  <p class="email-text">
                    {{ item.text }}
                  </p>
                </div>
              </li>
            </van-checkbox-group>
          </ul>
        </mescroll-vue>
      </div>

      <!-- 搜索 -->
      <div v-if="tabbarActive == 4">
        <div class="search-bar">
          <van-search v-model="searchValue" show-action placeholder="请输入人名">
            <template #action>
              <div @click="onSearch">搜索</div>
            </template>
          </van-search>
          <van-tabs v-model="searchActive" color="#1492ff">
            <van-tab title="全部"></van-tab>
            <van-tab title="标题"></van-tab>
            <van-tab title="发件人"></van-tab>
            <van-tab title="附件"></van-tab>
          </van-tabs>
        </div>
        <ul class="email-list search-content">
          <van-checkbox-group v-model="checkboxArray" ref="checkboxGroup">
            <li
              class="email-li"
              v-for="(item, index) in searchData"
              :key="index"
              @click="
                chooseSingle(item.id)
                goDetail(item.id, $event)
              "
            >
              <van-checkbox v-if="operaMode" :name="item" :ref="item.id" class="checkSingle"></van-checkbox>
              <div v-if="!operaMode" class="email-img">
                {{ item.name.split('')[0] }}
              </div>
              <div class="email-content" :class="{hasread: !item.hasread}">
                <p class="email-msg">
                  <span class="email-sender">
                    <i v-if="item.hasread" class="reddot"></i>
                    {{ item.name }}
                    <img v-if="item.attach" src="@/assets/email-list/enclosure.png" class="attach" />
                  </span>
                  <span class="email-time">
                    <van-icon v-if="item.hascollected" color="#e7af03" name="star" class="email-collect" />
                    {{ item.time }}
                  </span>
                </p>
                <p class="email-text">
                  {{ item.text }}
                </p>
              </div>
            </li>
          </van-checkbox-group>
        </ul>
      </div>

      <!-- 底部 -->
      <van-tabbar v-if="operaMode" active-color="#7d7e80">
        <van-tabbar-item icon="passed" @click="chooseAll">全选</van-tabbar-item>
        <van-tabbar-item icon="eye-o" @click="readMark">标记已读</van-tabbar-item>
        <van-tabbar-item icon="closed-eye" @click="unreadMark">标记未读</van-tabbar-item>
        <van-tabbar-item icon="completed" @click="collect">收藏</van-tabbar-item>
        <van-tabbar-item icon="failure" @click="uncollect">取消收藏</van-tabbar-item>
        <van-tabbar-item icon="close" @click="remove">删除</van-tabbar-item>
      </van-tabbar>
      <van-tabbar v-if="!operaMode" v-model="tabbarActive" inactive-color="#333" @change="tabbarChange">
        <van-tabbar-item>
          <span>收件</span>
          <template #icon="props">
            <img class="tabbar_img" :src="props.active ? tabbarImg.receive.active : tabbarImg.receive.inactive" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item>
          <span>收藏</span>
          <template #icon="props">
            <img class="tabbar_img" :src="props.active ? tabbarImg.collect.active : tabbarImg.collect.inactive" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item>
          <img class="toNewEmail" src="@/assets/email-list/add.png" />
        </van-tabbar-item>
        <van-tabbar-item>
          <span>发件</span>
          <template #icon="props">
            <img class="tabbar_img" :src="props.active ? tabbarImg.send.active : tabbarImg.send.inactive" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item>
          <span>搜索</span>
          <template #icon="props">
            <img class="tabbar_img" :src="props.active ? tabbarImg.search.active : tabbarImg.search.inactive" />
          </template>
        </van-tabbar-item>
      </van-tabbar>
    </van-form>
  </div>
</template>

<script>
import customNav from './custom-nav.vue'
import {getData} from '@/api/email-list.js'
import MescrollVue from 'mescroll.js/mescroll.vue'
export default {
  name: 'email-list',
  components: {
    customNav,
    MescrollVue
  },
  data() {
    return {
      initData: [],
      emailData: [],
      searchData: [],
      searchActive: 0,
      tabbarActive: 0,
      tabbarImg: {
        receive: {
          active: require('@/assets/email-list/receive-active.png'),
          inactive: require('@/assets/email-list/receive.png')
        },
        collect: {
          active: require('@/assets/email-list/collect-active.png'),
          inactive: require('@/assets/email-list/collect.png')
        },
        send: {
          active: require('@/assets/email-list/send-active.png'),
          inactive: require('@/assets/email-list/send.png')
        },
        search: {
          active: require('@/assets/email-list/search-active.png'),
          inactive: require('@/assets/email-list/search.png')
        }
      },
      searchValue: '',
      mescroll: null,
      mescrollUp: {
        callback: this.upCallback,
        page: {
          num: 0,
          size: 10
        },
        htmlNodata: '<p class="upwarp-nodata">-- 没有更多数据 --</p>',
        noMoreSize: 5
      }
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
      getData()
        .then(res => {
          console.log(res)
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
        this.searchData = searchArr
      } else {
        this.searchData = this.initData
      }
    },
    tabbarChange(index) {
      this.mescroll.lockDownScroll(true)
      this.mescroll.lockUpScroll(true)
      if (index == 0) {
        this.emailData = this.initData
        this.mescroll.lockDownScroll(false)
        this.mescroll.lockUpScroll(false)
      } else if (index == 1) {
        var collect_arr = []
        for (var i = 0; i < this.initData.length; i++) {
          if (this.initData[i].hascollected == true) {
            collect_arr.push(this.initData[i])
          }
        }
        this.emailData = collect_arr
      } else if (index == 3) {
        var send_arr = []
        this.emailData = send_arr
      } else if (index == 4) {
        this.tabbarActive = 4
        this.searchData = []
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
    },
    mescrollInit(mescroll) {
      this.mescroll = mescroll
    },
    upCallback(page, mescroll) {
      console.log(this.tabbarActive)
      if (this.tabbarActive == 0) {
        this.getMoreData(page.num, page.size, arr => {
          if (page.num === 1) this.emailData = []
          this.emailData = this.emailData.concat(arr)
          this.$nextTick(() => {
            mescroll.endSuccess(arr.length)
          })
        })
      }
    },
    getMoreData(pageNum, pageSize, successCallback) {
      setTimeout(() => {
        var listData = []
        for (var i = (pageNum - 1) * pageSize; i < pageNum * pageSize; i++) {
          if (i === this.initData.length) break
          listData.push(this.initData[i])
        }
        successCallback(listData)
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
@import './index.less';

.mescroll {
  position: fixed;
  top: 56px;
  bottom: 50px;
  height: auto;
}
.demo-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
</style>
