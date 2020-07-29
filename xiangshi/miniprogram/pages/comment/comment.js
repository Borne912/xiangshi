// miniprogram/pages/comment/comment.js
const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recommend_tag:[],
    custom_tag:[],
    textarea_content:"",
    adress:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 读取自定义标签
   */
  Fetch_customTag:function() {
    var that = this;
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
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    //读取备注
    that.setData({
      textarea_content:app.globalData.takeout_comment
    })
    //读取自定义标签数据
    that.Fetch_customTag();
    //读取推荐标签数据
    db.collection('comment_tag').where({
      type:"recommend"
    }).get({
      success:function(res){
        //console.log(res.data)
        that.setData({
          recommend_tag:res.data
        })
      }
    })
    //读取地址
    that.setData({
      adress:app.globalData.takeout_takeMeals
    })
  },

  onReady: function(){
    this.popup = this.selectComponent("#popup")
  },

  /**
   * 选择标签
   */

   selectedTag:function(res){
     console.log(res.currentTarget.dataset.content)
     var that = this;
     if(that.data.textarea_content=="")
     {
      that.setData({
        textarea_content:res.currentTarget.dataset.content
       })
     }
     else {
      that.setData({
        textarea_content: that.data.textarea_content+"，"+res.currentTarget.dataset.content
       })
     }
   },

   /**
   * 提交备注
   */
   submitComment:function(res){
    app.globalData.takeout_comment = res.detail.value.input;
    wx.navigateBack({
      complete: (res) => {
        console.log(res)
      },
    })
    
   },

   /**
   * 添加标签
   */
  addTag:function(){
    let popup = this.popup;
    popup.show();
  },

  popupCancel:function(){
    let popup = this.popup;
    popup.hide();
  },

  submitTag:function(res){
    var that = this;
    console.log(res.detail.value.input)
    if(res.detail.value.input != "") {
      db.collection('comment_tag').add({
        data:{
          // openid:app.globalData.openid, 系统自动会加上
          content:res.detail.value.input,
          type:"custom"
        },
        success:function(res) {
          console.log(res)
          wx.showToast({
            title: '添加成功',
            icon: 'success',
            duration: 1500
          })
          setTimeout(function () {
            that.Fetch_customTag();
            that.popup = that.selectComponent("#popup");
            let popup = that.popup;
            popup.hide();
          }, 2000)
          
        },
        fail:function(res) {
          console.log(res)
          wx.showToast({
            title: '添加失败',
            icon: 'none',
            duration: 2000
          })
        }
      })
    }
    else {
      wx.showToast({
        title: '输入的内容为空！',
        icon: 'none',
        duration: 2000
      })
    }
  }
})