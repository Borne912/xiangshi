// miniprogram/pages/comment/comment.js
const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recommend_tag:[],
    custom_tag:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    //读取自定义标签数据
    db.collection('comment_tag').where({
      _openid:app.globalData.openid
    }).get({
      success:function(res){
        console.log(res.data)
        that.setData({
          custom_tag:res.data
        })
      }
    })
    //读取推荐标签数据
    
  },
})