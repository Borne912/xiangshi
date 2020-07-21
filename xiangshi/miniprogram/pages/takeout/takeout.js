// pages/takeout/takeout.js
const db = wx.cloud.database()
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    takeout:"",
    navigation:["综合排序","价格低","销量高"],
    Seletctd_Condition:""
  },

  comprehensive_ranking:function(){
    var tmp;
    var that = this;
    var sum = new Array();
    var weight = new Array();
    var price = new Array();
    var sales = new Array();
    var votes = new Array();
    const dishes = that.data.takeout
    for (let i = 0; i < dishes.length; i++) {
      sum[i] = 0;
      weight[i] = 0;
      price[i] = 0;
      sales[i] = 0;
      votes[i] = 0;
    }
    for (let i = 0; i < dishes.length; i++) {
      sum[0] = sum[0] + dishes[i].price;
      sum[1] = sum[1] + dishes[i].sales;
      sum[2] = sum[2] + dishes[i].votes;
    }
    for (let i = 0; i < dishes.length; i++) {
      price[i] = price[i] + dishes[i].price/sum[0];
      sales[i] = sales[i] + dishes[i].sales/sum[1];
      votes[i] = votes[i] + dishes[i].votes/sum[2];
    }
    for (let i = 0; i < dishes.length; i++) {
      weight[i] = price[i] + sales[i] + votes[i];
    }
    for (let i = 0; i < weight.length; i++) {
      for (let j = weight.length - 1; j > i; j--) {
        if(weight[j] > weight[j - 1])
        {
          tmp = dishes[j];
          dishes[j] = dishes[j-1]
          dishes[j-1] = tmp;
        }
      }
    }
    //console.log(weight)
    //console.log(dishes)
    that.setData({
      takeout:dishes
    })
  },

  onShow(){
    var that = this;
    db.collection("outside-take-out").where({
      location:app.globalData.location,
      name:app.globalData.takeout_foodtype
    }).get({
      success(res){
        // console.log(res.data)
        that.setData({
          takeout: res.data[0].dishes,
        })
        //console.log(res.data[0].dishes)
      }
    })
    
  },
  ChangeCondition:function(res){
    var that = this;
    that.setData({
      Seletctd_Condition:res.currentTarget.dataset.id
    })
    //综合排序
    if (that.data.Seletctd_Condition==1) {
      this.comprehensive_ranking()
    }
    //价格排序
    else if (that.data.Seletctd_Condition==2) {
      const dishes = that.data.takeout
      console.log(dishes)
      var tmp;
      for (let i = 0; i < dishes.length; i++) {
        for (let j = dishes.length - 1; j > i; j--) {
          if(dishes[j].sales < dishes[j - 1].sales)
          {
            tmp = dishes[j];
            dishes[j] = dishes[j-1]
            dishes[j-1] = tmp;
          }
        }
        that.setData({
          takeout:dishes
        })
      }
    }
    else{
      const dishes = that.data.takeout
      var tmp;
      for (let i = 0; i < dishes.length; i++) {
        for (let j = dishes.length - 1; j > i; j--) {
          if(dishes[j].sales > dishes[j - 1].sales)
          {
            tmp = dishes[j];
            dishes[j] = dishes[j-1]
            dishes[j-1] = tmp;
          }
        }
        that.setData({
          takeout:dishes
        })
      }
    }
    //console.log(that.data.Seletctd_Condition)
  }
})