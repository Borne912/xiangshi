// miniprogram/pages/search/search.js
const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputDish: "",
    dishes:[]
  },
  // 检索数据库函数(输入关键字)
  searchDataBase: function (find) {
    var that = this
    db.collection("dishes").where({
      loc: app.globalData.location,
      // 模糊检索 
      name: {
        $regex:'.*' + find + '.*',  
        $options: 'i'   
      }
    }).get({
      success(res){
        if(res.data.length != 0)
          console.log(res.data)
        else
          console.log("对不起,没有检索到该菜品")
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

  },
  // 输入信息
  dishInput: function (e) {
    var input = e.detail.value
    console.log(input)
    this.setData({
      inputDish: input
    })  
  },
  searchTap: function (e) {
    var find = this.data.inputDish
    this.searchDataBase(find)
  },
  selectFood: function(e) {   
    let id = e.currentTarget.dataset.id
    app.globalData.curDish = id
    console.log(id)
    wx.navigateTo({
      //目的页面地址
      url: '../food_details/food_details',
      success: function(res){
        console.log("跳转成功")
      },
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