<template>
  <div class="rs-tree">
    <div class="rs-AddressList">
      <!-- 搜索 -->
      <van-search
        v-model="searchword"
        show-action
        placeholder="请输入搜索关键词"
        background="#f4f4f6"
        @search="onSearch"
      >
        <div slot="action">
          <van-button color="#3296fa" @click="onSearch">搜索</van-button>
          <van-button color="#3296fa">全选</van-button>
        </div>
      </van-search>
      <v-tree
        class="rs-ztree"
        ref="tree"
        :data="treeData"
        :multiple="true"
        :tpl="tpl"
        :halfcheck="true"
        @node-click="onselect"
        @node-check="onselect"
      />
    </div>
    <!-- 底部已选按钮 -->
    <div class="rs-selected-list">
      <!-- 展开弹出已选列表按钮 -->
      <div class="rs-selected-btn" @click="showPopup">已选择:{{ unitNum }}个单位，{{ userNum }}个人</div>
      <!-- 按钮 -->
      <div class="rs-foot-btn">
        <van-button color="#529eff" @click="onconfirm">确认</van-button>
        <van-button color="#ccc">取消</van-button>
      </div>
    </div>
    <!-- 已选择列表   -->
    <van-popup v-model="isshowPopup" position="bottom" :style="{height: '70%'}">
      <div class="rs-bar">
        <van-checkbox v-model="Allchecked" shape="square" class="list_checkAll">取消全选</van-checkbox>
        <div class="rs-show-num">已选择：{{ unitNum }}个单位，{{ userNum }}个人</div>
      </div>
      <ul class="rs-list">
        <li data-id v-for="(k, i) in selectedData" :key="i" v-show="k.checked">
          <van-checkbox v-model="k.checked" shape="square">
            <i class="rs-icon" :class="{'rs-icon-user': !k.children}"></i>
            <span class="rs-text">{{ k.title }}</span>
          </van-checkbox>
          <van-icon name="cross" class="rs-cancer" />
        </li>
      </ul>
    </van-popup>
  </div>
