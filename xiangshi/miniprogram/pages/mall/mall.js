// miniprogram/pages/mall/mall.js
const db = wx.cloud.database()
const app = getApp()
var tmp

Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 0,
    TabCur2:0,
    scrollLeft: 0,
    scrollLeft2: 0,
    datalist:[]
  },

  readDataBase(){
    var that = this; 
    /**************************************/
    // 以下开始读数据库
    db.collection("mall").get({
      success(res){
        //console.log("查询数据成功",res)
        that.setData({
          datalist: res.data,
        })
        console.log(res.data)
      }
    })
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

  },

  onChange(e) {
    this.setData({
      value: e.detail.value,
    })
    console.log(e.detail.value)
  },

  onConfirm(e) {
    // console.log('onConfirm', e)
    //模糊搜索
    
  },

  onClear(e) {
    console.log('onClear', e)
    this.setData({
      value: '',
    })
  },
  onCancel(e) {
    console.log('onCancel', e)
  },


  // 搜索跳转
  searchJump:function (e) {
    wx.navigateTo({
      url: '../search/search',
    })
  },


  tabSelect(e) {
    console.log(e.currentTarget.dataset.id)
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id-1)*60
    })
  },


  tabSelect2(e) {
    console.log(e.currentTarget.dataset.id)
    this.setData({
      TabCur2: e.currentTarget.dataset.id,
      scrollLeft2: (e.currentTarget.dataset.id-1)*60
    })
  },

  touser:function (e){
    wx.navigateTo({
      url: '../user/user',
    })
  }
})



