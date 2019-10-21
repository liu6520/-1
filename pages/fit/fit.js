var app = getApp();
// pages/fit/fit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:"https://app.xiaomangny.com",
    online:false,
    onlinetit:"",
    title:null,
    devID:null,
    shebeiname: [],
    shuibeng: [],
    wendu:[],
    show:false,
    hidden:false,
    loginToken:null,
    moindex:0,
    timetit:0,
    theindex:null,
    Ctrltype:null,
    arr:[]
  },
  // switch1Change: function (e) {
  //   console.log(e)
  //   var _that = this;
  //   var value = e.detail.value;
  //   var _index = e.currentTarget.dataset.index;
  //   var arr = _that.data.shebeiname;
  //   console.log(arr)
  //   console.log(_index)
  //   var port = parseInt(arr[_index].PeripheralPort);
  //   var sta;
  //   console.log(value)
  //   if (value){
  //     var sta = 1;
  //   }else{
  //     var sta = 0;
  //   }
  //   console.log(sta)
  //   wx.request({
  //     url: 'http://39.97.97.99:8080/v1/user/devicectrl',
  //     method: "POST",
  //     header: {
  //       "Content-Type": "application/json",
  //       'LoginToken': _that.data.loginToken // 默认值
  //     },
  //     data:{
  //       "DevID": _that.data.devID,
  //       "ctrltype": "OutAC",//控制类型，OUTAC1 
  //       "ctrlval": {
  //         "status": sta, //1:开；0：关
  //         "delay": 0,
  //         "Port": port
  //       }
  //     },
  //     success(res){
  //       console.log(res)
  //       setTimeout(function(){
  //         wx.request({
  //           url: 'http://39.97.97.99:8080/v1/user/getdevicedata',
  //           method: "GET",
  //           header: {
  //             'LoginToken': _that.data.loginToken // 默认值
  //           },
  //           data: {
  //             devID: _that.data.devID
  //           },
  //           success(res) {
  //             console.log(res)
  //           }
  //         })  
  //       }, 6 *1000)
  //     },
  //     fail(err){
  //       console.log(err)
  //     }
  //   })
  // },
  // 跳转流量
  goto: function(e) {
    console.log(this.data.shebeiname)
    var _index = e.currentTarget.dataset.index;
    var ctrltype = e.currentTarget.dataset.ctrltype;
    //传值标题
    var devID = this.data.devID;
    var value = e.currentTarget.dataset.value;
    var port = e.currentTarget.dataset.port;
    var tit = e.currentTarget.dataset.tit;
    var that = this;
    var _title = that.data.title;
    
    console.log(that.data.shebeiname)
    console.log(e)
    wx.navigateTo({
      url: `/pages/switch/switch?title=${_title}&port=${port}&tit=${tit}&devID=${devID}&value=${value}&ctrltype=${ctrltype}&index=${_index}` //传值
    })
  },
  switchclick:function(){
   
  },
  changeData: function () {

    this.onLoad();//最好是只写需要刷新的区域的代码，onload也可，效率低，有点low

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    setTimeout(function () {
      _this.setData({
        hidden: true
      })
    }, 2000)
    console.log(options)
    // 接收传值
    _this.setData({
      devID: options.devID,
      title: options.title
    })
    var devID = _this.data.devID;
    var loginToken = wx.getStorageSync("loginToken");
    _this.setData({
      loginToken: loginToken
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
  onShow: function (options) {
    var _this = this;
    console.log(this.data.arr)
    var loginToken = _this.data.loginToken;
    var devID = _this.data.devID
    var arr1 = [];
    var arr2 = [];
    var arr3 = [];
    var zhiarr1 = [];
    var zhiarr2 = [];
    var zhiarr3 = [];
    // var arr = _this.data.shebeiname;
    // var moindex = 0;
    // for (var i in arr) {
    //   arr[i].push(moindex);
    // }
    // _this.setData({
    //   shebeiname: arr
    // })
    // 请求数据
    wx.request({
      url: _this.data.url+`/v1/user/getdeviceinfo`,
      method: "GET",
      header: {
        'content-type': 'application/json',
        'LoginToken': loginToken // 默认值
      },
      data: {
        DevID: devID
      },
      success(res) {
        console.log(res)
        var value = res.data.data.device[0];
        //判断数据是否为空
        console.log(value)
        if (value) {
          var valuearr = value.PeripheralValue;
          console.log(valuearr)
          if (!valuearr) {
            return _this.setData({
              show: true
            })
          } else {
            var arr1port;
            //循环数据数组
            for (var i = 0; i < valuearr.length; i++) {
              var valuearrtit = valuearr[i].PeripheralID;
              //根据ID进行判断并分类
              if (valuearrtit == "OutAC") {
                var index = valuearr[i].PeripheralPort;
                arr1.push(valuearr[i])
                //进行排序
                arr1.sort(compare("PeripheralPort"))
                function compare(index) {
                  return function (a, b) {
                    //value1 - value2升序
                    //value2 - value1降序
                    var value1 = a[index];
                    var value2 = b[index];
                    return value1 - value2;//升序
                  }
                }
              }
              if (valuearrtit == "OutDC") {
                arr2.push(valuearr[i])
                //进行排序
                arr2.sort(compare("PeripheralPort"))
                function compare(index) {
                  return function (a, b) {
                    //value1 - value2升序
                    //value2 - value1降序
                    var value1 = a[index];
                    var value2 = b[index];
                    return value1 - value2;//升序
                  }
                }
              }
              if (valuearrtit !== "OutAC" && valuearrtit !== "WtrFlowTtl" && valuearrtit !== "OutDC") {
                arr3.push(valuearr[i])
                //进行排序
                arr3.sort(compare("PeripheralPort"))
                function compare(index) {
                  return function (a, b) {
                    //value1 - value2升序
                    //value2 - value1降序
                    var value1 = a[index];
                    var value2 = b[index];
                    return value1 - value2;//升序
                  }
                }
              }
            }
          }
        } else {
          _this.setData({
            show: true
          })
        }
        // 请求数据
        wx.request({
          url: _this.data.url+ `/v1/user/getdevicedata`,
          method: "GET",
          header: {
            'LoginToken': loginToken // 默认值
          },
          data: {
            devID: devID
          },
          success(res) {
            // console.log(res)
            console.log(res)
            var device = res.data.stateCode;
            if (device !== 0) {
              return _this.setData({
                shebeiname: arr1,
                shuibeng: arr2,
                wendu: arr3
              })
            } else {
              var zhi = res.data.data.device[0].devicedata[0].paramvalue;
              // console.log(zhi)
              if (!zhi) {
                return
              } else {
                for (var i in zhi) {
                  var zhiID = zhi[i].ID;
                  
                  if (zhiID == "OutAC") {
                    zhiarr1.push(zhi[i])
                    //进行排序
                    zhiarr1.sort(compare("Port"))
                    function compare(index) {
                      return function (a, b) {
                        //value1 - value2升序
                        //value2 - value1降序
                        var value1 = a[index];
                        var value2 = b[index];
                        return value1 - value2;//升序
                      }
                    }
                  }
                  if (zhiID == "OutDC") {
                    zhiarr2.push(zhi[i])
                    //进行排序
                    zhiarr2.sort(compare("Port"))
                    function compare(index) {
                      return function (a, b) {
                        //value1 - value2升序
                        //value2 - value1降序
                        var value1 = a[index];
                        var value2 = b[index];
                        return value1 - value2;//升序
                      }
                    }
                  }
                }
                // console.log(arr1)
                // console.log(zhiarr1)
                // console.log(zhiarr2)

                for (var i in zhiarr1) {
                  var zhiarr1value = zhiarr1[i].Value
                  var zhiarrport = zhiarr1[i].Port
                  for (var j in arr1) {
                    var arrport = arr1[j].PeripheralPort
                    if (arrport == zhiarrport) {
                      arr1[i].value = zhiarr1value
                    }
                  }
                }

                for (var i in zhiarr2) {
                  var zhiarr2value = zhiarr2[i].Value
                  var zhiarrport = zhiarr2[i].Port
                  for (var j in arr2) {
                    var arrport = arr2[j].PeripheralPort
                    if (arrport == zhiarrport) {
                      arr2[j].value = zhiarr2value
                    }
                  }
                }

                //赋值储存到本地
                _this.setData({
                  shebeiname: arr1,
                  shuibeng: arr2,
                  wendu: arr3
                })
              }
            }
          },
          fail(res) {
            _this.onShow()
            // setTimeout(function () {
            //   wx.showToast({
            //     title: "请求错误",
            //     image: '/imges/shibai.png',
            //     duration: 2000
            //   })
            //   _this.setData({
            //     show: true
            //   })
            // }, 2000)
          }
        })
      },
      fail(res) {
        console.log(res)
        _this.onShow()
        // setTimeout(function () {
        //   wx.showToast({
        //     title: "请求错误",
        //     image: '/imges/shibai.png',
        //     duration: 2000
        //   })
        //   _this.setData({
        //     show: true
        //   })
        // }, 2000)
      }
    })
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