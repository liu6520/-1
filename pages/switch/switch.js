// pages/switch/switch.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:null,
    setIner:"",
    h1:0,
    m1:0,
    s1:0,
    h2: 0,
    m2: 0,
    s2: 0,
    h3: 0,
    m3: 0,
    s3: 0,
    num1:1,
    num2:1,
    num3:1,
    of1:false,
    of2:false,
    of3:false,
    setInter1:"",
    setInter2:"",
    setInter3:"",
    time1: '00:00',
    time2: '24:00',
  },
  // 开关值
  switch1Change: function (e) {
    console.log('switch2 发生 change 事件，携带值为', e.detail.value)
    var _of = e.detail.value;
    this.setData({
      of1:_of
    })
  },
  switch2Change: function (e) {
    console.log('switch2 发生 change 事件，携带值为', e.detail.value)
    var _of = e.detail.value;
    this.setData({
      of2: _of
    })
  },
  switch3Change: function (e) {
    console.log('switch2 发生 change 事件，携带值为', e.detail.value)
    var _of = e.detail.value;
    this.setData({
      of3: _of
    })
  },
  // 判断开关计时器
  ofswitch1:function(){
    var that = this;
    if(that.data.of1){
      that.startSetInter1();
    }else{
      that.endSetInter1();
    }
  },
  ofswitch2: function () {
    var that = this;
    if (that.data.of2) {
      that.startSetInter2();
    } else {
      that.endSetInter2();
    }
  },
  ofswitch3: function () {
    var that = this;
    if (that.data.of3) {
      that.startSetInter3();
    } else {
      that.endSetInter3();
    }
  },
  
  // 开启计时器
  startSetInter1:function(){
    var _this = this;
    _this.data.setInter1 = setInterval(function(){
      var numVal = _this.data.num1++;
      _this.setData({ s1: numVal });
      if(_this.data.s1 == 60){
        var newm1 =_this.data.m1 + 1;
        _this.setData({ m1:newm1,s1:0,num1:1});
        if (_this.data.m1 == 60) {
          var newh1 = _this.data.h1 + 1;
          _this.setData({ h1: newh1, m: 0 });
        }
      }
    },1000)
  },
  startSetInter2: function () {
    var _this = this;
    _this.data.setInter2 = setInterval(function () {
      var numVal = _this.data.num2++;
      _this.setData({ s2: numVal });
      if (_this.data.s2 == 60) {
        var newm2 = _this.data.m2 + 1;
        _this.setData({ m2: newm2, s2: 0, num2: 1 });
        if (_this.data.m2 == 60) {
          var newh2 = _this.data.h2 + 1;
          _this.setData({ h2: newh2, m2: 0 });
        }
      }
    }, 1000)
  },
  startSetInter3: function () {
    var _this = this;
    _this.data.setInter3 = setInterval(function () {
      var numVal = _this.data.num3++;
      _this.setData({ s3: numVal });
      if (_this.data.s3 == 60) {
        var newm3 = _this.data.m3 + 1;
        _this.setData({ m3: newm3, s3: 0, num3: 1 });
        if (_this.data.m3 == 60) {
          var newh3 = _this.data.h3 + 1;
          _this.setData({ h3: newh3, m: 0 });
        }
      }
    }, 1000)
  },
  // 关闭计时器
  endSetInter1: function () {
    var that = this;
    clearInterval(that.data.setInter1)
    that.setData({
      h1: 0,
      m1: 0,
      s1: 0,
      num1: 1,
    })
  },
  endSetInter2: function () {
    var that = this;
    clearInterval(that.data.setInter2)
    that.setData({
      h2: 0,
      m2: 0,
      s2: 0,
      num2: 1,
    })
  },
  endSetInter3: function () {
    var that = this;
    clearInterval(that.data.setInter3)
    that.setData({
      h3: 0,
      m3: 0,
      s3: 0,
      num3: 1,
    })
  },


  // 时间选择器
  bindTimeChange1: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time1: e.detail.value
    })
  },
  bindTimeChange2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time2: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    // 接收传值
    _this.setData({
      title: options.title
    })
    wx.setNavigationBarTitle({
      title: _this.data.title
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#3b82eb',
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