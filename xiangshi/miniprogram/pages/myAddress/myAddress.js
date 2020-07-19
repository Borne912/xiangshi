// miniprogram/pages/myAddress/myAddress.js
const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl : 'cloud://xiangshi-yqpne.7869-xiangshi-yqpne-1302514195/image/icon/pen.png',
    // 是否添加(否为修改)
    isAdd : true,
    // 是否显示
    showModal: false,
    // 两大关键字(添加与修改)
    point: '添加',
    holder: {name: '请输入姓名', gender: '请输入性别', address: '请输入详细地址',      tel: '请输入手机号码'},
    // 实际存在的地址信息
    information:[],
    // 当前的输入框中的value
    cur:{},
    // 需要增加/修改的四大数据
    _name: '',
    _gender: '',
    _address: '',
    _tel: '',
  },
  /* 弹窗 */
  showDialogBtn: function () {
    this.setData({
      showModal: true
    })
  },
  /* 弹出框蒙层截断touchmove事件 */
  preventTouchMove: function () {
  },
  /* 隐藏模态对话框 */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  /*对话框取消按钮点击事件 */
  onCancel: function () {
    this.hideModal();
    console.log('点击取消')
  },
  /* 对话框确认按钮点击事件 */
  onConfirm: function () {
    var that = this
    var td = this.data
    var flag = this.check()
    var _isAdd = this.data.isAdd
    if(flag == true) {
      if(_isAdd == true) {
        // 数据库add数据
        that.joinAdd()
      } else {
        // 数据库update数据
        that.changeAdd()
      }   
    }   
    else {
      wx.showToast({
        title: '不要输入空白信息哦!',
        icon: 'none'
      })
    }
    this.hideModal();
    this.onLoad()
    console.log('点击确认')
  },
  /* 读取地址数据 */
  getData: function(e) {
    var that = this
    db.collection("myAddress").get({
      success(res) {
        console.log(res.data)
        that.setData({
          information: res.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
  },
  // 点击那个笔(添加或修改)
  datatap: function (e) {
    var that = this
    var id = e.currentTarget.dataset.id
    console.log(id)
    // 是添加或者修改
    var _isAdd = id == 0
    console.log(_isAdd)
    if(_isAdd == true) {  //是添加
      that.setData({
        cur : {},
        point: '添加',
        _name: '',
        _gender: '',
        _address: '',
        _tel: '',
        isAdd: true
      })
    }else { //是修改
      that.setData({
            cur : id,
            point: '修改',
            _name: id.name,
            _gender: id.gender,
            _address: id.address,
            _tel: id.tel,
            isAdd: false
      })
    }
    
    this.showDialogBtn()

  },
  check: function (e) {
    var td = this.data
    var a = td._name
    var b = td._gender
    var c = td._address
    var d = td.tel
    if(a != '' && b != '' & c != '' && d != '')
      return true
    else
      return false
  },
  // 输入改变(4个)
  inputName: function(e) {
    var input = e.detail.value
    console.log(input)
    this.setData({
      _name: input
    }) 
  },
  inputGender: function(e) {
    var input = e.detail.value
    console.log(input)
    this.setData({
      _gender: input
    }) 
  },
  inputAddress: function(e) {
    var input = e.detail.value
    console.log(input)
    this.setData({
      _address: input
    }) 
  },
  inputTel: function(e) {
    var input = e.detail.value
    console.log(input)
    this.setData({
      _tel: input
    }) 
  },
  /*****************************/
  // 数据库add数据
  joinAdd : function(e) {
    var that = this
    var td = this.data 
    db.collection("myAddress").add({
      data:{
        name: td._name,
        gender: td._gender,
        address: td._address,
        tel: td._tel 
      }       
    })
    console.log('添加成功')
  },
  // 修改已有数据
  changeAdd : function(e) {
    var that = this
    var td = this.data 
    var find = td.cur
    console.log(find)
    db.collection("myAddress").where({
      _id: find._id,
      _openid: find._openid,
      name: find.name,
      gender: find.gender,
      address: find.address,
      tel: find.tel 
    }).update({
      data:{
        name: td._name,
        gender: td._gender,
        address: td._address,
        tel: td._tel 
      }       
    })
    console.log('修改成功')
  },
  // 输入改变(4个)
  inputName: function(e) {
    var input = e.detail.value
    console.log(input)
    this.setData({
      _name: input
    }) 
  },
  inputGender: function(e) {
    var input = e.detail.value
    console.log(input)
    this.setData({
      _gender: input
    }) 
  },
  inputAddress: function(e) {
    var input = e.detail.value
    console.log(input)
    this.setData({
      _address: input
    }) 
  },
  inputTel: function(e) {
    var input = e.detail.value
    console.log(input)
    this.setData({
      _tel: input
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