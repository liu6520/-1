//app.js
App({
  globalData:{
    userid: wx.getStorageSync("userid"),
    loginToken:wx.getStorageSync("loginToken"),
    devID: wx.getStorageSync("devID"),
  },
  
  onLaunch: function () {
    // 展示本地存储能力
    wx.setTabBarBadge({
      index: 2,
      text: '1'
    })
  },
})
