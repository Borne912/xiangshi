// miniprogram/pages/food/food.js
const db = wx.cloud.database()
var tmp
Page({
    data:{
      font_recommend:[],
      takeout:[],
      loc:"鸿博园",
      floor:{"1":"一","2":"二","3":"三","4":"四"},
      window:{"1":"一","2":"二","3":"三","4":"四","5":"五",
              "6":"六","7":"七","8":"八","9":"九","10":"十"},
      stars:[]
      // toView:"green"
    },
    onLoad(){
      var that = this;
      var app = getApp()
      
      db.collection("font_recommend").get({
        success(res){
          //console.log("查询数据成功",res)
          tmp = res.data
          that.setData({
            font_recommend: tmp,
            loc: app.globalData.location
          })
        }
      })
      db.collection("outside-take-out").get({
        success(res){
          //console.log("查询数据成功",res.data[1].name)
          tmp = res.data
          //console.log(tmp[1].name)
          that.setData({
            takeout:tmp
          })
        }
      })
      // 明星窗口的数据库(2020.7.13添加)
      db.collection("star_window").where({
        loc: app.globalData.location
      }).get({
        success(res){
          console.log(res.data)
          that.setData({
            stars : res.data
          })
        }
      })
      // 特色菜的数据库(2020.7.13添加)
      db.collection("special_dishes").where({
        loc: app.globalData.location
      }).get({
        success(res){
          console.log(res.data)
          // that.setData({
          //   stars : res.data
          // })
        }
      })
    },

    selectFloor: function (e) {
      let id = e.currentTarget.dataset.id
      let app = getApp()
      app.globalData.floor = parseInt(id)
      console.log(typeof(app.globalData.floor))
      wx.navigateTo({
        //目的页面地址        
        url: '../tangshi_page/tangshi',
        success: function(res){
          console.log("跳转成功")
        },
      })    
    },

    // 明星窗口选择
    selectStarsWindow: function (e) {
      var id = e.currentTarget.dataset.id
      var app = getApp()
      let that = this
      console.log(id)
      
    }

})