</template>
<script>
import {getAddressList} from '@/api/address-list.js'
export default {
  data() {
    return {
      checked: true,
      isshowPopup: false,
      Allchecked: true,
      searchword: '',
      treeData: [],
      selectedData: [],
      unitNum: 0,
      userNum: 0
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
        })
        .catch(() => {})
    },
    onSearch() {
      this.$refs.tree.searchNodes(this.searchword)
    },
    // tpl (node, ctx, parent, index, props) {
    tpl(...args) {
      let {0: node, 2: parent, 3: index} = args
      let titleClass = node.selected ? 'node-title node-selected' : 'node-title'
      let iconClass = node.children ? 'node-icon' : 'node-icon node-user'
      if (node.searched) titleClass += ' node-searched'
      // console.log(args)
      // console.log(node.title)
      console.log(parent)
      console.log(index)
      return (
        <span class={iconClass}>
          <i></i>
          <span
            class={titleClass}
            domPropsInnerHTML={node.title}
            onClick={() => {
              this.$refs.tree.nodeSelected(node)
            }}></span>
        </span>
      )
    },
    async asyncLoad(node) {
      const {checked = false} = node
      this.$set(node, 'loading', true)
      console.log(node)
      let pro = await new Promise(resolve => {
        setTimeout(resolve, 2000, [{title: 'test1', async: true}, {title: 'test2', async: true}, {title: 'test3'}])
      })
      if (!Object.prototype.hasOwnProperty.call(node, 'children')) {
        this.$set(node, 'children', [])
      }
      node.children.push(...pro)
      this.$set(node, 'loading', false)
      if (checked) {
        this.$refs.tree.childCheckedHandle(node, checked)
      }
    },
    onselect(node) {
      console.log(node)
      this.unitNum = 0
      this.userNum = 0
      this.selectedData = []

      var CheckedNodes = this.$refs.tree.getCheckedNodes({isOriginal: true})
      for (var j = 0; j < CheckedNodes.length; j++) {
        if (CheckedNodes[j].checked) {
          this.selectedData.push(CheckedNodes[j])

          if (CheckedNodes[j].children) {
            this.unitNum++
          } else {
            this.userNum++
          }
        }
      }
    },
    showPopup() {
      if (this.selectedData.length == 0) {
        this.$toast('请添加联系人')
        return
      }
      // 弹出弹窗
      this.isshowPopup = !this.isshowPopup
    },
    onconfirm() {
      console.log(this.selectedData)
    }
  }
}
</script>
<style lang="less" scoped>
.rs-AddressList {
  .van-search {
    .van-search__content {
      background-color: #fff;
    }
    .van-button {
      height: 34px;
      line-height: 32px;
      padding: 0 10px;
      & + .van-button {
        margin-left: 4px;
      }
    }
  }
}
.rs-ztree {
  padding: 5px 10px;
  > li {
    &::after,
    &::before {
      display: none;
    }
  }
  li {
    padding: 0;
    &.leaf {
      padding-left: 0;
    }
    span {
      height: 30px;
      display: inline-block;
    }
  }
  ul {
    padding-left: 25px;
    padding-top: 0;
  }
  .node-selected {
    background: none;
    border: 0;
  }
  .node-title {
    padding: 0;
    line-height: 30px;
    display: inline-block;
    vertical-align: middle;
    &:hover {
      background: none;
      border: 0;
    }
    &.node-searched {
      border: 0;
    }
  }
  .node-icon {
    i {
      width: 26px;
      height: 30px;
      display: inline-block;
      vertical-align: middle;
      background: url('../../assets/address-list/1.png') center center no-repeat;
      background-size: 18px;
    }
    &.node-user {
      i {
        background: url('../../assets/address-list/2.png') center center no-repeat;
        background-size: 18px;
      }
    }
  }
  .tree-expand {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    width: 30px;
    height: 30px;
    border: 0;
    &::after {
      display: none;
    }
    // 向上箭头
    &.tree-open {
      background: url('../../assets/address-list/3.png') center no-repeat;
      background-size: 18px;
    }
    // 向下箭头
    &.tree-close {
      background: url('../../assets/address-list/4.png') center no-repeat;
      background-size: 18px;
    }
  }
  // 未选中选择框
  .inputCheck {
    top: 0;
    width: 26px;
    height: 30px;
    background: url('../../assets/address-list/check1.png') center center no-repeat;
    border: 0;
    vertical-align: middle;
    &::after {
      display: none !important;
    }
    .check {
      top: 0;
      left: 0;
      width: 30px;
      height: 30px;
      margin: 0;
    }
    // 选中选择框
    &.box-checked {
      background: url('../../assets/address-list/check2.png') center center no-repeat;
    }
    // 半选中选择框
    &.box-halfchecked {
      background: url('../../assets/address-list/check3.png') center center no-repeat;
    }
  }
}
.rs-selected-list {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 108;
  height: 45px;
  box-shadow: 0 0 10px #f2f3f5;
  background-color: #fff;
  z-index: 2020;
  .rs-selected-btn {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 40%;
    padding-left: 15px;
    line-height: 45px;
    text-align: left;
    font-size: 14px;
  }
  .rs-foot-btn {
    float: right;
    .van-button {
      height: 45px;
      padding: 0 20px;
    }
  }
}
.rs-tree {
  .van-popup--bottom {
    bottom: 45px;
    background: #efeff4;
    font-size: 14px;
    .rs-bar {
      height: 45px;
      line-height: 45px;
      position: relative;
      .van-checkbox {
        position: absolute;
        top: 0;
        left: 0;
        height: 45px;
        line-height: 44px;
        padding: 0 15px;
      }
      .rs-show-num {
        text-align: center;
      }
    }
    .rs-list {
      border-top: 1px solid #eee;
      background: #fff;
      li {
        position: relative;
        padding: 10px 15px;
        .rs-icon {
          width: 26px;
          height: 26px;
          display: inline-block;
          vertical-align: middle;
          background: url('../../assets/address-list/1.png') center center no-repeat;
          background-size: 18px;
          &.rs-icon-user {
            background: url('../../assets/address-list/2.png') center center no-repeat;
            background-size: 18px;
          }
        }
        .rs-text {
          vertical-align: middle;
        }
        .rs-cancer {
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          width: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 18px;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
