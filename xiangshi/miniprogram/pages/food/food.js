// miniprogram/pages/food/food.js
const db = wx.cloud.database()
const app = getApp()
var tmp
Page({
    data:{
      font_recommend:[],
      takeout:[],
      location:"万秀园",
    },
    onLoad(){
      // 页面创建时执行
      var that = this; 
      db.collection("font_recommend").get({
        success(res){
          //console.log("查询数据成功",res)
          tmp = res.data
          that.setData({
            font_recommend: tmp
          })
        }
      })
      db.collection("outside-take-out").get({
        success(res){
          //console.log("查询数据成功",res.data[1].name)
          tmp = res.data
          //console.log(tmp[1].name)
          that.setData({
            takeout:tmp
          })
        }
      })
    },
    onShow: function() {
      // 页面出现在前台时执行
      var that =this;
      //console.log(app.globalData.location)
      that.setData({
        location: app.globalData.location
      })
      //console.log(that.data.location)
    },
    selectFloor: function (e) {
      let id = e.currentTarget.dataset.id
      let app = getApp()
      app.globalData.floor = parseInt(id)
      console.log(typeof(app.globalData.floor))
      wx.navigateTo({
        //目的页面地址        
        url: '../tangshi_page/tangshi',
        success: function(res){
          console.log("跳转成功")
        },
      })    
    }
})