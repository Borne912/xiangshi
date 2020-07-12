// miniprogram/pages/food/food.js
const db = wx.cloud.database()
var tmp
Page({
    data:{
      font_recommend:[],
      takeout:[],
      // toView:"green"
    },
    onLoad(){
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