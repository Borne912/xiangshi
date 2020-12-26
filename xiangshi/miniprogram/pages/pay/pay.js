// miniprogram/pages/pay/pay.js
const app = getApp()
const db = wx.cloud.database()
var util = require('../../utils/utils.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    checked:true, //总的选择按钮
    food_list:"", //食物订单
    total:"", //总价
    comment:"", //备注
    // app.globalData.takeout_comment //全评论
    adress:"", //地址
    pay:false,
    payStatus:[
      {time:"7:00",topic:"接单",status:0},{time:"8:00",topic:"制作中",status:0},
      {time:"9:00",topic:"完成",status:0},
      {time:"10:00",topic:"取得",status:0}],
    time:"请选择取餐时间",
    completeOrder:false
  },
  
  /**
   * 添加到我的账单
   */
  AddToBill:function(){
    var that = this;
    var time = util.formatTime(new Date());
    // console.log(that.data.adress.location.substring(0,3))
    // console.log(that.data.adress.location.substring(4,5))
    // console.log(that.data.adress.location.substring(7,8))
    db.collection('history').add({
      data: {
        loc:that.data.adress.location.substring(0,3),
        floor:that.data.adress.location.substring(4,5),
        window:that.data.adress.location.substring(7,8),
        price:that.data.total,
        date:time.date,
        time:time.time.substring(0,5),
        types:that.IntervalJudge(time.time.substring(0,2)),
        imgurl:that.data.food_list[0].imgurl,
        comment:that.data.comment,
        dishes:that.data.food_list,
        TakeMealTime:that.data.time
      },
      success:function(res){
        console.log(res)
        setTimeout(function(){
          wx.switchTab({
            url: '../food/food',
          })
        },2000)
        wx.showToast({
          title: '订单完成',
          icon: 'success',
          duration: 2000
        })
      },
      fail:function(res){
        console.log(res)
      }
    })
  },

  /**
   * 判断时间段函数
   */
  IntervalJudge:function(time) {
    //提取出时间里的hour
    var hour = 0;
    if(parseInt(time.substring(0,1)) == 0) {
      hour = parseInt(time.substring(1,2));
    }
    else {
      hour = parseInt(time.substring(0,2));
    }
    //判断时间段
    if(hour >= 6 && hour <= 8) {
      return '早餐';
    }
    else if(hour > 11 && hour <= 13) {
      return '午餐';
    }
    else if(hour > 17 && hour <= 19) {
      return '晚餐';
    }
    else {
      return '加餐';
    }
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
    //console.log(app.globalData.takeout_takeMeals)
    db.collection('myAddress').where({
      _openid:app.globalData.openid,
      default:true
    }).get({
      success:function(res){
        console.log(res)
        app.globalData.takeout_takeMeals.name = res.data[0].name;
        app.globalData.takeout_takeMeals.tel = res.data[0].tel;
        console.log(app.globalData.takeout_takeMeals)
        that.setData({
          adress: app.globalData.takeout_takeMeals
        })
      }
    })
    that.setData({
      food_list:app.globalData.takeout_addfood,
      total: tmp,
    })
    //console.log("dawd",that.data.food_list)
    if(app.globalData.takeout_comment.length>8)
    {
      tmp = app.globalData.takeout_comment.substring(0,7)+"...";
      that.setData({
        comment: tmp == ""?"这里可以输入内容":tmp
      })
    }
    else {
      tmp = app.globalData.takeout_comment;
      that.setData({
        comment: tmp == ""?"这里可以输入内容":tmp
      })
    }
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
        // data[i].sinTtlPrice = data[i].
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
  },

  /**
   * 页面跳转
   */
  pageJumps:function(res){
    wx.navigateTo({
      url: '../comment/comment',
    })
  },

  /**
   * 确认支付
   */
  confirmPay:function(){
    var that = this;
    var tmp;
    that.setData({
      pay:true
    })
    //模拟订单的交易过程
    setTimeout(function(){
      that.setData({
        "payStatus[0].status":1
      })
    },2000)
    setTimeout(function(){
      that.setData({
        "payStatus[1].status":1
      })
    },4000)
    setTimeout(function(){
      that.setData({
        "payStatus[2].status":1
      })
    },6000)
    setTimeout(function(){
      that.setData({
        "payStatus[3].status":1
      })
    },8000)
    //提示
    wx.showToast({
      title: '支付成功',
      icon: 'success',
      duration: 2000
    })
    that.test_print()
    console.log("I am here",that.data.food_list[0])
  },

  /**
   * 取消订单
   */
  cancelOrder:function(){
    //提示
    wx.showToast({
      title: '取消成功',
      icon: 'success',
      duration: 1000
    })
    setTimeout(function(){
      wx.switchTab({
        url: '../food/food',
        success:function(res){
          console.log(res)
        },
        fail:function(res){
          console.log(res)
        }
      })
    },1000)
  },

  /**
   * 完成订单
   */
  completeOrder:function(){
    const that = this;
    that.AddToBill();
    that.setData({
      completeOrder:true
    })
  },

  onUnload: function() {
    // 页面销毁时执行
    const that = this;
    if(that.data.pay == true&&that.data.completeOrder == false) {
      if(that.data.payStatus[3].status == 1) {
        that.AddToBill();
      }
      else{
        wx.switchTab({
          url: '../food/food',
        })
      }
    }
  },

  /**
   * 选择取餐时间
   */
  selectedTime:function(res) {
    const that = this;
    console.log(res.detail.value)
    that.setData({
      time:res.detail.value
    })
  },
  // 打印函数
  //微信小程序https请求实例，根据自己的需求条件触发函数，推送订单打印
  test_print: function (e) {
    //USER和UKEY在飞鹅云（ http://admin.feieyun.com/ ）管理后台的个人中心可以查看
    var USER = "41821195@xs.ustb.edu.cn";//必填，飞鹅云 http://admin.feieyun.com/ 管理后台注册的账号名
    var UKEY = "9nnPxYrDLTNzdzIB";//必填，这个不是填打印机的key，是在飞鹅云后台注册账号后生成的UKEY

    var SN = '921606941';//必填，打印机编号,打印机必须要在管理后台先添加
      
    //以下URL参数不需要修改
    var HOST = "api.feieyun.cn";     //域名
    var PATH = "/Api/Open/";         //接口路径
    var STIME = new Date().getTime();//请求时间,当前时间的秒数
    var SIG = hex_sha1(USER + UKEY + STIME);//获取签名

    //标签说明：
    //单标签:
    //"<BR>"为换行,"<CUT>"为切刀指令(主动切纸,仅限切刀打印机使用才有效果)
    //"<LOGO>"为打印LOGO指令(前提是预先在机器内置LOGO图片),"<PLUGIN>"为钱箱或者外置音响指令
    //成对标签：
    //"<CB></CB>"为居中放大一倍,"<B></B>"为放大一倍,"<C></C>"为居中,<L></L>字体变高一倍
    //<W></W>字体变宽一倍,"<QR></QR>"为二维码,"<BOLD></BOLD>"为字体加粗,"<RIGHT></RIGHT>"为右对齐
    //拼凑订单内容时可参考如下格式
    //根据打印纸张的宽度，自行调整内容的格式，可参考下面的样例格式
    let that = this;
    var myDate = new Date();
    // 订餐时间(当前时间)
    var dingCan_time = that.getCurTime()
    //取餐时间(当前年/月/日 + 自选时间)
    var quCan_time = that.getCurTime().split(' ')[0] + ' ' + that.data.time;
    var list = that.data.food_list
    var loc = that.data.adress.location.substring(0,3)
    var floor =  that.data.adress.location.substring(4,5) + '层'
    var window =  that.data.adress.location.substring(7,8) + '号窗口'
    var usrname = app.globalData.takeout_takeMeals.name
    // 电话
    var tel = app.globalData.takeout_takeMeals.tel 
    var cmm = app.globalData.takeout_comment
    //处理备注(长度超过15, 超过30)
    if(cmm.length > 15) {
      var end = 28
      if(cmm.length < 28) {
        end = cmm.length
      }
      cmm = cmm.substring(0,15) + '<BR>' + cmm.substring(15,end) + '...';
    }
    cmm += '<BR>'
    console.log(cmm)
    var orderInfo = '<CB>' + loc + '</CB><BR>';
    orderInfo += '<CB>' + floor + window + '</CB><BR>';
    orderInfo += '名称　　　　　 单价  数量 金额<BR>'
    orderInfo += '--------------------------------<BR>'
    for(var index in list) {
      var i = list[index]
      //7 + 3 + 3 + 3
      // '饭　　　　　 　10.0   10  10.0<BR>';
      //菜名
      var orderInfo_tmp = ''
      var name = i.name;
      var price = i.price;
      var numb = i.numb;
      var name_len = name.length;
      var price_len = price.toString().length
      var numb_len = numb.toString().length
      //总金额
      var total = price*numb.toString();
      var total_len = total.length;
      if(name_len < 7) {
        orderInfo_tmp += name.concat('  '.repeat(7-name_len));
      }
      else {
        orderInfo_tmp += name[0]+name[1]+name[2] + "**";
        orderInfo_tmp += name[name_len-3]+name[name_len-2]+name[name_len-1];
      }
      orderInfo_tmp += ''.concat(' '.repeat(1))
      //价格
      orderInfo_tmp += price.toString().concat(' '.repeat(6-price_len));
      console.log(price)
      //个数
      orderInfo_tmp += numb.toString().concat(' '.repeat(5-numb_len));
      //总计
      orderInfo_tmp += total.toString().concat(' '.repeat(6-total_len));
      // 换行
      orderInfo_tmp += "<BR>"
      orderInfo += orderInfo_tmp
      console.log(orderInfo_tmp)
    }
    orderInfo += '--------------------------------<BR>'
    orderInfo += '合计：'+that.data.total + '元<BR>';
    // 联系人和电话
    orderInfo += '联系人: ' + usrname + '<BR>';
    orderInfo += '联系电话: ' + tel + '<BR>';
    orderInfo += '订餐时间: ' + dingCan_time + '<BR>';
    orderInfo += '取餐时间: ' + quCan_time + '<BR>';
    orderInfo += '备注: <BR>' + cmm;

    console.log('这是测试打印输出',orderInfo)
    //打开注释可测试(一次打印一张)
    print_r(SN,orderInfo,1);
    // orderInfo = '<CB>小程序测试打印</CB><BR>';
    // orderInfo += '名称　　　　　 单价  数量 金额<BR>';
    // orderInfo += '--------------------------------<BR>';
    // orderInfo += '饭　　　　　 　10.0   10  10.0<BR>';
    // orderInfo += '炒饭　　　　　 10.0   10  10.0<BR>';
    // orderInfo += '蛋炒饭　　　　 10.0   100 100.0<BR>';
    // orderInfo += '鸡蛋炒饭　　　 100.0  100 100.0<BR>';
    // orderInfo += '西红柿炒饭　　 1000.0 1   100.0<BR>';
    // orderInfo += '西红柿蛋炒饭　 100.0  100 100.0<BR>';
    // orderInfo += '西红柿鸡蛋炒饭 15.0   1   15.0<BR>';
    // orderInfo += '备注：加辣<BR>';
    // orderInfo += '--------------------------------<BR>';
    // orderInfo += '合计：xx.0元<BR>';
    // orderInfo += '送货地点：广州市南沙区xx路xx号<BR>';
    // orderInfo += '联系电话：13888888888888<BR>';
    // orderInfo += '订餐时间：2014-08-08 08:08:08<BR>';
    // orderInfo += '<QR>http://www.dzist.com</QR>';//把二维码字符串用标签套上即可自动生成二维码

    //***接口返回值说明***
    //正确例子：{"msg":"ok","ret":0,"data":"123456789_20160823165104_1853029628","serverExecutedTime":6}
    //错误：{"msg":"错误信息.","ret":非零错误码,"data":null,"serverExecutedTime":5}
    // console.log(orderInfo);
    

    var hexcase = 0;
    var chrsz = 8;
    function hex_sha1(s) {
      return binb2hex(core_sha1(AlignSHA1(s)));
    }
    function core_sha1(blockArray) {
      var x = blockArray;
      var w = Array(80);
      var a = 1732584193;
      var b = -271733879;
      var c = -1732584194;
      var d = 271733878;
      var e = -1009589776;
      for (var i = 0; i < x.length; i += 16) {
        var olda = a;
        var oldb = b;
        var oldc = c;
        var oldd = d;
        var olde = e;
        for (var j = 0; j < 80; j++) {
          if (j < 16)
            w[j] = x[i + j];
          else
            w[j] = rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
          var t = safe_add(safe_add(rol(a, 5), sha1_ft(j, b, c, d)), safe_add(safe_add(e, w[j]), sha1_kt(j)));
          e = d;
          d = c;
          c = rol(b, 30);
          b = a;
          a = t;
        }
        a = safe_add(a, olda);
        b = safe_add(b, oldb);
        c = safe_add(c, oldc);
        d = safe_add(d, oldd);
        e = safe_add(e, olde);
      }
      return new Array(a, b, c, d, e);
    }

    function sha1_ft(t, b, c, d) {
      if (t < 20)
        return (b & c) | ((~b) & d);
      if (t < 40)
        return b ^ c ^ d;
      if (t < 60)
        return (b & c) | (b & d) | (c & d);
      return b ^ c ^ d;
    }

    function sha1_kt(t) {
      return (t < 20) ? 1518500249 : (t < 40) ? 1859775393 : (t < 60) ? -1894007588 : -899497514;
    }

    function safe_add(x, y) {
      var lsw = (x & 0xFFFF) + (y & 0xFFFF);
      var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
      return (msw << 16) | (lsw & 0xFFFF);
    }

    function rol(num, cnt) {
      return (num << cnt) | (num >>> (32 - cnt));
    }

    function AlignSHA1(str) {
      var nblk = ((str.length + 8) >> 6) + 1,
        blks = new Array(nblk * 16);
      for (var i = 0; i < nblk * 16; i++)
        blks[i] = 0;
      for (i = 0; i < str.length; i++)
        blks[i >> 2] |= str.charCodeAt(i) << (24 - (i & 3) * 8);
      blks[i >> 2] |= 0x80 << (24 - (i & 3) * 8);
      blks[nblk * 16 - 1] = str.length * 8;
      return blks;
    }

    function binb2hex(binarray) {
      var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
      var str = "";
      for (var i = 0; i < binarray.length * 4; i++) {
        str += hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8 + 4)) & 0xF) +
          hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8)) & 0xF);
      }
      return str;
    }

    /*
    *  打印订单方法：Open_printMsg
    */
    function print_r(SN, orderInfo, TIMES) {
      wx.request({
        url: 'https://' + HOST  + PATH,
        data: {
          user: USER,//账号
          stime: STIME,//当前时间的秒数，请求时间
          sig: SIG,//签名

          apiname: "Open_printMsg",//不需要修改
          sn: SN,//打印机编号
          content: orderInfo,//打印内容
          times: TIMES,//打印联数,默认为1
        },
        method:"POST",
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          console.log(res.data)
        }
      })
    }
  },
  getCurTime: function (e) {
    var now = new Date()
    var year = now.getFullYear().toString();
    var month =(now.getMonth() < 9 ? '0' : '')+(now.getMonth()+1);
    var day = (now.getDate() < 10 ? '0' : '')+(now.getDate());
    var hour = (now.getHours()<10 ? '0' : '') + now.getHours().toString()
    var minute = (now.getMinutes()<10 ? '0' : '') + now.getMinutes().toString()
    var second =(now.getSeconds()<10 ? '0' : '') + now.getSeconds().toString()
    var time = hour+':'+ minute + ':' + second
    var res = year +'/'+ month+'/' + day +' '+ time
    return res
  }
})