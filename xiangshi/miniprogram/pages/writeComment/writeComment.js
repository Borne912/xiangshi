// miniprogram/pages/writeComment/writeComment.js
const db= wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cur:[],
    // 评价
    cmm: []
  },
  getData: function (e) {
    var that = this
    var ready = app.globalData.readyComment
    this.setData({
      cur: ready
    })
    // db.collection("dishes").where({
    //   loc: ready.loc,
    //   name: ready.name
    // }).get({
    //   success(res) {
    //     //console.log(res.data[0])
    //     that.setData({
    //       cur : res.data[0],
    //       metal_datas: res.data[0].metal,
    //       vitamin_datas: res.data[0].vitamin,
    //       ying: res.data[0].yingyang,
    //     })
    //   }
    // })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
  },
  // 写入评价数据
  comment: function (e) {
    var ready = app.globalData.readyComment
    var that = this
    // 历史记录数据库
    if(this.data.cmm == '') {
      console.log('请输入')
      wx.showToast({
        title: '不可以输入空数据哦!',
        icon: "none"
      })
    }
    else {
      db.collection('history').where({
        _openid: app.globalData.openid,
        name: ready.name,
        date: ready.date
      }).update({
        data:{
          comment: that.data.cmm
        },success(res) {
          wx.showToast({
            title: '评价成功!',
            icon:"none"
          })
        }
      })
    }
    
  },
  inputCmm: function (e) {
    var input = e.detail.value
    console.log(input)
    this.setData({
      cmm : input
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