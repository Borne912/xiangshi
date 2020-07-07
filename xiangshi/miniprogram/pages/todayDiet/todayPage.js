// miniprogram/pages/todayDiet/todayPage.js
// 今日饮食展开页
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '',
    imgUrl: 'cloud://xiangshi-yqpne.7869-xiangshi-yqpne-1302514195/image/icon/Add.png',
    // 饮食与运动数据(所占百分比)
    percents: [{name:'饮食', num:45},
              {name:'运动', num:37},],
    // 营养
    yingyang: ['碳水化合物','蛋白质','脂肪'],
    // 总含量
    total: [345.23,23.98,10.56],
    // 类型(早餐,午餐,晚餐,加餐)
    classes: ['早餐','午餐','晚餐','加餐'],
    //各类型的营养
    each: [{id: '早餐', ka: 0, tanshui: 0, danbai: 0, zhifang: 0},
          {id: '午餐', ka: 0, tanshui: 0, danbai: 0, zhifang: 0},
          {id: '晚餐', ka: 0, tanshui: 0, danbai: 0, zhifang: 0},
          {id: '加餐', ka: 0, tanshui: 0, danbai: 0, zhifang: 0}]

  },
  getToday: function(){
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth()+1;
    var day = now.getDate();
    this.setData({
      date: year + '年' + month + '月' + day + '日'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getToday()
  },
  addTap: function(e) {
    console.log('跳转界面')
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