// miniprogram/pages/myService/myService.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrolltop: 500,
    toLast: 'msg-1',
    imgUrl: 'cloud://xiangshi-yqpne.7869-xiangshi-yqpne-1302514195/image/icon/arrow_orange.svg',
    services: ['食物','意见与建议','人工客服'],
    problems: ['我丢失物品','我捡到失物','饭菜质量问题',
               '更换手机号','小程序卡顿','其他问题'],
    response:  ['请联系人工客服'],
    curPro: ['我丢失物品'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  proTap: function(e) {
    let id = e.currentTarget.dataset.id
    let tmp = this.data.problems[id]
    console.log(tmp)
    let len = this.data.curPro.length
    console.log(len)
    // 把当前选中的加进来
    this.setData({
      curPro: this.data.curPro.concat(tmp),
      response: this.data.response.concat('请联系人工客服'),
      toLast: 'msg-' + len
    })
    console.log(this.data.curPro)
  },
  // 在线客服
  onlineService: function(e) {
    let len = this.data.curPro.length
    this.setData({
      curPro: this.data.curPro.concat('转接在线客服'),
      response: this.data.response.concat('您好, 这里是人工客服'),
      toLast: 'msg-' + len
    })
    console.log(this.data.curPro)

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