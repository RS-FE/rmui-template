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
        <van-checkbox v-model="Allchecked" shape="square" class="list_checkAll" @click="onAllchecked"
          >取消全选</van-checkbox
        >
        <div class="rs-show-num">已选择：{{ unitNum }}个单位，{{ userNum }}个人</div>
      </div>
      <ul class="rs-list">
        <li v-for="(k, i) in selectedData" :key="i">
          <van-checkbox v-model="k.checked" shape="square" @change="onCheckedChange(k)">
            <i class="rs-icon" :class="{'rs-icon-user': !k.isParent}"></i>
            <span class="rs-text">{{ k.title }}</span>
          </van-checkbox>
          <van-icon name="cross" class="rs-cancer" @click="oncancer(k)" />
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
  watch: {
    selectedData: function(data) {
      // console.log(data)
      this.unitNum = 0
      this.userNum = 0
      for (var i = 0; i < data.length; i++) {
        if (data[i].isParent) {
          this.unitNum++
        } else {
          this.userNum++
        }
      }
    }
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
    // 搜索
    onSearch() {
      this.$refs.tree.searchNodes(this.searchword)
    },
    //全选
    onAllchecked() {
      for (var i = 0; i < this.selectedData.length; i++) {
        this.selectedData[i].checked = !this.Allchecked
        // this.treeData[i].checked = !this.Allchecked
        this.$set(this.treeData, i, {checked: !this.Allchecked})
      }
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
    // 树选择事件
    onselect(node) {
      console.log(node)
      this.selectedData = []

      var nodes = this.$refs.tree.getNodes()
      // console.log(nodes)
      for (var j = 0; j < nodes.length; j++) {
        if (!nodes[j].parentCheckedToChildren) {
          if (nodes[j].checked || (nodes[j].checked && nodes[j].halfcheck)) {
            this.selectedData.push(nodes[j])
          }
        }
      }
      // console.log(this.selectedData)
    },
    // 点击弹窗弹出
    showPopup() {
      if (this.selectedData.length == 0) {
        this.$toast('请添加联系人')
        return
      }
      // 弹出弹窗
      this.isshowPopup = !this.isshowPopup
    },
    // 确定
    onconfirm() {
      console.log(this.selectedData)
    },
    // 已选列表删除
    oncancer(node) {
      // console.log(node)
      for (var i = this.selectedData.length - 1; i >= 0; i--) {
        if (this.selectedData[i].title == node.title) {
          this.selectedData.splice(i, 1)
          break
        }
      }
      // 无选择隐藏弹窗
      if (this.selectedData.length == 0) {
        this.isshowPopup = false
      }
    },
    // 已选列表选择取消
    onCheckedChange(node) {
      for (var i = this.treeData.length - 1; i >= 0; i--) {
        if (this.treeData[i].title == node.title) {
          // console.log(this.treeData[i])
          // console.log(node)
          this.$set(this.treeData, i, node)
          break
        }
      }
    }
  }
}
</script>
<style lang="less">
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
          z-index: 2;
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
