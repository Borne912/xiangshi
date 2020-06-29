// miniprogram/pages/food/food.js
const DB = wx.cloud.database().collection("font_recommend")
var tmp
Page({
    data:{
      font_recommend:[]
    },
    onLoad(){
      var that = this;
      DB.get({
        
        success(res){
          console.log("查询数据成功",res.data[1].name)
          tmp = res.data
          console.log(tmp[1].name)
          that.setData({
            font_recommend: tmp
          })
        }
      })
    },
})