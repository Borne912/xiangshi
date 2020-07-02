// pages/takeout/takeout.js
const db = wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    takeout:[]
  },
  onLoad(){
    var that = this;
    db.collection("inside-take-out").get({
      success(res){
        // console.log(res.data)
        that.setData({
          takeout: res.data
        })
        console.log(that.data.takeout)
      }
    })
  }
})