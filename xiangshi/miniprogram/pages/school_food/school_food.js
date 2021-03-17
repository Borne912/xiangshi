// miniprogram/pages/school_food/school_food.js
const db = wx.cloud.database()
const app = getApp()
var tmp
Page({

  /**
   * 页面的初始数据
   */
    data: {
     month_food : [],
      week_food : [],
      day_food : [],
      xindong : [] ,
      recommend_food : [],
      dianzhan1 : true ,
      dianzhan2: true,
      dianzhan : true,
      dianzhan3:[true,true,true,true,true,true],
      width1:  150,
      height1 : 316,
     loc:"鸿博园",
    },
    readDataBase(){
     var that = this; 
     /**************************************/
     // 以下开始读数据库
      /**************************************/
     // 1.周榜单
     db.collection("test").where({
       
    }).get({
       success(res){
         //console.log(res.data)
          that.setData({
            week_food : res.data
         })
        }
     })
      // 2.月榜单
      db.collection("test").where({
        type:"月榜单"
    }).get({
       success(res){
         //console.log(res.data)
          that.setData({
            month_food : res.data
          })
       }
      })
      db.collection("test").where({
        type:"月榜单"
    }).get({
       success(res){
         //console.log(res.data)
          that.setData({
            day_food : res.data,
            xindong : res.data
          })
       }
      })
      db.collection("recommend").where({
    }).get({
       success(res){
         //console.log(res.data)
          that.setData({
            recommend_food : res.data
          })
       }
      })
    },
    zan1:function(e)
    {
      let that = this
      let test0 = false
      var dianzhan0 = that.data.dianzhan2
      if(dianzhan0)
      {
        that.setData({
          dianzhan : test0,
          dianzhan1 : test0,
          height1 : 356
        })
      }

    },
    zan2:function(e)
    {
      let that = this
      let test0 = false
      var dianzhan0 = that.data.dianzhan1
      if(dianzhan0)
      {
        that.setData({
          dianzhan : test0,
         dianzhan2 : test0,
         height1 : 356
        })
      }

    },
    changepage:function(e){
      let that = this
      wx.navigateTo({
        url: '../List/list',
      })
    },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.readDataBase()
    dianzhan[0] = true
    dianzhan[1] = true  
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