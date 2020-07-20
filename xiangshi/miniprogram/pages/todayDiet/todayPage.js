// miniprogram/pages/todayDiet/todayPage.js
// 今日饮食展开页
const app = getApp()
const DB = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '',
    imgUrl: 'cloud://xiangshi-yqpne.7869-xiangshi-yqpne-1302514195/image/icon/Add.png',
    // 饮食与运动数据(所占百分比)
    percents: [{name:'饮食', num:45},
              {name:'运动', num:37},],
    // 营养
    yingyang: ['碳水化合物','蛋白质','脂肪'],
    // 总含量(早+午+晚+加餐)
    total: [345.23,23.98,10.56],
    // 类型(早餐,午餐,晚餐,加餐)
    classes: ['早餐','午餐','晚餐','加餐'],
    //各类型的营养
    each: [{id: '早餐', ka: 0, tanshui: 0, danbai: 0, zhifang: 0},
          {id: '午餐', ka: 0, tanshui: 0, danbai: 0, zhifang: 0},
          {id: '晚餐', ka: 0, tanshui: 0, danbai: 0, zhifang: 0},
          {id: '加餐', ka: 0, tanshui: 0, danbai: 0, zhifang: 0}],
    // 每个都包含4种(热量->碳水->蛋白->脂肪)
    breakfast: [],
    lunch: [],
    dinner: [],
    addfood: [],
  },
  getToday: function(){
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth()+1;
    var day = now.getDate();
    this.setData({
      date: year + '年' + month + '月' + day + '日'
    })
  },
  // 计算营养物质(碳水,蛋白,脂肪)
  getYing: function (e, types) {
    console.log('进入计算函数')
    var res = 0;
    for(var i = 0; i < e.length; i++) {
      var et = e[i].yingyang
      if(types == '碳水')
        res = res + parseFloat(et.tanshui)
      else if(types == '蛋白')
        res = res + parseFloat(et.danbai)
      else if(types == '脂肪')
        res = res + parseFloat(et.zhifang)
      else if(types == '卡路里')
        res = res + parseInt(et.ka)
    }
    console.log(res)
    return res.toFixed(2)
  },
  //读数据
  getData: function (e) {
    // 计算总的4营养水平(热量,碳水,蛋白,脂肪)
    var that = this
    // 以下是今日3大营养总和提取
    DB.collection("history").where({
      date : app.globalData.date,
    }).get({
      success(res) {
        console.log(res.data)
        // 碳水->蛋白->脂肪
        var y1 = that.getYing(res.data,'碳水')
        var y2 = that.getYing(res.data,'蛋白')
        var y3 = that.getYing(res.data,'脂肪')
        // console.log(y1+'-'+y2+'-'+y3)
        that.setData({
          total: [y1,y2,y3]
        })
      }
    })
    // 以下是获取4种餐的(热量,碳水,蛋白,脂肪)
    DB.collection("history").where({
      date : app.globalData.date,
      types: '早餐'
    }).get({
      success(res) {
        console.log(res.data)
        // 热量->碳水->蛋白->脂肪
        var y1 = that.getYing(res.data,'热量')
        var y2 = that.getYing(res.data,'碳水')
        var y3 = that.getYing(res.data,'蛋白')
        var y4 = that.getYing(res.data,'脂肪')
        console.log(y1+'-'+y2+'-'+y3+'-'+y4)
        that.setData({
          breakfast: [y1,y2,y3,y4]
        })
      }
    })
    // 午餐
    DB.collection("history").where({
      date : app.globalData.date,
      types: '午餐'
    }).get({
      success(res) {
        console.log(res.data)
        // 热量->碳水->蛋白->脂肪
        var y1 = that.getYing(res.data,'热量')
        var y2 = that.getYing(res.data,'碳水')
        var y3 = that.getYing(res.data,'蛋白')
        var y4 = that.getYing(res.data,'脂肪')
        console.log(y1+'-'+y2+'-'+y3+'-'+y4)
        that.setData({
          lunch: [y1,y2,y3,y4]
        })
      }
    })
    // 晚餐
    DB.collection("history").where({
      date : app.globalData.date,
      types: '晚餐'
    }).get({
      success(res) {
        console.log(res.data)
        // 热量->碳水->蛋白->脂肪
        var y1 = that.getYing(res.data,'热量')
        var y2 = that.getYing(res.data,'碳水')
        var y3 = that.getYing(res.data,'蛋白')
        var y4 = that.getYing(res.data,'脂肪')
        console.log(y1+'-'+y2+'-'+y3+'-'+y4)
        that.setData({
          dinner: [y1,y2,y3,y4]
        })
      }
    })
    // 加餐
    DB.collection("history").where({
      date : app.globalData.date,
      types: '加餐'
    }).get({
      success(res) {
        console.log(res.data)
        // 热量->碳水->蛋白->脂肪
        var y1 = that.getYing(res.data,'热量')
        var y2 = that.getYing(res.data,'碳水')
        var y3 = that.getYing(res.data,'蛋白')
        var y4 = that.getYing(res.data,'脂肪')
        console.log(y1+'-'+y2+'-'+y3+'-'+y4)
        that.setData({
          addfood: [y1,y2,y3,y4]
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getToday()
    this.getData()
  },
  // 跳转添加界面
  addTap: function(e) {
    var id = e.currentTarget.dataset.id
    console.log('跳转添加界面',id)
    app.globalData.fourCan = id
    wx.navigateTo({
      url: '../addFood/addFood',
    })
  },
  // 跳转健康界面
  selectHealth:function(e) {
    console.log('跳转健康界面')
    // 将上一个界面效果刷新
    var pages = getCurrentPages();
    var beforePage = pages[pages.length - 2];
    // 调用列表页的获取数据函数
    beforePage.onLoad();
    wx.switchTab({
      url: '../health/health',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})