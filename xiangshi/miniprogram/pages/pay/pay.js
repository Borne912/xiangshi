// miniprogram/pages/pay/pay.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked:false,
    food_list:"",
    total:"", //总价
  },
  
  /**
   * 按钮选中与取消状态切换
   */
  checkTap: function(){  
    var that = this;
    var checked = that.data.checked;
    that.setData({
      "checked": !checked
    })
  },

  /**
   * 页面转到前台
   */
  onShow(){
    var that = this;
    const data = app.globalData.takeout_addfood;
    var tmp = 0;
    for (let i = 0; i < data.length; i++) {
      tmp = tmp + data[i].price 
    }
    console.log(tmp)
    that.setData({
      food_list:app.globalData.takeout_addfood,
      total: tmp
    })
    console.log("dawd",that.data.food_list)
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
        that.setData({
          food_list: data,
          total: that.data.total + data[i].price
        })
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
        that.setData({
          food_list: data,
          total: that.data.total - data[i].price
        })
        app.globalData.takeout_numb = app.globalData.takeout_numb - 1;
      }
    }
  }
})