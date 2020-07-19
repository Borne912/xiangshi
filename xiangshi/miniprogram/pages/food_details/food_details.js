// miniprogram/pages/food_details/food_details.js
const db= wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: 'cloud://xiangshi-yqpne.7869-xiangshi-yqpne-1302514195/image/hongbo/first_floor/window_1/rice.jpg',
    metal_names : {Ca:'钙',Fe:'铁',Ka:'钾',Mg:'镁',Na:'钠',Zn:'锌'},
    //metal_datas : [4.5,5.6,1.2,7.4,2.3,9.0],
    metal_datas:[],
    ying:[],
    vitamin_names : {VA:'A',VB1:'B1',VB2:'B2',VB3:'B3',VC:'C',VE:'E'},
    vitamin_datas : [1.5,2.6,3.2,4.4,5.3,6.0],
    rates : ['"体验感很好, 能够吃而且便宜"',
            '"吃就完事了"',
            '"听我的,就这了"',
            '"为什么有好多没听过的菜?"'],
    cur:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getData: function (e) {
    let that = this
    // that.data.metal_datas = []
    console.log(app.globalData.curDish)
    db.collection("dishes").where({
      loc: app.globalData.location,
    // floor:app.globalData.floor,
    //  window :app.globalData.window,
      name: app.globalData.curDish
    }).get({
      success(res) {
        console.log(res.data[0])
        that.setData({
          cur : res.data[0],
          metal_datas: res.data[0].metal,
          vitamin_datas: res.data[0].vitamin,
          ying: res.data[0].yingyang,
        })
      }
    })

  },
  // 根据时间判断用餐类别
  judgeType: function (e) {
    if(e >= 5 && e <= 8)
      return '早餐'
    else if(e >= 11 && e <= 13)
      return '午餐'
    else if( e >= 17 && e <= 19)
      return '晚餐'
    else 
      return '加餐'
  },
  // 构造_id(根据时间构造)
  structId: function (e) {
    var now = new Date()
    var year = now.getFullYear().toString();
    var month =(now.getMonth() < 9 ? '0' : '')+(now.getMonth()+1);
    var day = (now.getDate() < 10 ? '0' : '')+(now.getDate());
    var time = now.getHours().toString()+ now.getMinutes() + now.getSeconds()
    var res = year + month + day + time
    console.log(res)
    return res
  },
  // 写入数据库数据
  writeData: function (e) {
    var now = new Date()
    var id =  this.structId()
    var time = now.getHours() + ':' +now.getMinutes()
    var ying = e.yingyang
    var types = this.judgeType(now.getHours())
    // 历史记录数据库
    db.collection('history').add({
      data:{
        _id : id,
        name : e.name,
        loc : e.loc,
        floor : e.floor,
        window : e.window,
        date : app.globalData.date,
        time : time,
        types : types,
        price : e.price,
        yingyang : {re : ying.re, tanshui : ying.tanshui, 
                    danbai : ying.danbai, zhifang: ying.zhifang},
        commit : "",
        imgurl : e.imgurl
      }
    })
  },
  onLoad: function (options) {
    this.getData()
    console.log(this.data.cur)
    console.log(this.data.ying)
    
  },
  // 此函数为按钮事件,将此dish加入饮食记录(全局变量)
  addData: function(e) {
    var dishes = app.globalData.dishes
    dishes.push(this.data.cur)
    console.log('添加成功!',this.data.cur.name); 
    this.writeData(this.data.cur)
    wx.showToast({
      title: '添加成功',
      icon: 'success',
    })
    
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