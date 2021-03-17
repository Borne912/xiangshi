// miniprogram/pages/tangshi_page/tangshi.js
// 堂食食堂细页
const db_windows = wx.cloud.database().collection("style_windows")
const db_dishes = wx.cloud.database().collection("dishes")
const db_numbers = wx.cloud.database().collection("curr_per_nums")
let tmp
let food_tmp
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 窗口排队人数(1-10窗口)
    cnts: [0,0,0,0,0,0,0,0,0,0],
    // cnts: [8,3,4,5,2,10,4,11,3,6],
    // 3个按钮(列)
    window_id: 1,
    buttons_cols: [{id: 1, name: '综合排序', checked: true},
              {id: 2, name: '速度快',checked: false},
              {id: 3, name: '销量高',checked: false}],
    // 选择窗口按钮(行)
    // buttons_rows : [{_id:1, id : 1, name: '1'}]
    windows : [],
    height: 1200,
    // 调取云存储的图片(头+图片名(存储在数据库))
    // 前缀+地点+楼层+窗口+菜名(舍弃方案)
    url_Pre: 'cloud://xiangshi-yqpne.7869-xiangshi-yqpne-1302514195/image/',
    // loc: 'hongbo/',
    // floor: 'first_floor/',
    // win: 'window_',
    // id: 1 ,
    // url_Head: "",
    url_Img: ["蒜蓉生蚝.jpg",'酥肉炸鱼.jpg','水煮鱼.jpg','卤虾.jpg',
              '烤虾.jpg','大头鱼.jpg','鱿鱼圈.jpg'],
    // 菜品集合信息(名称+地点+楼层+窗口+图片地址+类型+月售+赞+价格+碳水+蛋白+脂肪)
    dishes:[],
    yingyang:[]
  },
  getData: function (e) {
    var that = this;
    db_windows.get({     
      success(res){
        console.log(res.data)
        that.setData({
          windows: res.data         
        })
      }
    })
    // 菜品数据库调取数据
    db_dishes.where({
      //窗口信息
      loc: app.globalData.location,
      floor:app.globalData.floor,
      window : that.data.window_id
    }).get({     
      success(res){
        console.log(res.data)
        that.setData({
          dishes: res.data,
        })
      }
    })
    // 根据食堂+楼层确定窗口人数
    db_numbers.where({
      loc: app.globalData.location,
      floor:app.globalData.floor
    }).get({
      success(res){
        console.log(res.data[0].numbers)
        that.setData({
          cnts: res.data[0].numbers,
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {   
    let that = this
    this.getData()
    this.setData({
      cnts : this.data.cnts,
      height: 100*this.data.cnts.length,    
    })
    setInterval(function(){
      db_numbers.where({
        loc: app.globalData.location,
        floor:app.globalData.floor
      }).get({
        success(res){
          console.log(res.data[0].numbers)
          that.setData({
            cnts: res.data[0].numbers,
          })
          console.log('刷新排队人数成功!')
        }
      })
    },30000)
  },
  // 横着的按钮切换
  radioButtonTap : function (e){   
    // console.log(e)
    let id = e.currentTarget.dataset.id
    console.log(id)
    for (let i = 0; i < this.data.buttons_cols.length; i++) {
      if (this.data.buttons_cols[i].id == id) {
        this.data.buttons_cols[i].checked = true;
      }
      else {//其他的位置为false   
        this.data.buttons_cols[i].checked = false;
      }
    }
    this.setData({
      buttons_cols: this.data.buttons_cols,
    })
  },
  // 窗口切换
  Buttons_rowsTap : function (e){
    let id = e.currentTarget.dataset.id
    console.log(id)
    let that = this
     db_dishes.where({
      // 转int
      loc: app.globalData.location,
      floor:app.globalData.floor,
      window : parseInt(id)
    }).get({     
      success(res){
        console.log(res.data)
        that.setData({
          dishes: res.data
        })
      }
    })
    for (let i = 0; i < this.data.windows.length; i++) {
      if (this.data.windows[i].id == id) {
        this.data.windows[i].checked = true;
      }
      else {//其他的位置为false   
        this.data.windows[i].checked = false;
      }
    }
    this.setData({
      windows: this.data.windows,
      window_id: id
    })
    console.log(this.data.dishes_List)

  },
  selectFood: function(e) {   
    let id = e.currentTarget.dataset.id
    app.globalData.curDish = id
    console.log(id)
    wx.navigateTo({
      //目的页面地址
      url: '../food_details/food_details',
      success: function(res){
        console.log("跳转成功")
      },
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
    this.onLoad()
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