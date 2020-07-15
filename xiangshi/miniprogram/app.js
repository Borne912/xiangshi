//app.js

App({
  globalData: {// 全局变量
    // 默认地点鸿博园
    location : "鸿博园",
    // 楼层
    floor : 1,
    // 窗口
    window : 1,
    // 当前选中菜名
    curDish: '',
    // 饮食记录
    dishes:[],
    /*用户信息*/
    nickName: '', //用户名

    avatarUrl: '', //用户头像图片地址

    tel: '', //用户手机号码

    openid: '', //用户的唯一标识码
    
  },
  onLaunch: function () {
  wx.cloud.init({
    env:"xiangshi-yqpne",
    traceUser: true
  })
},
})
