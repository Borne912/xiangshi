// miniprogram/pages/note/note.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    note:['客服小助手'],
    date: '',
  },
  getToday: function(){
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth()+1;
    var day = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    this.setData({
      date: year + '-' + month + '-' + day+' '+hour+':'+minute
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getToday()
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