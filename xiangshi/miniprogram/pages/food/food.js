// miniprogram/pages/food/food.js
const db = wx.cloud.database()
const app = getApp()
var tmp
Page({
    data:{
      font_recommend:[],
      takeout:[],
      tangshi:[
        {name:"一层",imgurl:"../../images/first_floor.png"},
        {name:"二层",imgurl:"../../images/second_floor.png"},
        {name:"三层",imgurl:"../../images/third_floor.png"},
        {name:"四层",imgurl:"../../images/fourth_floor.png"}],
      loc:"鸿博园",
      floors:["零","一","二","三","四"],
      windows:["零","一","二","三","四","五",
              "六","七","八","九","十"],
      // 界面顺序分别是: [明星菜品,超值特惠,新上菜品]
      stars_dishes : [],
      chaozhi_dishes : [],
      new_dishes : [],
      // 本周推荐窗口(就1个)
      week_window: [],
      week_dishes:[],
      // 明星推荐窗口(3个)
      stars_windows:[],
      // toView:"green"
    },

    // 读取数据库数据
    readDataBase(){
      var that = this; 
      /**************************************/
      // 以下开始读数据库
      db.collection("font_recommend").get({
        success(res){
          //console.log("查询数据成功",res)
          tmp = res.data
          that.setData({
            font_recommend: tmp,
            loc: app.globalData.location
          })
          console.log(res.data)
        }
      })
      /**************************************/
      // 1.明星菜品
      db.collection("special_dishes").where({
        loc: app.globalData.location,
        type: "明星菜品"
      }).get({
        success(res){
          //console.log(res.data)
          that.setData({
            stars_dishes : res.data
          })
        }
      })
      // 2.超值特惠
      db.collection("special_dishes").where({
        loc: app.globalData.location,
        type: "超值特惠"
      }).get({
        success(res){
          //console.log(res.data)
          that.setData({
            chaozhi_dishes : res.data
          })
        }
      })
      // 3.新上菜品 
        db.collection("special_dishes").where({
        loc: app.globalData.location,
        type: "新上菜品"
      }).get({
        success(res){
          //console.log(res.data)
          that.setData({
            new_dishes : res.data
          })
        }
      })
      /**************************************/
      // 本周推荐窗口
      db.collection("main_windows").where({
        loc: app.globalData.location,
        mark: "本周推荐"
      }).get({
        success(res){
          //console.log(res.data)
          var tf = res.data[0].floor
          var tw = res.data[0].window
          db.collection("dishes").where({
            loc: app.globalData.location,
            floor: tf,
            window: tw
          }).get({
            success(res){
              //console.log(res.data)
              that.setData({
                week_dishes: res.data
              })
            }
          })
          that.setData({
            week_window : res.data[0]
          })
        }
      })
      /**************************************/
      // 明星窗口的数据库(2020.7.13添加)
      db.collection("main_windows").where({
        loc: app.globalData.location,
        mark: "明星窗口"
      }).get({
        success(res){
          //console.log(res.data)
          that.setData({
            stars_windows : res.data
          })
        }
      })
      /**************************************/
    },
    // 页面创建时执行
    onLoad(){
      //读取数据库数据
      this.readDataBase()  
    },
    onShow: function() {
      // 页面出现在前台时执行
      var that =this;
      //console.log(app.globalData.location)
      that.setData({
        loc: app.globalData.location
      })
      console.log(that.data.loc)
      db.collection("outside-take-out").where({
        location:that.data.loc
      }).get({
        success(res){
          app.globalData.takeout_foodtype = res.data[0].name;
          //console.log("查询数据成功",res.data)
          tmp = res.data
          //console.log(tmp[1].name)
          that.setData({
            takeout:tmp
          })
        }
      })
    },
    // 搜索跳转
    searchJump:function (e) {
      wx.navigateTo({
        url: '../search/search',
      })
    },
    // 楼层跳转
    selectFloor: function (e) {
      let id = e.currentTarget.dataset.id
      let app = getApp()
      app.globalData.floor = parseInt(id)
      //console.log(typeof(app.globalData.floor))
      wx.navigateTo({
        //目的页面地址        
        url: '../tangshi_page/tangshi',
        success: function(res){
          console.log("跳转成功")
        },
      })    
    },
    // 本周推荐/明星窗口选择
    selectWindow: function (e) {
      var id = e.currentTarget.dataset.id
      // 设置当前窗口信息(楼层+号码)
      app.globalData.floor = id.floor
      app.globalData.window = id.window

      let that = this
      //console.log(id)
      wx.navigateTo({
        url: '../window/window', 
        success: function(res){
          console.log("跳转成功")
        },
      })
      
    },
    //点击食物跳转
    selectFood: function (e) {
      let id = e.currentTarget.dataset.id
      //console.log(id)
      app.globalData.curDish = id
      wx.navigateTo({
        url: '../food_details/food_details',
      })
      // db.collection("dishes").where({
      //   loc: app.globalData.location,
      //   name: id
      // }).get({
      //   success(res) {
      //     console.log(res)
      //   }
      // })
    },
    
    //点击打包食物跳转

    Change_takeout_food: function(reg){
      var that = this;
      //console.log("在这",reg)
      if (reg.currentTarget.dataset.id == 1) {
        app.globalData.takeout_foodtype = "米饭";
        app.globalData.takeout_takeMeals.location = that.data.loc + " " + "一层" + " " + "一号"; 
      } 
      else if (reg.currentTarget.dataset.id == 2) {
        app.globalData.takeout_foodtype = "汉堡";
        app.globalData.takeout_takeMeals.location = that.data.loc + " " + "二层" + " " + "一号";
      }
      else if (reg.currentTarget.dataset.id == 3) {
        app.globalData.takeout_foodtype = "面条";
        app.globalData.takeout_takeMeals.location = that.data.loc + " " + "三层" + " " + "一号";
      }
      else{
        app.globalData.takeout_foodtype = "包子";
        app.globalData.takeout_takeMeals.location = that.data.loc + " " + "四层" + " " + "一号";
      }
      wx.navigateTo({
        url: '../takeout/takeout',
      })
    }
})