//app.js
// 以下计算日期
const now = new Date()
var year = now.getFullYear();
var month = (now.getMonth()+1);
var day = now.getDate();
App({
  globalData: {// 全局变量
    // 今日日期
    date: year + '-' + month + '-' + day,
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
    // 健康界面的今日饮食(4餐信息)
    fourCan:'早餐',
    /*用户信息*/
    nickName: '', //用户名

    avatarUrl: '', //用户头像图片地址

    tel: '', //用户手机号码

    openid: '', //用户的唯一标识码
    /*当前选中的外卖食物类型*/
    takeout_foodtype:''
  },
  onLaunch: function () {
  wx.cloud.init({
    env:"xiangshi-yqpne",
    traceUser: true
  })
},
})
