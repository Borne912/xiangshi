// Componet/Componet.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    col: {
      type: Number,
      value: 2,
      observer: function(newVal,oldVal){}
    },
    blockspace:{
      type: Number,
      value: 5,
      observer: function(newVal,oldVal){}
    },
    waterfall: {
      type: Array,
      value: [],
      observer: function(newVal,oldVal){
        this.setData({
          waterfallarr: [...this.data.waterfallarr,...newVal]
        })
      }
    }
  },

/**
   * 组件的初始数据
   */
  data: {
    itemwidth: '',   //节点的宽度
    topArr: [],      //记录每一列的总高度  
    allHeightArr: [],     // 记录所有节点的高度的数组
    allPositionArr: [],   // 记录所有节点距离顶部距离的数组
    num: 0,             // 记录瀑布流多少张图片
    oldNum: 0,          // 记录瀑布流加载一次后上一次一共有多少张图片
    height: 0,          // 记录瀑布流的总高度
    waterfallarr: []    // 所有图片数据数组
  },

  /**
   * 组件的方法列表
   */
  methods: {

    loadImgFinish(e){
      let that = this
      let index = e.currentTarget.dataset.index
      let dom = wx.createSelectorQuery().in(this)
      // 获取所有图片容器的节点信息
      dom.select("#waterfall-item-id-" + index).fields({ size: true },(res) => {
        that.setData({
          num: that.data.num + 1,
          ['waterfallarr[' + index + '].show']: false,    // 这边事先把所有图片隐藏，用于后面做懒加载的效果
          ['allHeightArr[' + index + ']']: res.height,
        })
        if(that.data.num == that.data.waterfallarr.length){
          for(let i = that.data.oldNum; i < that.data.num; i++){
            const getSortMsg = () => {
              // 记录各列高度的数据进行重新排序
              let sortArr = [...that.data.topArr].sort((a, b) => a - b)
              return {
                'shortestHeight': sortArr[0],
                'longestHeight': sortArr[that.data.col - 1],
                'shortestIndex': that.data.topArr.indexOf(sortArr[0]),
                'longestIndex':  that.data.topArr.indexOf(sortArr[that.data.col - 1])
              }
            }
            const { shortestHeight,shortestIndex } = getSortMsg()
            that.setData({
              ['allPositionArr[' + i + ']']: {
                top: shortestHeight + that.data.blockspace,
                left: (that.data.itemwidth * shortestIndex ) + that.data.blockspace * ( shortestIndex + 1 )
              },
              ['topArr[' + shortestIndex + ']']: that.data.topArr[shortestIndex] + that.data.allHeightArr[i] + that.data.blockspace
            })
            // 瀑布流懒加载
            that.createIntersectionObserver().relativeToViewport({ bottom: 50 }).observe('#waterfall-item-id-' + i ,(res) => {
              if(res.intersectionRatio  > 0){
                that.setData({
                  ['waterfallarr[' + i + '].show']: true
                })
              }
            })
          }
          that.setData({
            'oldNum': that.data.num,
            'height': Math.max.apply(null,that.data.topArr) + that.data.blockspace
          })
          // 瀑布流加载完成后，通知父组件加载完毕
          that.triggerEvent('waterFallResh', { loading: true })
        }
      }).exec()
    },

   // 下拉刷新初始化数据
    refresh(){
      for(let i = 0; i < this.data.col; i++){
        this.data.topArr.push(0)
      }
      this.setData({
        'num': 0,
        'oldNum': 0,
        'height': 0
      })
    },   

  }

})