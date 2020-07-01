//app.js

App({
  globalData: {// 全局变量
    // 默认地点鸿博园
    location : "鸿博园"
  },
  onLaunch: function () {
    
    // 这是一句注释22:30
      wx.cloud.init({
        env:"xiangshi-yqpne"
      })
  
  }
})
