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
    Seletctd_Condition:1, //默认综合排序
    numb:0
  },
  
  comprehensive_ranking:function(){
      var tmp;
      var that = this;
      var sum = [];
      var weight = [];
      var price = [];
      var sales = [];
      var votes = [];
      const dishes = that.data.takeout
      for (let i = 0; i < dishes.length; i++) {
        sum[i] = 0;
        weight[i] = 0;
        price[i] = 0;
        sales[i] = 0;
        votes[i] = 0;
      }
      //通过求占比的方法筛选
      for (let i = 0; i < dishes.length; i++) {
        sum[0] = sum[0] + dishes[i].price;
        sum[1] = sum[1] + dishes[i].yueshou;
        sum[2] = sum[2] + dishes[i].zan;
      }
      for (let i = 0; i < dishes.length; i++) {
        price[i] = price[i] + sum[0]/dishes[i].price;
        sales[i] = sales[i] + dishes[i].yueshou/sum[1];
        votes[i] = votes[i] + dishes[i].zan/sum[2];
      }
      for (let i = 0; i < dishes.length; i++) {
        weight[i] = price[i]*0.1 + sales[i]*0.3 + votes[i]*0.6;
      }
      for (let i = 0; i < weight.length; i++) 
      {
        for (let j = weight.length - 1; j > i; j--) 
        {
          if(weight[j] > weight[j - 1])
          {
          tmp = dishes[j];
          dishes[j] = dishes[j-1]
          dishes[j-1] = tmp;
          tmp = weight[j];
          weight[j] = weight[j-1]
          weight[j-1] = tmp
         }
      }
    }
      that.setData({
        takeout:dishes
      })
  },

  Inquire_dishes:function(){
    var that = this;
    const tasks = [];
    var i = 0;
    db.collection("outside-take-out").where({
      location:app.globalData.location,
      name:app.globalData.takeout_foodtype
    }).get({
      success(res){
        for (i = 0; i < res.data[0].dishes.length; i++) {
          db.collection('dishes').where({
            _id:res.data[0].dishes[i].takeout_id
          }).get({
            success(res){
              tasks.push(res.data[0])
              console.log(tasks)
              that.setData({
                takeout:tasks,
                numb:app.globalData.takeout_numb
              })
              that.comprehensive_ranking()
            }
          })
        }
      }
    })
  },

  onShow(){
    this.Inquire_dishes()
    
  },

  ChangeCondition:function(res){
    var that = this;
    that.setData({
      Seletctd_Condition:res.currentTarget.dataset.id
    })
    //console.log(that.data.Seletctd_Condition)
    //综合排序
    if (that.data.Seletctd_Condition==1) 
    {
      this.comprehensive_ranking();
    }
    //价格排序
    else if (that.data.Seletctd_Condition==2) {
      const dishes = that.data.takeout
      var tmp;
      for (let i = 0; i < dishes.length; i++) {
        for (let j = dishes.length - 1; j > i; j--) {
          if(dishes[j].price < dishes[j - 1].price)
          {
            tmp = dishes[j];
            dishes[j] = dishes[j-1]
            dishes[j-1] = tmp;
          }
        }
      }
      //console.log(dishes)
      that.setData({
        takeout:dishes
      })
    }
    else{
      const dishes = that.data.takeout
      var tmp;
      for (let i = 0; i < dishes.length; i++) {
        for (let j = dishes.length - 1; j > i; j--) {
          if(dishes[j].yueshou > dishes[j - 1].yueshou)
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
  },

  Add_dishes:function(res){
    var that = this;
    var flag = false;
    var tmp = {_id:"",name:"",numb:0,price:"",imgurl:"",checked:true};
    const date = app.globalData.takeout_addfood;
    app.globalData.takeout_numb = app.globalData.takeout_numb+1;
    that.setData({
      numb:app.globalData.takeout_numb
    })
    //console.log(res.currentTarget.dataset)
    for (let i = 0; i < date.length; i++) {
      if(date[i].name == res.currentTarget.dataset.name){
        date[i].numb = date[i].numb + 1;
        flag = true;
      }
    }
    if(!flag)
    {
      tmp.name = res.currentTarget.dataset.name;
      tmp.numb = 1;
      tmp.price = res.currentTarget.dataset.price;
      tmp.imgurl = res.currentTarget.dataset.imgurl;
      tmp._id =  res.currentTarget.dataset._id;
      app.globalData.takeout_addfood.push(tmp);
    }
    console.log(app.globalData.takeout_addfood)
  },

  //点击跳转食物详情页面
  selectFood: function (e) {
    let id = e.currentTarget.dataset.id
    app.globalData.curDish = id
    wx.navigateTo({
      url: '../food_details/food_details',
    })

  },

  //跳转到支付页
  NavigateToPay:function(){
    const that = this;
    if(that.data.numb >0) {
      wx.navigateTo({
        url: '../pay/pay',
      })
    }
    else {
      wx.showToast({
        title: '请选择食物！',
        icon: 'none',
        duration: 2000
      })
    }
  }
})