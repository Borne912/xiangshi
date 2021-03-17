const db = wx.cloud.database()
const app = getApp()
var tmp
Page({
  data: {
    pingjia:13,
    gonglue:112,
    xiangce:131,
    TabCur: 0,
    scrollLeft: 0,

    inputDish: "",
    dishes: [],
    winWidth: 0,
    winHeight: 0,
    imagesHeightList: [],
    datalist: [{
        id: 1,
        title: "好哈哈哈哈哈哈哈哈哈哈哈哈哈哈好",
        images: "../../images/16861593521653_.pic_hd.jpg",
        avatar: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
        username: "昵称",
        count: "20"
      },
      {
        id: 1,
        title: "好好",
        images: "../../images/17181593523064_.pic_hd.jpg",
        avatar: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
        username: "昵称",
        count: "20"
      },
      {
        id: 1,
        title: "好好",
        images: "../../images/add.png",
        avatar: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
        username: "昵称",
        count: "20"
      },
      {
        id: 1,
        title: "好好",
        images: "../../images/arrow.svg",
        avatar: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
        username: "昵称",
        count: "20"
      },
      {
        id: 1,
        title: "好好",
        images: "../../images/arrow_down.svg",
        avatar: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
        username: "昵称",
        count: "20"
      },
      {
        id: 1,
        title: "好哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈好",
        images: "../../images/health.png",
        avatar: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
        username: "昵称",
        count: "20"
      },
    ],

    a1src: '../../images/home-1.png',
    a2src: '../../images/home-2.png',
    a3src: '../../images/home-3.png',
    a4src: '../../images/home-4.png',
    text1: "智慧食堂",
    text2: "高校美食",
    text3: "附近推荐",
    text4: "健康管理",

    cardCur: 0,
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    }, {
      id: 1,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
    }, {
      id: 4,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
    }, {
      id: 5,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
    }, {
      id: 6,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
    }],


  },


  tabSelect(e) {
    console.log(e.currentTarget.dataset.id)
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id-1)*60
    })
  },


  dishInput: function (e) {
    var input = e.detail.value
    console.log(input)
    this.setData({
      inputDish: input
    })
  },
  showInform: function (e) {
    wx.showToast({
      title: e,
      icon: 'none',
    })
  },
  searchTap: function (e) {
    var find = this.data.inputDish
    this.searchDataBase(find)
    // if(this.data.dishes.length == 0) {
    //   this.showInform('未检索到关键字!')
    // }else {
    //   this.showInform('检索成功!')
    // }
  },
  //点击打包食物跳转

  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  // towerSwiper
  // 初始化towerSwiper
  towerSwiper(name) {
    let list = this.data[name];
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      swiperList: list
    })
  },
  // towerSwiper触摸开始
  towerStart(e) {
    this.setData({
      towerStart: e.touches[0].pageX
    })
  },
  // towerSwiper计算方向
  towerMove(e) {
    this.setData({
      direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
    })
  },
  // towerSwiper计算滚动
  towerEnd(e) {
    let direction = this.data.direction;
    let list = this.data.swiperList;
    if (direction == 'right') {
      let mLeft = list[0].mLeft;
      let zIndex = list[0].zIndex;
      for (let i = 1; i < list.length; i++) {
        list[i - 1].mLeft = list[i].mLeft
        list[i - 1].zIndex = list[i].zIndex
      }
      list[list.length - 1].mLeft = mLeft;
      list[list.length - 1].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    } else {
      let mLeft = list[list.length - 1].mLeft;
      let zIndex = list[list.length - 1].zIndex;
      for (let i = list.length - 1; i > 0; i--) {
        list[i].mLeft = list[i - 1].mLeft
        list[i].zIndex = list[i - 1].zIndex
      }
      list[0].mLeft = mLeft;
      list[0].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    }
  },



  onLoad: function () {
    console.log('onLoad')
    var that = this
    /**
     * 获取系统信息
     */
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });

  },




  scrolltolower: function (e) {

    var that = this;

    // 加载更多 loading
    that.setData({
      hothidden: true
    })

    var currentDate = this.data.dataListDateCurrent;

    // 如果加载数据超过10条
    if (this.data.dataListDateCount >= 8) {

      // 加载更多 loading
      that.setData({
        hothidden: false
      });

    } else {

      /**
       * 发送请求数据
       */
      util.AJAX("news/before/" + currentDate, function (res) {

        var arr = res.data;
        var format = util.getFormatDate(arr.date);

        // 格式化日期方便加载指定日期数据
        // 格式化日期获取星期几方便显示
        arr["dateDay"] = format.dateDay;

        // 获取当前数据进行保存
        var list = that.data.datalist;
        // 然后重新写入数据
        that.setData({
          datalist: list.concat(arr), // 存储数据
          dataListDateCurrent: arr.date,
          dataListDateCount: that.data.dataListDateCount + 1 // 统计加载次数
        });
      });
    }
  },
  WxMasonryImageLoad: function (e) {
    var that = this;
    console.log(e.detail.height);
    // var colWidth = (that.data.winWidth - 20) / 2;
    // var imageId = e.target.id;
    // var imageOWidth = e.detail.width;
    // var imageOHeight = e.detail.height;

    // var colImageHeight = imageOWidth * colWidth / imageOHeight;
    // var temImagesHeightList = that.imagesHeightList;
    // temImagesHeightList[imageId] = { width: colWidth, height: colImageHeight }
    // that.setData({
    //   imagesHeightList: temImagesHeightList
    // });

  }




})