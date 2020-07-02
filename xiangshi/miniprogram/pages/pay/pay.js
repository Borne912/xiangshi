// miniprogram/pages/pay/pay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked:false
  },
  
  /**
   * 按钮选中与取消状态切换
   */
  checkTap: function(){  
    var that = this;
    var checked = that.data.checked;
    that.setData({
      "checked": !checked
    })
  }
})