var app = getApp();
// pages/coc/coc.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:"https://app.xiaomangny.com",
    loginToken:null,
    devID:null,
    show: true,
    xqbox:[],
    id:null,
    zw:false,
    showbox:false,
    hidden:false,
    onloadshow:false,
  },
  // 判断是否登录
  login: function () {
    wx.navigateTo({
      url: '/pages/login/login'
    })
  },

  // 跳转设备
  gotoshebei: function (e) {
    console.log(e)
    var _that = this;
    var kind = e.currentTarget.dataset.id;
    var title = e.currentTarget.dataset.title;
    console.log(kind)
   
      wx.navigateTo({
        url: `/pages/fit/fit?devID=${kind}&title=${title}`,
      })
    
  },

  changeData: function () {
    this.onLoad();//最好是只写需要刷新的区域的代码，onload也可，效率低，有点low
  },
  theonload:function(){
    wx.reLaunch({
      url: '/pages/index/index'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _that = this;
    console.log(_that.data.hidden)
    setTimeout(function(){
      _that.setData({
        hidden: true
      })
    },2000)
    //获取数据
    var _loginToken = wx.getStorageSync("loginToken");
    var _devID = wx.getStorageSync("devID");
    console.log(_devID)
    console.log(_loginToken)
    this.setData({
      loginToken: _loginToken,
      devID: _devID
    })
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
    var _that = this;
    var _devID = _that.data.devID;
    if (_devID) {
      var _devIDIndex = _devID.join(",");
      console.log(_devIDIndex) //拼接参数
      var arr = [];
      wx.request({
        url: _that.data.url+`/v1/user/getdevicestatus?DevID=` + _devIDIndex,
        method: "GET",
        header: {
          LoginToken: _that.data.loginToken
        },
        success(res) {
          console.log(res)
          var state = res.data.stateCode;
          var token = res.data.message;
          console.log(token)
          if (state !== 0 && token !== "verify token failed") {
            setTimeout(function () {
              wx.showToast({
                title: "请求错误",
                image: '/imges/shibai.png',
                duration: 2000
              })
              _that.setData({
                show:false,
                onloadshow: true
              })
            }, 1500)
            return
          }
          if (state !== 200 && token == "verify token failed") {
            wx.removeStorageSync("loginToken");
            wx.removeStorageSync("devID")
            wx.showModal({
              title: '提示',
              content: '账户已过期，请重新登录',
              success: function (res) {
                console.log(res)
                if (res.confirm) {//这里是点击了确定以后
                  _that.login();
                } else {//这里是点击了取消以后
                  console.log('用户点击取消')
                  _that.setData({
                    show: false,
                    onloadshow: false
                  })
                }
              }
            })
          }
          else {
            var arr = res.data.data.device;
            for (var i = 0; i < arr.length; i++) {
              arr[i].online == !true ? arr[i].online = "离线" : arr[i].online = "在线";
              if(arr[i].online == "在线"){
                arr[i].check = true;
              }else{
                arr[i].check = false;
              }
            }
            _that.setData({
              xqbox: arr
            })
            console.log(_that.data.xqbox)
          }
          
        },
        fail(err) {
          _that.onLoad();
          console.log(err)
          setTimeout(function () {
            wx.showToast({
              title: "请求错误",
              image: '/imges/shibai.png',
              duration: 2000
            })
            _that.setData({
              onloadshow: true
            })
          }, 1500)
        }
      })
    }
    // 判断是否显示登录
    if (!_that.data.loginToken && !_that.data.devID) {
      _that.setData({
        show: false
      })
    } else {
      _that.setData({
        show: true
      })
    }
    // 判断是否有数据
    if(_that.data.devID){
      _that.setData({
        zw:false
      })
    }else{
      _that.setData({
        zw:true
      })
    }
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
    this.onShow();
    wx.showNavigationBarLoading() //在标题栏中显示加载
    wx.showToast({

      title: 'loading....',

      icon: 'loading'

    })

    setTimeout(function () {

      wx.hideNavigationBarLoading() //完成停止加载

      wx.stopPullDownRefresh() //停止下拉刷新

    }, 1500)
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