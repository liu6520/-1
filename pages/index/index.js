var app = getApp();
// pages/coc/coc.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginToken:null,
    devID:null,
    show: true,
    xqbox:[],
    id:null
  },
  // 判断是否登录
  login: function () {
    wx.navigateTo({
      url: '/pages/login/login'
    })
  },

  // 跳转设备
  gotoshebei: function (e) {
    var _that = this;
    var kind = e.currentTarget.dataset.id;
    console.log(kind)
    wx.navigateTo({
      url: '/pages/fit/fit?devID=' + kind,
    })
  },
  changeData: function () {
    this.onLoad();//最好是只写需要刷新的区域的代码，onload也可，效率低，有点low
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取数据
    var _loginToken = wx.getStorageSync("loginToken");
    var _devID = wx.getStorageSync("devID");
    console.log(_devID)
    this.setData({
      loginToken:_loginToken,
      devID:_devID
    })
    var _that = this;
    //判断是否显示登录
    if (!_that.data.devID) {
      _that.setData({
        show: false
      })
    } else {
      _that.setData({
        show: true
      })
    }
    console.log(_that.data.show)
    //header头部
    wx.setNavigationBarTitle({
      title: '首页'
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#3b82eb',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })

    //请求数据
    var _devIDIndex = _devID.join(",");
    console.log(_devIDIndex) //拼接参数
    var arr = [];
    wx.request({
      url: 'http://39.97.97.99:8080/v1/user/getdevicestatus?DevID='+ _devIDIndex,
      method:"GET",
      header:{
        LoginToken:_that.data.loginToken
      },
      success(res){
        var arr = res.data.data.device;
        _that.setData({
          xqbox: arr
        })
      }
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
    this.onLoad()
    
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