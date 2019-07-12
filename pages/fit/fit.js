// pages/fit/fit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:null,
    devID:null,
    shebeiname: [],
    shuibeng: [],
    wendu:[],
    show:false,
  },
  switch2Change: function (e) {
    console.log('switch2 发生 change 事件，携带值为', e.detail.value)
  },
  // 跳转流量
  goto: function(e) {
    //传值标题
    var that = this;
    var _index = e.currentTarget.dataset.index;
    var _title = that.data.shuibeng;
    var thetitle = _title[_index].PeripheralTitle;
     that.setData({
       title: thetitle
     })

    wx.navigateTo({
      url: '/pages/switch/switch?title=' + that.data.title //传值
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    console.log(options)
    // 接收传值
    _this.setData({
      devID:options.devID
    })
    var devID = _this.data.devID;
    var loginToken = wx.getStorageSync("loginToken");

    wx.setNavigationBarTitle({
      title: '设备详情'
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#3b82eb',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
    var arr1 = [];
    var arr2 = [];
    var arr3 = [];
    // 请求数据
    wx.request({
      url: 'http://39.97.97.99:8080/v1/user/getdeviceinfo',
      method: "GET",
      header: {
        'LoginToken':loginToken // 默认值
      },
      data: {
        devID: devID
      },
      success(res){
        var value = res.data.data.device[0];
        //判断数据是否为空
        console.log(value)
        if (value){
          var valuearr = value.PeripheralValue;
          console.log(valuearr)
          //循环数据数组
          for (var i = 0; i < valuearr.length; i++){
            var valuearrtit = valuearr[i].PeripheralID;
              //根据ID进行判断并分类
              if (valuearrtit == "OutAC"){
                  arr1.push(valuearr[i])
              }
              if (valuearrtit == "WtrFlowTtl"){
                arr2.push(valuearr[i])
              }
              if (valuearrtit !== "OutAC" && valuearrtit !== "WtrFlowTtl" && valuearrtit !== "OutDC"){
                  arr3.push(valuearr[i])
              }
          }
          //赋值储存到本地
          console.log(arr3)
          _this.setData({
            shebeiname:arr1,
            shuibeng:arr2,
            wendu:arr3
          })
        }else{
          _this.setData({
            show:true
          })
        }
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