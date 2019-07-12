var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid: null,
    loginToken: null,
    devID: null,
    y:"",
    m:'',
    d:'',
    title:"niu",
    show: true,
    shebei: [
      {
        name: "手动控制",
      }
    ],
    shebeiname: [
      { name: "吸肥泵0" },
      { name: "吸肥泵1" },
      { name: "吸肥泵2" },
      { name: "吸肥泵3" },
      { name: "吸肥泵4" }
    ]
  },
  switch2Change: function (e) {
    console.log('switch2 发生 change 事件，携带值为', e.detail.value)
  },
  // 判断是否登录
  login: function () {
    wx.navigateTo({
      url: '/pages/login/login'
    })
  },
  changeData: function () {
    this.onLoad();//最好是只写需要刷新的区域的代码，onload也可，效率低，有点low
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _userid = wx.getStorageSync("userid");
    var _loginToken = wx.getStorageSync("loginToken");
    var _devID = wx.getStorageSync("devID");
    this.setData({
      userid: _userid,
      loginToken: _loginToken,
      devID: _devID
    })
    var _that = this;
    if (!_that.data.userid) {
      _that.setData({
        show: false
      })
    } else {
      _that.setData({
        show: true
      })
    }
    wx.setNavigationBarTitle({
      title: this.data.title
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#3b82eb',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })

    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    //获取年份  
    var Y = date.getFullYear();
    //获取月份  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //获取当日日期 
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    console.log("当前时间：" + Y + '年' + M + '月' + D + '日');
    this.setData({
      y:Y,
      m:M,
      d:D
    })

    // 请求数据
    if (_that.data.userid){
      wx.request({
        url: 'http://39.97.97.99:8080/v1/user/devicectrl',
        method: "POST",
        header: {
          'content-type': _that.data.loginToken // 默认值
        },
        data: {
          devID: _that.data.devID[0],
          ctrltype:"val",
          ctrlval:0
        },
        success(res){
          console.log(res)
        }
      })
    }
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