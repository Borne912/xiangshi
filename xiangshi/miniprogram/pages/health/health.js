// miniprogram/pages/health/health.js
// 这是饮食推荐数据库
const DB = wx.cloud.database()
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    date: '',
    // 3大营养
    tanshui : 0,
    danbai : 0,
    zhifang : 0,
    // 4餐推荐
    breakfast: '',
    lunch: '',
    dinner: '',
    addfood: '',
  },
  // 今日日期
  getToday: function(){
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth()+1;
    var day = now.getDate();
    this.setData({
      date: year + '年' + month + '月' + day + '日'
    })
  },
  // 转换各餐字符串
  parseStr: function(e) {
    // console.log('进入parse函数')
    var res = e[0].name
    for(var i = 1; i < e.length; i++) {
      res = res + '+' + e[i].name
    }
    // console.log(res)
    return res
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
    }
    console.log(res)
    return res.toFixed(2)
  },
  // 从数据库调取数据(饮食推荐)
  getData: function (e) {
    // 目的是把数据库里的数据分4次拿出来(早餐,午餐,晚餐,加餐的顺序)
    // 最终效果是total=[breakfast, lunch, dinner, addfood]
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
        that.setData({
          tanshui : y1,
          danbai: y2,
          zhifang: y3
        })
      }
    })
    /*************************************************/
    // 调取数据(4餐)
    DB.collection("diet_recommendation").where({//早餐
     id : '早餐'
    }).get({     
      success(res){
        var str = that.parseStr(res.data)
        that.setData({
          breakfast: str
        })
      }
    })
    DB.collection("diet_recommendation").where({//午餐
      id : '午餐'
     }).get({     
       success(res){
        var str = that.parseStr(res.data)
        that.setData({
          lunch: str
        })
       }
     }) 
    DB.collection("diet_recommendation").where({// 晚餐
    id : '晚餐'
    }).get({     
      success(res){
        var str = that.parseStr(res.data)
        that.setData({
          dinner: str
        })
      }
    })
    DB.collection("diet_recommendation").where({//加餐
      id : '加餐'
      }).get({     
      success(res){
        var str = that.parseStr(res.data)
        that.setData({
          addfood: str
        })
      }    
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
    this.getToday()
  },
  // 今日饮食展开(跳转今日饮食)
  selectToday: function (e) {
    console.log('跳转今日饮食')
    wx.navigateTo({
      url: '../todayDiet/todayPage',
    })    
  },
  // 推荐界面
  selectRecommend: function (e) {
    console.log('跳转推荐饮食')
    wx.navigateTo({
      url: '../recDiet/recDiet',
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