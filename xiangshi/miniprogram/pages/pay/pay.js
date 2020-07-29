// miniprogram/pages/pay/pay.js
const app = getApp()
const db = wx.cloud.database()
var util = require('../../utils/utils.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    checked:true, //总的选择按钮
    food_list:"", //食物订单
    total:"", //总价
    comment:"", //备注
    adress:"", //地址
    pay:false,
    payStatus:[
      {time:"7:00",topic:"接单",status:0},{time:"8:00",topic:"制作中",status:0},
      {time:"9:00",topic:"完成",status:0},
      {time:"10:00",topic:"取得",status:0}],
    time:"请选择取餐时间",
    completeOrder:false
  },
  
  /**
   * 添加到我的账单
   */
  AddToBill:function(){
    var that = this;
    var time = util.formatTime(new Date());
    // console.log(that.data.adress.location.substring(0,3))
    // console.log(that.data.adress.location.substring(4,5))
    // console.log(that.data.adress.location.substring(7,8))
    db.collection('history').add({
      data: {
        loc:that.data.adress.location.substring(0,3),
        floor:that.data.adress.location.substring(4,5),
        window:that.data.adress.location.substring(7,8),
        price:that.data.total,
        date:time.date,
        time:time.time.substring(0,5),
        types:that.IntervalJudge(time.time.substring(0,2)),
        imgurl:that.data.food_list[0].imgurl,
        comment:that.data.comment,
        dishes:that.data.food_list,
        TakeMealTime:that.data.time
      },
      success:function(res){
        console.log(res)
        setTimeout(function(){
          wx.switchTab({
            url: '../food/food',
          })
        },2000)
        wx.showToast({
          title: '订单完成',
          icon: 'success',
          duration: 2000
        })
      },
      fail:function(res){
        console.log(res)
      }
    })
  },

  /**
   * 判断时间段函数
   */
  IntervalJudge:function(time) {
    //提取出时间里的hour
    var hour = 0;
    if(parseInt(time.substring(0,1)) == 0) {
      hour = parseInt(time.substring(1,2));
    }
    else {
      hour = parseInt(time.substring(0,2));
    }
    //判断时间段
    if(hour >= 6 && hour <= 8) {
      return '早餐';
    }
    else if(hour > 11 && hour <= 13) {
      return '午餐';
    }
    else if(hour > 17 && hour <= 19) {
      return '晚餐';
    }
    else {
      return '加餐';
    }
  },
   
  /**
   * 按钮选中与取消状态切换
   */
  checkTap: function(res){
    var that = this;  
    const data = that.data.food_list;
    var checked = that.data.checked;
    var tmp = 0;
    //console.log(res.currentTarget.dataset.id)
    if(res.currentTarget.dataset.id == 0)
    {
      checked = !checked;
      for (let i = 0; i < data.length; i++) {
        data[i].checked = checked;
        if(checked == true)
        {
          tmp = tmp + data[i].price * data[i].numb
        }
        else {
          tmp = 0;
        }
      }
      that.setData({
        food_list:data,
        checked:checked,
        total:tmp
      })
    }
    else {
      data[res.currentTarget.dataset.id-1].checked = !data[res.currentTarget.dataset.id-1].checked;
      if(data[res.currentTarget.dataset.id-1].checked == true) {
        that.setData({
          food_list:data,
          total:that.data.total + data[res.currentTarget.dataset.id-1].price
        })
      }
      else {
        that.setData({
          food_list:data,
          total:that.data.total - data[res.currentTarget.dataset.id-1].price
        })
      }
      
    }
  },

  /**
   * 页面转到前台
   */
  onShow(){
    var that = this;
    const data = app.globalData.takeout_addfood;
    var tmp = 0;
    for (let i = 0; i < data.length; i++) {
      if(data[i].checked == true) {
        tmp = tmp + data[i].price * data[i].numb
      }
    }
    //console.log(app.globalData.takeout_takeMeals)
    db.collection('myAddress').where({
      _openid:app.globalData.openid,
      default:true
    }).get({
      success:function(res){
        console.log(res)
        app.globalData.takeout_takeMeals.name = res.data[0].name;
        app.globalData.takeout_takeMeals.tel = res.data[0].tel;
        console.log(app.globalData.takeout_takeMeals)
        that.setData({
          adress: app.globalData.takeout_takeMeals
        })
      }
    })
    that.setData({
      food_list:app.globalData.takeout_addfood,
      total: tmp,
    })
    console.log("dawd",that.data.food_list)
    if(app.globalData.takeout_comment.length>8)
    {
      tmp = app.globalData.takeout_comment.substring(0,7)+"...";
      that.setData({
        comment: tmp == ""?"这里可以输入内容":tmp
      })
    }
    else {
      tmp = app.globalData.takeout_comment;
      that.setData({
        comment: tmp == ""?"这里可以输入内容":tmp
      })
    }
  },

  /**
   * 增加食物数量
   */
  Addfood: function(res){
    var that = this;
    const data = that.data.food_list;
    console.log(res.currentTarget.dataset.name)
    for (let i = 0; i < data.length; i++) {
      if(data[i].name == res.currentTarget.dataset.name) {
        data[i].numb = data[i].numb + 1;
        if(data[i].checked == true)
        {
          that.setData({
            food_list: data,
            total: that.data.total + data[i].price
          })
        } 
        else {
          that.setData({
            food_list: data,
          })
        }
        app.globalData.takeout_numb = app.globalData.takeout_numb + 1;
      }
    }
  },

  /**
   * 减少食物数量
   */
  Subfood: function(res){
    var that = this;
    const data = that.data.food_list;
    console.log(res.currentTarget.dataset.name)
    for (let i = 0; i < data.length; i++) {
      if(data[i].name == res.currentTarget.dataset.name) {
        data[i].numb = data[i].numb - 1;
        if(data[i].checked == true)
        {
          that.setData({
            food_list: data,
            total: that.data.total - data[i].price
          })
        } 
        else {
          that.setData({
            food_list: data,
          })
        }
        app.globalData.takeout_numb = app.globalData.takeout_numb - 1;
      }
    }
  },

  /**
   * 页面跳转
   */
  pageJumps:function(res){
    wx.navigateTo({
      url: '../comment/comment',
    })
  },

  /**
   * 确认支付
   */
  confirmPay:function(){
    var that = this;
    var tmp;
    that.setData({
      pay:true
    })
    //模拟订单的交易过程
    setTimeout(function(){
      that.setData({
        "payStatus[0].status":1
      })
    },2000)
    setTimeout(function(){
      that.setData({
        "payStatus[1].status":1
      })
    },4000)
    setTimeout(function(){
      that.setData({
        "payStatus[2].status":1
      })
    },6000)
    setTimeout(function(){
      that.setData({
        "payStatus[3].status":1
      })
    },8000)
    //提示
    wx.showToast({
      title: '支付成功',
      icon: 'success',
      duration: 2000
    })
  },

  /**
   * 取消订单
   */
  cancelOrder:function(){
    //提示
    wx.showToast({
      title: '取消成功',
      icon: 'success',
      duration: 1000
    })
    setTimeout(function(){
      wx.switchTab({
        url: '../food/food',
        success:function(res){
          console.log(res)
        },
        fail:function(res){
          console.log(res)
        }
      })
    },1000)
  },

  /**
   * 完成订单
   */
  completeOrder:function(){
    const that = this;
    that.AddToBill();
    that.setData({
      completeOrder:true
    })
  },

  onUnload: function() {
    // 页面销毁时执行
    const that = this;
    if(that.data.pay == true&&that.data.completeOrder == false) {
      if(that.data.payStatus[3].status == 1) {
        that.AddToBill();
      }
      else{
        wx.switchTab({
          url: '../food/food',
        })
      }
    }
  },

  /**
   * 选择取餐时间
   */
  selectedTime:function(res) {
    const that = this;
    console.log(res.detail.value)
    that.setData({
      time:res.detail.value
    })
  }
})