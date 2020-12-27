// miniprogram/pages/mine/mine.js
const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: '', //用户名
    avatarUrl: '', //用户头像图片地址
    tel: '请添加电话号码', //用户手机号码
    input_value: '请输入手机号',
    tel_click: false, //电话修改按钮是否点击
    // 我的账单是否选中(默认不选中)
    myAccount : 0,
    accHeight : 240,
    todayDishes : []
  },

  /**
   * 输入框聚焦时
   */
  bindFocus: function(res){
    var that = this;
    if(res.detail.value == "请输入手机号")
    {
        that.setData({
        input_value: ""
      })
    }
  },

  /**
   * 输入框失去聚焦时
   */
  bindBlur: function(res){
    var that = this;
    if(res.detail.value == "")
    {
      that.setData({
        input_value: "请输入手机号"
      })
    }
  },

  /**
   *  提交表单数据
   */
  bindSubmit: function(res){
    var that = this;
    if(res.detail.value.input!=""&&res.detail.value.input!="请输入手机号")
    {
      app.globalData.tel = res.detail.value.input;
      that.setData({
        tel: res.detail.value.input,
      })
  
      //将电话号码传到云端
      db.collection('UsersInfo').where({
        _openid: app.globalData.openid
      })
      .update({
        data:{
          telephone: that.data.tel
        },
      })

      wx.showToast({
        title: '修改成功',
        icon: 'success',
        duration: 1000
      })
    }
    else
    {
      if(res.detail.value.input == "请输入手机号") {
        wx.showToast({
          title: '号码输入为空！',
          icon: 'none',
          duration: 1500
        })
      }
      else {
        wx.showToast({
          title: '修改失败',
          icon: 'none',
          duration: 1500
        })
      }
    }
  },

  /**
   *  电话号码添加完成
   */
  tel_Completed: function(){
    var that = this;
    that.setData({
      tel_click: !that.data.tel_click
    })
  },

  // 读取数据库函数
  getData: function (e) {
    var that =this
    db.collection("history").where({
      // 限制为本机用户
      date: app.globalData.date,
      _openid: app.globalData.openid,
    }).get({
      success(res) {
        console.log(app.globalData.date)
        console.log(res.data)
        var h = 240 * res.data.length + 20
        that.setData({
          todayDishes : res.data,
          accHeight : h
        })
      }
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
  },
  // 点击我的账单
  selectAccount: function (e) {
    var that = this
    // 异或改变状态(是否选中)
    var tmp = this.data.myAccount^1
    console.log('点击我的账单',tmp)
    that.setData({
      myAccount : tmp
    })
    that.onLoad()
  },
  // 跳转评论
  selectComment: function (e) {
    var id = e.currentTarget.dataset.id
    app.globalData.readyComment = id
    console.log(id)
    wx.navigateTo({
      url: '../writeComment/writeComment',
    })
    console.log('跳转至评论') 
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
    var that = this;
    db.collection('UsersInfo').where({
      _openid: app.globalData.openid
    })
    .get({
      success: function(res){
        that.setData({
          nickName: res.data[0].nickName,
          avatarUrl: res.data[0].avatarUrl,
          tel:res.data[0].telephone!=""?res.data[0].telephone:'请添加电话号码'
        })
      }
    })
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