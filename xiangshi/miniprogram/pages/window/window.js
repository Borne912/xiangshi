// miniprogram/window/window.
const db = wx.cloud.database()
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    floors:["零","一","二","三","四"],
    windows:["零","一","二","三","四","五",
              "六","七","八","九","十"],
    floor: "",
    window: "",
    dishes: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getDataBase: function (e) {
    var that = this
    // 读取菜品数据库(由地点+楼层+窗口决定)
    db.collection("dishes").where({
      loc: app.globalData.location,
      floor: app.globalData.floor,
      window: app.globalData.window
    }).get({
      success(res){
        console.log(res.data)
        that.setData({
          dishes: res.data,
          floor: that.data.floors[app.globalData.floor],
          window: that.data.windows[app.globalData.window],
        })
      }
    })
  },
  onLoad: function (options) {
    this.getDataBase()
  },
  // 窗口切换
  Buttons_rowsTap : function (e){
    let id = e.currentTarget.dataset.id
    console.log(id)
    let that = this
    db_dishes.where({
      // 转int
      loc: app.globalData.location,
      floor:app.globalData.floor,
      window : parseInt(id)
    }).get({     
      success(res){
        console.log(res.data)
        that.setData({
          dishes_List: res.data
        })
      }
    })
    for (let i = 0; i < this.data.buttons_rows.length; i++) {
      if (this.data.buttons_rows[i].id == id) {
        this.data.buttons_rows[i].checked = true;
      }
      else {//其他的位置为false   
        this.data.buttons_rows[i].checked = false;
      }
    }
    this.setData({
      buttons_rows: this.data.buttons_rows,
      flag : 'x',
      window_id: id
    })
    console.log(this.data.dishes_List)

  },
  selectFood: function(e) {   
    let id = e.currentTarget.dataset.id
    app.globalData.curDish = id
    console.log(id)
    wx.navigateTo({
      //目的页面地址
      url: '../food_details/food_details',
      // url: '../tangshi_page/tangshi',
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