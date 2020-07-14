// miniprogram/pages/location/location.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // buttons: [{ id: 1, name: '鸿博园' }, { id: 2, name: '万秀园' }, { id: 3, name: '友谊餐厅' }],
    datas:  
    [{id: 1, name:'鸿博园',avgtime: 2, exptime: 3, curpeo:323, exppeo: 456 }, 
    {id: 2, name:'万秀园',avgtime: 5, exptime: 7, curpeo:142, exppeo: 170 }, 
    {id: 3, name:'友谊餐厅',avgtime: 10, exptime: 7, curpeo:24, exppeo: 19 },], 

    // 顺序: 鸿博, 万秀, 友谊
    // 排队时间:平均, 预估
    times: [{avg: 2, exp: 3}, {avg: 5, exp: 7}, {avg: 10, exp: 7}],
    // 排队人数:目前, 预估
    counts: [{cur: 323, exp: 456},{cur: 1421, exp: 1700},{cur: 24, exp: 19}],
    curLocation:'鸿博园',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //this.data.buttons[0].checked = true; 
    this.data.datas[0].checked = true; 
    this.setData({
      // buttons: this.data.buttons,
      datas: this.data.datas
    })
  },
  radioButtonTap : function (e){
    let id = e.currentTarget.dataset.id
    // console.log(id)
    console.log(this.data.datas[id-1].name)
    for (let i = 0; i < this.data.datas.length; i++) {
      if (this.data.datas[i].id == id) {
        //当前点击的位置为true即选中
        this.data.datas[i].checked = true;      
      }
      else {//其他的位置为false   
        this.data.datas[i].checked = false;
      }
    }
    this.setData({
      // buttons: this.data.buttons,
      datas: this.data.datas,
      curLocation: this.data.datas[id-1].name
    })
  },
  submit: function(e) {
    var app = getApp();
    // 全局遍历location
    app.globalData.location = this.data.curLocation
    var pages = getCurrentPages();
    var beforePage = pages[pages.length - 2];
    // 调用列表页的获取数据函数
    beforePage.onLoad();
    console.log(app.globalData.location)
    wx.switchTab({ url: '../food/food' })
    console.log('success')
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