var app = getApp();
// pages/percenter/percenter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myInfopicurl:"/imges/my-info-pic.png",
    myInfoname:"小川UU",
    moneynum1:'0.00',
    moneynum2:'0.00',
    moneynum3:0
  },
  tabbar1: function (){
    wx.navigateTo({
      url: '/pages/fit/fit'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的'
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
  // 清除数据
  // clearStorageSync:function(){
  //   wx.removeStorageSync('userid');
  //   wx.removeStorageSync('loginToken');
  //   wx.removeStorageSync('devID');
  //   console.log(app.globalData.userid)
  //   console.log(app.globalData.loginToken)
  //   console.log(app.globalData.devID)
  //   var pages = getCurrentPages();//当前页面
  //   if (pages.length > 1) {
  //     var beforePage = pages[pages.length - 2];//获取上一个页面实例对象
  //     beforePage.changeData();//触发父页面中的方法
  //   }
  //   setTimeout(function () {
  //     wx.reLaunch({
  //       url: '/pages/index/index',
  //     })
  //   }, 1000)
  // },
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