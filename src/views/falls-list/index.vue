<template>
  <div class="rm-falls" id="rm-waterfall">
    <div
      v-for="(img, index) in waterfallList"
      class="rm-falls-item"
      :key="index"
      :style="{top: img.top + 'px', left: img.left + 'px', width: waterfallImgWidth + 'px', height: img.height}"
    >
      <img :src="img.src" alt />
    </div>
  </div>
</template>

<script>
export default {
  name: 'rm-falls',
  data() {
    return {
      waterfallList: [], //存放计算好的数据
      imgArr: [
        //图片数据
        require('@/assets/falls-list/el-1.png'),
        require('@/assets/falls-list/el-2.png'),
        require('@/assets/falls-list/el-3.png'),
        require('@/assets/falls-list/el-1.png'),
        require('@/assets/falls-list/el-2.png'),
        require('@/assets/falls-list/el-3.png'),
        require('@/assets/falls-list/el-1.png'),
        require('@/assets/falls-list/el-2.png'),
        require('@/assets/falls-list/el-3.png')
      ],
      waterfallImgWidth: 110, //每一列的跨度
      waterfallImgCol: 3, //多少列
      waterfallImgRight: 10, //右边距
      waterfallImgBottom: 10, //左边距
      waterfallDeviationHeight: [], //存放各个列的高度
      imgList: [] //遍历后存放的图片
    }
  },
  created() {
    //在实例创建完成后被立即调用
    let size = this.imgArr.length
    for (let i = 0; i < size; i++) {
      //随机选择图片
      // Math.round(Math.random() * 8)
      this.imgList.push(this.imgArr[i])
    }
  },
  mounted() {
    //实例被挂载后调用
    //调用函数
    this.calculationWidth()
  },
  methods: {
    //计算每个图片的宽度或者是列数
    calculationWidth() {
      //获取页面宽度
      let domWidth = document.getElementById('rm-waterfall').offsetWidth
      if (!this.waterfallImgWidth && this.waterfallImgCol) {
        this.waterfallImgWidth = (domWidth - this.waterfallImgRight * this.waterfallImgCol) / this.waterfallImgCol
      } else if (this.waterfallImgWidth && !this.waterfallImgCol) {
        this.waterfallImgCol = Math.floor(domWidth / (this.waterfallImgWidth + this.waterfallImgRight))
      }
      //初始化偏移高度数组
      this.waterfallDeviationHeight = new Array(this.waterfallImgCol)
      for (let i = 0; i < this.waterfallDeviationHeight.length; i++) {
        this.waterfallDeviationHeight[i] = 0
      }
      //图片预加载
      this.imgPreloading()
    },
    //图片预加载
    imgPreloading() {
      for (let i = 0; i < this.imgList.length; i++) {
        //建立图像对象：
        let aImg = new Image()
        aImg.src = this.imgList[i]
        aImg.onload = aImg.onerror = e => {
          console.log(e)
          let imgData = {}
          //根据设定的列宽度求出图片的高度
          imgData.height = (this.waterfallImgWidth / aImg.width) * aImg.height
          imgData.src = this.imgList[i]
          this.waterfallList.push(imgData)
          //调用图片位置计算方法
          this.rankImg(imgData)
        }
      }
    },
    //瀑布流布局--计算图片偏移量
    rankImg(imgData) {
      let {waterfallImgWidth, waterfallImgRight, waterfallImgBottom, waterfallDeviationHeight, waterfallImgCol} = this
      //for (let i = 0;i < this.waterfallList.length;i++){
      //找出当前最短列的索引
      console.log(waterfallImgCol)
      let minIndex = this.filterMin()
      imgData.top = waterfallDeviationHeight[minIndex]
      imgData.left = minIndex * (waterfallImgRight + waterfallImgWidth)
      waterfallDeviationHeight[minIndex] += imgData.height + waterfallImgBottom
      //}
      console.log(imgData)
    },
    /**
     * 找到最短的列并返回下标
     * @returns {number} 下标
     */
    filterMin() {
      /*          Function.apply(obj,args)方法能接收两个参数
        obj：这个对象将代替Function类里this对象
        args：这个是数组，它将作为参数传给Function（args-->arguments）
      */
      //获取最小列高度
      const min = Math.min.apply(null, this.waterfallDeviationHeight)
      return this.waterfallDeviationHeight.indexOf(min)
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
.rm-falls {
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  box-sizing: border-box;
  top: 60px;
  left: 0;
  right: 0;
  bottom: 0;
  min-height: 100vh;
  box-sizing: border-box;
  margin: 0 10px;
  &-item {
    float: left;
    position: absolute;
    img {
      width: 100%;
      height: auto;
    }
  }
}
</style>
