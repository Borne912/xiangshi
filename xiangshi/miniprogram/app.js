//app.js

App({
  globalData: {// 全局变量
    // 默认地点鸿博园
    location : "鸿博园",
    // 楼层
    floor : 2,
    // 窗口
    window : 1,
    // 当前选中菜名
    curDish: '',

  },
  onLaunch: function () {
  wx.cloud.init({
    env:"xiangshi-yqpne"
  })
},
})
