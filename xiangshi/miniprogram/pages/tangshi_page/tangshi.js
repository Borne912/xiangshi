// miniprogram/pages/tangshi_page/tangshi.js
// 堂食食堂细页
const DB = wx.cloud.database().collection("style_windows")
let tmp

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 窗口排队人数(1-12窗口)
    cnts: [8,3,4,5,2,10,4,11,3,4,5],
    // 3个按钮(列)
    buttons_cols: [{id: 1, name: '综合排序'},
              {id: 2, name: '速度快'},
              {id: 3, name: '销量高'}],
    // 选择窗口按钮(行)
    // buttons_rows : [{_id:1, id : 1, name: '1'}]
    buttons_rows : [{_id:1, id : 1, name: '1', checked: true}],
    flag : '1'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {   
    var that = this;
    console.log(this.data.buttons_rows[0].checked)
    DB.get({     
      success(res){
        // console.log(res.data)
        // console.log("查询数据成功",res.data[1].name)
        tmp = res.data
        that.data.buttons_rows = tmp
        // callback(tmp)
        console.log(tmp)
        that.setData({
          buttons_rows: that.data.buttons_rows,
        })
      }
    })
    if(this.data.buttons_cols) {
      this.data.buttons_cols[0].checked = true;      
    }     
    this.setData({
      cnts : this.data.cnts,
      buttons_cols : this.data.buttons_cols,
      // buttons_rows : tmp     
    })
    console.log(this.data.buttons_rows)
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
      flag : 'x'
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
    console.log(this.data.buttons_rows);
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