<template>
  <div class="tree-search-container">
    <div class="tree-box">
      <!-- 搜索 -->
      <van-search v-model="searchword" show-action :placeholder="searchtext" background="#f4f4f6" @search="searchNodes">
        <div slot="action">
          <van-button color="#3296fa" @click="searchNodes">搜索</van-button>
          <van-button color="#3296fa" @click="AllNodes">
            <template v-if="!AllNodesText">全选</template>
            <template v-if="AllNodesText">取消全选</template>
          </van-button>
        </div>
      </van-search>
      <v-tree
        ref="dropTree"
        class="rs-ztree"
        v-bind="vTreeObj"
        v-on="$listeners"
        :data="data"
        :dragAfterExpanded="dragAfterExpanded"
        :draggable="draggable"
        :tpl="tpl"
        :multiple="multiple"
        :halfcheck="true"
        @dropTreeNodeChecked="nodeCheckStatusChange"
        @async-load-nodes="asyncLoadNodes"
        @node-expanded="asyncLoadNodes"
        @node-click="nodeClick"
        @node-check="nodeClick"
      />
    </div>
    <!-- 底部已选按钮 -->
    <div class="rs-selected-list">
      <!-- 展开弹出已选列表按钮 -->
      <div class="rs-selected-btn" @click="showPopup" v-show="unitNum != 0 || userNum != 0">
        已选择:
        <template v-if="unitNum != 0">{{ unitNum }}个单位</template>
        &nbsp;&nbsp;&nbsp;
        <template v-if="userNum != 0">{{ userNum }}个人</template>
      </div>
    </div>
    <!-- 已选择列表   -->
    <van-popup v-model="isshowPopup" position="bottom" :style="{height: '70%'}" close="onclose">
      <div class="rs-bar">
        <!-- <van-checkbox
          v-model="Allchecked"
          shape="square"
          class="list_checkAll"
          @click="onAllchecked"
        >取消全选</van-checkbox>-->

        <div class="rs-show-num">
          已选择：
          <template v-if="unitNum != 0">{{ unitNum }}个单位</template>
          &nbsp;&nbsp;&nbsp;
          <template v-if="userNum != 0">{{ userNum }}个人</template>
        </div>
      </div>
      <ul class="rs-list">
        <template v-for="(node, idx) in selectedItems">
          <li :key="idx">
            <van-checkbox v-model="node.checked" shape="square" @change="onListChange(node)">
              <i class="rs-icon" :class="{'rs-icon-user': !node.isParent}"></i>
              <span class="rs-text">{{ node.title }}</span>
            </van-checkbox>
            <van-icon name="cross" class="rs-cancer" @click="rmNode(node)" />
          </li>
        </template>
      </ul>
    </van-popup>
  </div>
</template>
<script>
import VTree from './tree'

