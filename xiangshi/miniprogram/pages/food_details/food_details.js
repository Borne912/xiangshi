// miniprogram/pages/food_details/food_details.js
const db= wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: 'cloud://xiangshi-yqpne.7869-xiangshi-yqpne-1302514195/image/hongbo/first_floor/window_1/rice.jpg',
    metal_names : {Ca:'钙',Fe:'铁',Ka:'钾',Mg:'镁',Na:'钠',Zn:'锌'},
    //metal_datas : [4.5,5.6,1.2,7.4,2.3,9.0],
    metal_datas:[],
    ying:[],
    vitamin_names : {VA:'A',VB1:'B1',VB2:'B2',VB3:'B3',VC:'C',VE:'E'},
    vitamin_datas : [1.5,2.6,3.2,4.4,5.3,6.0],
    rates : ['"体验感很好, 能够吃而且便宜"',
            '"吃就完事了"',
            '"听我的,就这了"',
            '"为什么有好多没听过的菜?"'],
    cur:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getData: function (e) {
    let that = this
    // that.data.metal_datas = []
    console.log(app.globalData.curDish)
    db.collection("dishes").where({
      loc: app.globalData.location,
      floor:app.globalData.floor,
    //  window :app.globalData.window,
      name: app.globalData.curDish
    }).get({
      success(res) {
        console.log(res.data[0])
        that.setData({
          cur : res.data[0],
          metal_datas: res.data[0].metal,
          vitamin_datas: res.data[0].vitamin,
          ying: res.data[0].yingyang,
        })
      }
    })

  },
  onLoad: function (options) {
    this.getData()
    console.log(this.data.cur)
    console.log(this.data.ying)
    
  },
  // 此函数为按钮事件,将此dish加入饮食记录(全局变量)
  addData: function(e) {
    var dishes = app.globalData.dishes
    dishes.push(this.data.cur)
    console.log('添加成功!');
    console.log(app.globalData.dishes)
    
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