// miniprogram/pages/food_details/food_details.js
const db_dishes= wx.cloud.database().collection("dishes")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: 'cloud://xiangshi-yqpne.7869-xiangshi-yqpne-1302514195/image/hongbo/first_floor/window_1/rice.jpg',
    metal_names : ['钙','钠','铁','钾','镁','锌'],
    //metal_datas : [4.5,5.6,1.2,7.4,2.3,9.0],
    metal_datas:[],
    vitamin_names : ['A','B1','B2','B3','C','E'],
    vitamin_datas : [1.5,2.6,3.2,4.4,5.3,6.0],
    rates : ['"体验感很好, 能够吃而且便宜"',
            '"就那样呗, 凑活吃饱"',
            '"今天有点硬"',
            '"软软的很好吃"'],
    cur:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getData: function (e) {
    let that = this
    let app = getApp()
    that.data.metal_datas = []
    console.log(app.globalData.curDish)
    db_dishes.where({
      loc: app.globalData.location,
      floor:app.globalData.floor,
    //  window :app.globalData.window,
      name: app.globalData.curDish
    }).get({
      success(res) {
        console.log(res.data)
        var tmp = []
        tmp.push(res.data.Ca)
        tmp.push(res.data.Na)
        tmp.push(res.data.Fe)
        tmp.push(res.data.Ka)
        tmp.push(res.data.Mg)
        tmp.push(res.data.Zn)
        that.setData({
          cur : res.data,
          metal_datas: tmp
        })
      }
    })

  },
  onLoad: function (options) {
    this.getData()
    console.log(this.data.cur)
  },
  // 此函数为按钮事件,将此dish加入饮食记录(全局变量)
  addData: function(e) {
    console.log('添加成功!');
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