export default {
  name: 'searchTree',
  model: {
    event: 'value-change'
  },
  inheritAttrs: false,
  components: {VTree},
  data() {
    return {
      AllNodesText: false, //是否全选
      isshowPopup: false, //已选列表是否显示
      Allchecked: true, //已选列表全选状态
      searchword: '',
      selectedItems: [], //已选数据  已选 + 半选
      listData: [], //已选数据  已选
      unitNum: 0, //单位数量
      userNum: 0 //人数量
    }
  },
  watch: {
    selectedItems: function() {
      this.$emit('value-change', this.selectedItems)

      this.listData = this.selectedItems
      if (this.AllNodesText) {
        this.setAllFiltrateData()
      } else {
        // 筛选半选的
        this.setFiltrateData()
      }
    },
    listData: function() {
      // 更新已选择数量
      this.unitNum = 0
      this.userNum = 0
      for (var i = 0; i < this.listData.length; i++) {
        if (this.listData[i].isParent) {
          this.unitNum++
        } else {
          this.userNum++
        }
      }
    }
  },
  mounted() {
    this.selectedItems = this.value
    this.initTreeStatus()
  },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    searchable: {
      type: Boolean,
      default: true
    },
    searchtext: {
      type: String,
      default: '请输入关键字搜索...'
    },
    data: {
      type: Array,
      default: () => []
    },
    parent: {
      type: Object,
      default: () => null
    },
    multiple: {
      type: Boolean,
      default: false
    },
    draggable: {
      type: Boolean,
      default: false
    },
    dragAfterExpanded: {
      type: Boolean,
      default: true
    },
    searchFilter: Function
  },
  computed: {
    vTreeObj() {
      return this.$attrs
    }
  },
  methods: {
    // tpl (node, ctx, parent, index, props) {
    tpl(...args) {
      // let {0: node, 1: parent, 2: index} = args
      let {0: node} = args
      let titleClass = node.selected ? 'node-title node-selected' : 'node-title'
      let iconClass = node.children ? 'node-icon' : 'node-icon node-user'
      if (node.searched) titleClass += ' node-searched'
      // console.log(parent)
      // console.log(index)
      return (
        <span class={iconClass}>
          <i></i>
          <span
            class={titleClass}
            domPropsInnerHTML={node.title}
            onClick={() => {
              this.$refs.dropTree.nodeSelected(node)
            }}></span>
        </span>
      )
    },
    setFiltrateData() {
      for (var i = this.selectedItems.length - 1; i >= 0; i--) {
        for (var j = this.listData.length - 1; j >= 0; j--) {
          if (this.selectedItems[i].check_Child_State == 2) {
            if (this.selectedItems[i].uuid == this.listData[j].parentUuid) {
              if (this.listData[j].isParent) {
                this.onFiltrate(this.listData[j].uuid)
              }
              this.listData.splice(j, 1)
              break
            }
          }
        }
      }
      // 删除半选节点
      for (var k = this.listData.length - 1; k >= 0; k--) {
        if (this.listData[k].check_Child_State == 1) {
          this.listData.splice(k, 1)
          break
        }
      }
      // 删除未选节点
      for (var n = this.listData.length - 1; n >= 0; n--) {
        if (!this.listData[n].checked) {
          this.listData.splice(n, 1)
          break
        }
      }
    },
    // 筛选全选数据
    setAllFiltrateData() {
      this.listData = []
      for (var n = this.data.length - 1; n >= 0; n--) {
        this.listData.push(this.data[n])
      }
    },
    /**
     * 根据id删除节点 节点下的子节点也删除
     * uuid 当前节点id
     */
    onFiltrate(uuid) {
      for (var j = this.listData.length - 1; j >= 0; j--) {
        if (this.listData[j].parentUuid == uuid) {
          if (this.listData[j].isParent) {
            this.onFiltrate(this.listData[j].uuid)
          }
          this.listData.splice(j, 1)
        }
      }
    },
    /* @event 将async-load-nodes事件传递给父组件
     *  @param node clicked node
     */
    asyncLoadNodes(node) {
      if (node.async && !node.children) {
        this.$emit('async-load-nodes', node)
      }
    },
    /* @event 将节点单击事件传递给父组件
     * @param node clicked node
     */
    nodeClick(node, selected) {
      this.getNewSelectedNodes()
      this.$emit('node-click', node, selected)
    },
    getSelectedAndCheckedNodes() {
      let checkedNode = []
      if (this.multiple) {
        checkedNode = this.$refs.dropTree.getCheckedNodes(true)
      }
      const selectedNode = this.$refs.dropTree.getSelectedNodes(true)
      return [...new Set([...selectedNode, ...checkedNode])]
    },
    getNewSelectedNodes() {
      this.$nextTick(() => {
        this.selectedItems = this.getSelectedAndCheckedNodes()
      })
    },
    /*
     * delete node tag from input
     */
    rmNode(text, eventFromNode) {
      if (!eventFromNode) {
        const node = this.getSelectedAndCheckedNodes().find(x => x.title === text.title)
        if (node) {
          this.$set(node, 'selected', false)
          this.$set(node, 'checked', false)
        }
        // 关闭弹窗
        if (this.selectedItems.length <= 1) {
          this.isshowPopup = false
        }
      }
      this.getNewSelectedNodes()
    },
    // 列表选择框change事件
    onListChange(node) {
      // 更新子节点选择
      if (node.children) {
        this.chilnode(node.children, node.checked)
      }
    },
    // 弹窗关闭之后事件
    onclose() {
      this.getNewSelectedNodes()
    },
    /**
     * 控制子节点选择
     * node 节点数组
     * checked true false
     */
    chilnode(node, checked) {
      for (var i = 0; i < node.length; i++) {
        this.$set(node[i], 'selected', checked)
        this.$set(node[i], 'checked', checked)
        if (node[i].children) {
          this.chilnode(node[i].children, checked)
        }
      }
    },
    /*
     * node check status change event
     */
    // nodeCheckStatusChange (node, checked) {
    nodeCheckStatusChange() {
      let treeNodes = this.$refs.dropTree.getCheckedNodes(true)
      if (!treeNodes) this.selectedItems = []
      this.selectedItems = []
      for (let node of treeNodes) {
        // this.selectedItems.push(node.title)
        this.selectedItems.push(node)
      }
    },
    /*
     * search nodes from  drop-down tree
     * */
    searchNodes() {
      const filter = this.searchFilter ? this.searchFilter : this.searchword
      this.$refs.dropTree.searchNodes(filter)
    },

    // click tag animation effects
    tagClick(e) {
      var l = e.target.offsetLeft - 5
      this.$refs.txtbox.style.transition = 'transform .3s linear'
      this.$refs.txtbox.style.transform = 'translateX(-' + l + 'px)'
    },
    // remove tag animation effects
    leaveTextTag() {
      this.$refs.txtbox.style.transition = 'transform 0.4s'
      this.$refs.txtbox.style.transform = 'translateX(0)'
    },
    /*
     * @param data source tree data
     * initialize the state of the drop-down tree node
     */
    initTreeStatus(data) {
      data = data || this.data
      for (const node of data) {
        if (this.value.findIndex(text => text === node.title) > -1) {
          this.$set(node, 'selected', true)
          this.$set(node, 'checked', true)
        }
        if (node.children && node.children.length) {
          this.initTreeStatus(node.children)
        }
      }
    },
    getTreeRef() {
      return this.$refs.dropTree
    },
    // 点击弹窗弹出
    showPopup() {
      if (this.selectedItems.length == 0) {
        this.$toast('请添加联系人')
        return
      }
      // 弹出弹窗
      this.isshowPopup = !this.isshowPopup
    },
    // 全选
    AllNodes() {
      this.AllNodesText = !this.AllNodesText
      console.log(this.data)
      console.log(this.AllNodesText)

      this.chilnode(this.data, this.AllNodesText)

      this.getNewSelectedNodes()
    }
  }
}
</script>
<style lang="less">
.tree-search-container {
  position: relative;
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
    padding-left: 15px;
    line-height: 45px;
    text-align: left;
    font-size: 14px;
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
        border-bottom: 1px solid #eee;
        &:last-child {
          border-bottom: 0;
        }
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
