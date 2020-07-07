// miniprogram/pages/tangshi_page/tangshi.js
// 堂食食堂细页
const db_windows = wx.cloud.database().collection("style_windows")
const db_dishes= wx.cloud.database().collection("dishes")
let tmp
let food_tmp
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 窗口排队人数(1-12窗口)
    cnts: [8,3,4,5,2,10,4,11,3,4,5],
    // 3个按钮(列)
    window_id: 1,
    buttons_cols: [{id: 1, name: '综合排序'},
              {id: 2, name: '速度快'},
              {id: 3, name: '销量高'}],
    // 选择窗口按钮(行)
    // buttons_rows : [{_id:1, id : 1, name: '1'}]
    buttons_rows : [{_id:1, id : 1, name: '1', checked: true}],
    flag : '1',
    height: 1200,
    // 调取云存储的图片(头+图片名(存储在数据库))
    // 前缀+地点+楼层+窗口+菜名(舍弃方案)
    url_Pre: 'cloud://xiangshi-yqpne.7869-xiangshi-yqpne-1302514195/image/',
    loc: 'hongbo/',
    floor: 'first_floor/',
    win: 'window_',
    id: 1 ,
    url_Head: "",
    url_Img: ["蒜蓉生蚝.jpg",'酥肉炸鱼.jpg','水煮鱼.jpg','卤虾.jpg',
              '烤虾.jpg','大头鱼.jpg','鱿鱼圈.jpg'],
    // 菜品集合信息(名称+地点+楼层+窗口+图片地址+类型+月售+赞+价格+碳水+蛋白+脂肪)
    dishes_List:[]
  },
  getData: function (e) {
    var that = this;
    db_windows.get({     
      success(res){
        console.log(res.data)
        that.setData({
          buttons_rows: res.data         
        })
      }
    })
    // 菜品数据库调取数据
    db_dishes.where({
      window : that.data.window_id
    }).get({     
      success(res){
        console.log(res.data)
        that.setData({
          dishes_List: res.data     
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {   
    this.getData()
    if(this.data.buttons_cols) {
      this.data.buttons_cols[0].checked = true;      
    }     
    this.setData({
      cnts : this.data.cnts,
      buttons_cols : this.data.buttons_cols,
      height: 100*this.data.cnts.length,
      // 地址头部(舍弃方案)
      // url_Head: this.data.url_Pre + this.data.loc + this.data.floor+this.data.win + this.data.id + '/',
      // buttons_rows : tmp     
    })
  },
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
  Buttons_rowsTap : function (e){
    let id = e.currentTarget.dataset.id
    console.log(id)
    let that = this
    db_dishes.where({
      // 转int
      window : parseInt(id)
    }).get({     
      success(res){
        console.log(res.data)
        that.setData({
          dishes_List: res.data
        })
      }
    })
    for (let i = 0; i < this.data.buttons_rows.length; i++) {
      if (this.data.buttons_rows[i].id == id) {
        this.data.buttons_rows[i].checked = true;
      }
      else {//其他的位置为false   
        this.data.buttons_rows[i].checked = false;
      }
    }
    this.setData({
      buttons_rows: this.data.buttons_rows,
      flag : 'x',
      window_id: id
    })
    console.log(this.data.dishes_List)

  },
  food_Jump: function(e) {
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