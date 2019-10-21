var app = getApp();
// pages/switch/switch.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    url:"https://app.xiaomangny.com",
    // 开关
    tit:"",
    devID:"",
    port:"",
    value:"",
    ctrltype:"",
    _index:null,
    // 
    switchimg:"",
    loginToken:null,
    port:null,
    title:null,
    show:false,
    show1:false,
    yanshi:true,
    mintime:0,
    index: 0,
    array: ['默认模式', '计时模式', '流量模式',],
    radiopicon: '/imges/radio-icon-on.png',
    radiopicoff: '/imges/radio-icon.png',
    timetit:"定时",
    timearr:[
      { tit: "30分钟", id: 1, select: true, picor: false },
      { tit: "60分钟", id: 2, select: true, picor: false },
      { tit: "90分钟", id: 3, select: true, picor: false },
      { tit: "自定义", id: 4, select: false,picor: false },
    ],
    time: '0:0',
    loadingx:false
  },

  //显示隐藏
  bindshow:function(){
    this.setData({
      show:true
    })
  },
  bindfalse:function(){
    this.setData({
      show:false
    })
  },

  //模式选择
  bindPickerChange: function (e) {
    var _that = this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var index = e.detail.value;
    this.setData({
      index: e.detail.value
    })
    if (index == 1) {
      _that.setData({
        show1: true
      })
    } else {
      _that.setData({
        show1: false
      })
    }
  },

  //时间选择
  bindTimeChange: function (e) {
    var _that =this;
    console.log(e)
    var str = new Array();
    str = e.detail.value.split(":")
    var h = parseInt(str[0]);
    var m = parseInt(str[1]);
    var mintime = h * 60 + m;
    this.setData({
      mintime:mintime
    })
    this.setData({
      timetit: mintime +"分钟"
    })
    console.log(mintime) 
    // console.log(str)
    // console.log('picker发送选择改变，携带值为', e.detail.value)
  },

  //]定时选择
  bindradio:function(e){
    var _that = this;
    _that.setData({
      show:false
    })
    // console.log(e)
    var index = e.currentTarget.dataset.index;
    var arr1 = _that.data.timearr;
    arr1[index].picor = true;
    var picor = arr1[index].picor;
    if (picor){
      for(var i in arr1){
        arr1[i].picor = !picor;
        arr1[index].picor = true;
      }
    }
    var tit = arr1[index].tit;
     _that.setData({
       timearr: arr1,
       timetit: tit,
       mintime:parseInt(tit)
     })
    
    
    
      // console.log(arr1)
  },
 
  // 开关
  switchthe: function() {
    var _that = this;
    _that.setData({
      switchimg:"/imges/icon-loading.png",
      loadingx: true
    })
    var index = _that.data.index;
      var sta = _that.data.value;
      if(sta == false){
        var sta = 1;
      }else{
        var sta = 0;
      }
      
      console.log(sta)
      console.log(_that.data.mintime)
      console.log(_that.data.port)
      console.log(_that.data.ctrltype)
      var zhiarr1 = [];
      var zhiarr2 = [];
      var zhiarr3 = [];
      
        wx.request({
          url: _that.data.url + `/v1/user/devicectrl`,
          method: "POST",
          header: {
            "Content-Type": "application/json",
            'LoginToken': _that.data.loginToken // 默认值
          },
          data: {
            "DevID": _that.data.devID,
            "ctrltype": _that.data.ctrltype,//控制类型，OUTAC1 
            "ctrlval": {
              "status": sta, //1:开；0：关
              "delay": _that.data.mintime,
              "Port": parseInt(_that.data.port)
            }
          },
          success(res) {
            console.log(res)
            var statecode = res.data.stateCode;
            console.log(statecode)
            if(statecode !==0){
              if (sta == 1) {
                wx.showToast({
                  title: "开启失败",
                  image: '/imges/shibai.png',
                  duration: 2000
                })
                _that.setData({
                  switchimg: "/imges/switch-icon2.png",
                  loadingx: false
                })
              } else {
                wx.showToast({
                  title: "关闭失败",
                  image: '/imges/shibai.png',
                  duration: 2000
                })
                _that.setData({
                  switchimg: "/imges/switch-icon4.png",
                  loadingx: false
                })
              }
              return;
            }else{
              if(sta == 0){
                _that.setData({
                 timetit:"定时",
                 mintime:0
                })
              }
              setTimeout(function () {
                wx.request({
                  url: _that.data.url + `/v1/user/getdevicedata`,
                  method: "GET",
                  header: {
                    'LoginToken': _that.data.loginToken // 默认值
                  },
                  data: {
                    devID: _that.data.devID
                  },
                  success(res) {
                    console.log(res)
                    // var arr = res.data.data.device[0].devicedata[0].paramvalue;
                    // console.log(arr)
                    // var index = _that.data._index;
                    // var value = arr[index].Value;
                    // _that.setData({
                    //   value: value
                    // })
                    var zhi = res.data.data.device[0].devicedata[0].paramvalue;
                    console.log(zhi)
                      if (!zhi) {
                        return
                      } else {
                        for (var i in zhi) {
                          var zhiID = zhi[i].ID;
                          var zhiport = zhi[i].Port;
                          var zhivalue = zhi[i].Value;
                          // console.log(zhiID)
                          // console.log(zhiport)
                          // console.log(zhivalue)
                          if (zhiID == _that.data.ctrltype  && zhiport == _that.data.port) {
                              _that.setData({
                                value:zhivalue
                              })
                            }
                          }
                      if (_that.data.value == 0) {
                        _that.setData({
                          switchimg: "/imges/switch-icon2.png",
                          loadingx: false
                        })
                      } else {
                        _that.setData({
                          switchimg: "/imges/switch-icon4.png",
                          loadingx: false
                        })
                      }
                    }
                  },
                })
              }, 6 * 1000)
            }
          },
          fail(err) {
            if (sta == 1) {
              wx.showToast({
                title: "开启失败",
                image: '/imges/shibai.png',
                duration: 2000
              })
              _that.setData({
                switchimg: "/imges/switch-icon2.png",
              })
            } else {
              wx.showToast({
                title: "关闭失败",
                image: '/imges/shibai.png',
                duration: 2000
              })
              _that.setData({
                switchimg: "/imges/switch-icon4.png",
              })
            }
            return;
          }
        })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    console.log(options)
    var loginToken = wx.getStorageSync("loginToken");
    _this.setData({
      loginToken:loginToken
    })
    // console.log(options)
    // 接收传值
    _this.setData({
      title: options.title,
      tit:options.tit,
      port:options.port,
      devID:options.devID,
      value: parseInt(options.value),
      ctrltype: options.ctrltype,
      _index:options.index,
    })
    wx.setNavigationBarTitle({
      title: _this.data.title
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#029dff',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
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
    var _that = this;
    var sta = _that.data.sta;
    var index = _that.data.index;
    if(index == 1){
      _that.setData({
        show1: true
      })
    } else {
      _that.setData({
        show1: false
      })
    }
    if (this.data.value == 0) {
      this.setData({
        switchimg: "/imges/switch-icon2.png",
        loadingx: false
      })
    } else {
      this.setData({
        switchimg: "/imges/switch-icon4.png",
        loadingx: false
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.changeParentData()
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