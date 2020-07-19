// miniprogram/pages/addFood/addFood.js
const DB = wx.cloud.database().collection("diet_recommendation")
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    str:"111",
    dishes: []
  },
  getData: function() {
    let that = this
    DB.where({
      id: app.globalData.fourCan
    }).get({
      success(res) {
        console.log(res.data)
        that.setData({
          dishes: res.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
    wx.setNavigationBarTitle({
      title: '添加' + app.globalData.fourCan
    })
  },
  selectFood: function (e) {
    wx.showModal({
      // cancelColor: 'cancelColor',
      // mask: ''
    })
  },
  // 今日饮食展开(跳转今日饮食)
  selectToday: function (e) {
    console.log('跳转今日饮食')
    wx.navigateTo({
      url: '../todayDiet/todayPage',
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