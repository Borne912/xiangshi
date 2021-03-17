// miniprogram/pages/List/list.js
const db = wx.cloud.database()
const app = getApp()
var tmp
Page({

  /**
   * 页面的初始数据
   */
  data: {
    year_food:[],
    selects: ['年度榜', '月榜', '周榜','日榜'],
    clickID :0,
  },

  readDataBase(){
    var that = this; 
    db.collection("recommend").where({
       
    }).get({
       success(res){
         //console.log(res.data)
          that.setData({
            year_food : res.data
         })
        }
     })
    },
    changepage:function(e){
      this.setData({
        clickID: e.currentTarget.id
      })
      if(e.currentTarget.id == 0){
        this.setData({
          changepage0 : true,
          changepage1 : false,
        })
      }
      else if(e.currentTarget.id == 1){
        this.setData({
          changepage0 : false,
          changepage1 : false,
        })
      }
      else if(e.currentTarget.id == 2){
        this.setData({
          changepage0 : true,
          changepage1 : true,
        })
      }
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.readDataBase()
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