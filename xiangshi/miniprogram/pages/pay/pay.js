// miniprogram/pages/pay/pay.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked:true, //总的选择按钮
    food_list:"",
    total:"", //总价
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
  }
})