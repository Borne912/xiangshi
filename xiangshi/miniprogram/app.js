//app.js
// 以下计算日期
var util = require('utils/utils.js');
var time = util.formatTime(new Date());
App({
  globalData: {// 全局变量
    // 今日日期
    date: time.date,
    // 默认地点鸿博园
    location : "鸿博园",
    // 默认地址
    address: [],
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

    openid: 'ofl4t5K3mXcvbChc7Z63bQkNSjBM', //用户的唯一标识码
    
    address: '', //用户收货地址
    /*外卖用到的一些全局变量*/
    takeout_foodtype:'', //当前选中的外卖食物类型
    takeout_addfood:[], //将食物添加到订单
    
    takeout_numb:0, //外卖菜品数量

    takeout_comment:'', //外卖备注

    takeout_takeMeals: {location:'',name:'',tel:''} //取餐信息
  },
  onLaunch: function () {
  wx.cloud.init({
    env:"xiangshi-yqpne",
    traceUser: true
  })
},
})
