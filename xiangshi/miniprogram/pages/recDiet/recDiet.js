// miniprogram/pages/recDiet/recDiet.js
// 这是饮食推荐页
const DB = wx.cloud.database().collection("diet_recommendation")
const db_windows = wx.cloud.database().collection("style_windows")
var tmp1
var tmp2
var tmp3
var tmp4
// var arr = []

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 日期(字符串,x年x月x日)
    date: '',
    iconUrl: 'cloud://xiangshi-yqpne.7869-xiangshi-yqpne-1302514195/image/icon/shua.png',
    // 四大餐
    classes: ['早餐','午餐','晚餐','加餐'],
    // 基础高度130(头尾), 每个板块172 
    basic: 130,
    heights: [0,0,0,0],
    // breakfast: [{id: '早餐', name: '玉米', destribe: '2根 重368g', ka: 412, 
    //             other: '主食',src:''},
    //             {id: '早餐', name: '豆浆', destribe: '300ml', ka: 48, 
    //             other: '主食',src:''},
    //             {id: '早餐', name: '无花果', destribe: '2个 重10g', ka: 13, 
    //             other: '蔬菜水果',src:''}],
    // lunch: [{id: '午餐', name: '黑米饭', destribe: '1碗 重300g', ka: 387, 
    //             other: '主食',src:''},
    //             {id: '午餐', name: '猪血', destribe: '150g', ka: 82, 
    //             other: '肉蛋豆奶',src:''},
    //             {id: '午餐', name: '甜椒', destribe: '2个 重200g', ka: 50, 
    //             other: '蔬菜水果',src:''}],
    // dinner: [{id: '早餐', name: '玉米', destribe: '2根 重368g', ka: 412, 
    //             other: '主食',src:''},
    //             {id: '早餐', name: '豆浆', destribe: '300ml', ka: 48, 
    //             other: '主食',src:''},
    //             {id: '早餐', name: '无花果', destribe: '2个 重10g', ka: 13, 
    //             other: '蔬菜水果',src:''}],
    // addfood: [{id: '早餐', name: '玉米', destribe: '2根 重368g', ka: 412, 
    //             other: '主食',src:''},
    //             {id: '早餐', name: '豆浆', destribe: '300ml', ka: 48, 
    //             other: '主食',src:''},
    //             {id: '早餐', name: '无花果', destribe: '2个 重10g', ka: 13, 
    //             other: '蔬菜水果',src:''}],  
    breakfast: [],
    lunch: [],
    dinner: [],
    addfood: [],
    // 以下代表各餐总热量
    hot1 : 1,
    hot2: 2,
    hot3: 3,
    hot4: 4,
    cnt:[3,3,3,2]
  },

  getToday: function(){
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth()+1;
    var day = now.getDate();
    this.setData({
      date: year + '年' + month + '月' + day + '日'
    })
  },
  // 计算各餐热量
  getKa: function(e) {
    console.log(e)
    var hot = 0;
    for(var i = 0; i<e.length; i++) {
      hot = hot + e[i].ka
    }
    return hot
  },
  // 从数据库调取数据(饮食推荐)
  getData: function (e) {
    // 目的是把数据库里的数据分4次拿出来(早餐,午餐,晚餐,加餐的顺序)
    // 最终效果是total=[breakfast, lunch, dinner, addfood]
    var that = this
    // 调取数据(4餐)
    DB.where({//早餐
     id : '早餐'
    }).get({     
      success(res){
        console.log(res.data)
        var hot = that.getKa(res.data)
        that.setData({
          breakfast: res.data,
          hot1: hot
        })
      }
    })
    DB.where({//午餐
      id : '午餐'
     }).get({     
       success(res){
        var hot = that.getKa(res.data)
        that.setData({
          lunch: res.data,
          hot2: hot
        })
       }
     }) 
    DB.where({// 晚餐
    id : '晚餐'
    }).get({     
      success(res){
        var hot = that.getKa(res.data)
        that.setData({
          dinner: res.data,
          hot3: hot
        })
      }
    })
    DB.where({//加餐
      id : '加餐'
      }).get({     
      success(res){
        var hot = that.getKa(res.data)
        that.setData({
          addfood: res.data,
          hot4: hot
        })
      }
     
    })
    // this.setData({
    //   total : arr
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getToday()   
    this.getData()
    var that = this;
    for(var i=0; i<4; i++) { // 计算高度
      this.data.heights[i] = 130+172*that.data.cnt[i]
    }
    this.setData({
      heights: this.data.heights,
    })
  },
  // 换一换Tap
  changeTap: function(e) {    
    wx.showToast({
      title: '暂时没有新的推荐哦!',
      icon: 'none'
    })
    console.log(this.data.breakfast)
    console.log(this.data.lunch)
    console.log(this.data.dinner)
    console.log(this.data.addfood)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})