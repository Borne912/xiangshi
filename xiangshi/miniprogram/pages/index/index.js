// miniprogram/pages/index/index.js
const app = getApp();
const db = wx.cloud.database();
const _ = db.command;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    nickName:'',
    avatarUrl: '',
    tel: '',
    openid: '',
    session_key: '',
    WeChatChecked: true,
    visitor:true //判断是否是第一次登录
  },

  /**
   * 用户登录
   */
  userLogin: function(){
    var that = this;
    //获取用户的头像和昵名
    wx.getUserInfo({
      success: (res) => {
        app.globalData.nickName = res.userInfo.nickName
        app.globalData.avatarUrl = res.userInfo.avatarUrl
        that.setData({
          nickName: res.userInfo.nickName,
          avatarUrl: res.userInfo.avatarUrl,
        })
        //将用户数据添加到云端
        if(that.data.visitor == true) {
          db.collection('UsersInfo').add({
            data: {
              nickName: that.data.nickName,
              avatarUrl: that.data.avatarUrl,
              telephone: ''
            },
            success: function(res){
              console.log("上传成功：",res)
            }
          })
          //登录成功，页面跳转
          wx.showLoading({
            title:"登录中，请稍后",
            success: function(res){
              console.log(res)
              setTimeout(function(){
                wx.hideLoading()
              },1500)
              setTimeout(function(){
                wx.switchTab({
                  url: '../food/food'
                })
              },2000)
            }
          })
        }
      },
    })
  },

  /**
   * 登录模式切换
   */
  wechat_ISchecked: function(){
    var that = this;
    that.setData({
      WeChatChecked: !that.data.WeChatChecked, 
    })
    console.log(that.data.WeChatChecked)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //获取用户的OpenId
    wx.cloud.callFunction({
      name: 'getUserInfo',
      complete: res => {
        app.globalData.openid = res.result.openId
       that.setData({
        openid: res.result.openId
       })
       //查询用户是否已经存在
       db.collection('UsersInfo').where({
        _openid: that.data.openid
      })
      .get({
        success: function(res){
          that.setData({
            nickName: res.data[0].nickName,
            avatarUrl: res.data[0].avatarUrl,
            visitor:false
          })
          if(res.data[0]._openid == that.data.openid)
          {
            wx.showLoading({
              title:"登录中，请稍后",
              success: function(res){
                console.log(res)
                setTimeout(function(){
                  wx.hideLoading()
                },1500)
                setTimeout(function(){
                  wx.switchTab({
                    url: '../food/food'
                  })
                },2000)
              }
            })
          }
        }
      })
      }
     })
  },
})