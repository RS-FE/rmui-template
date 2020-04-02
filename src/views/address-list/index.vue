<template>
  <div class="rs-tree">
    <div class="rs-AddressList">
      <v-search-tree ref="tree" :data="treeData" v-model="initSelected" :multiple="true" />
      <!-- 按钮 -->
      <div class="rs-foot-btn">
        <van-button color="#529eff" @click="onconfirm">确认</van-button>
        <van-button color="#ccc">取消</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import {getAddressList} from '@/api/address-list.js'
export default {
  data() {
    return {
      initSelected: [], //
      treeData: [], //树数据
      selectedData: [], //已选数据  已选 + 半选
      listData: [] //已选数据  已选
    }
  },
  //通过两个钩子函数来添加移除class改变颜色
  beforeCreate: function() {
    document.querySelector('body').style.backgroundColor = '#fff'
  },
  beforeDestroy: function() {
    document.querySelector('body').style.backgroundColor = ''
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      getAddressList()
        .then(res => {
          this.treeData = res.data.items
          this.setData(this.treeData)
        })
        .catch(() => {})
    },
    setData(data) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].children) {
          this.$set(data[i], 'isParent', true)
        } else {
          this.$set(data[i], 'isParent', false)
        }
        if (data[i].children != '' && data[i].children != null) {
          this.setData(data[i].children)
        }
      }
    },
    // 确定
    onconfirm() {
      this.selectedData = this.$refs.tree.selectedItems
      console.log(this.selectedData)
    }
  }
}
</script>
<style lang="less">
.rs-foot-btn {
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 2020;
  .van-button {
    height: 45px;
    padding: 0 20px;
  }
}
</style>
