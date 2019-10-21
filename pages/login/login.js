  // pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //获取验证码
    or1:true,
    or2:false,
    usertel:null,
    codetext:"获取验证码",
    url:'https://app.xiaomangny.com',
    cokecheck:false,
    getcode:false,         //判断是否点击发送，开关
    //登录验证
    logininput1:null,
    logininput2:null,
    loginCheck: true,
    //注册验证
    registerinput2: null,
    registerinput3: null,
    registerinput4: null,
    registerCheck: true,
    uid:""
    },
    
  // 登录 注册切换
  or1:function(){
    this.setData({
      or1:true,
      or2:false
    })
  },
  or2: function () {
    this.setData({
      or1: false,
      or2: true
    })
  },
  //手机号码验证
  usertelFn: function (e) {
    this.setData({
      usertel: e.detail.value,
    })
    var _that = this;
    var usertels =this.data.usertel;
    console.log(usertels);
    var telReg = /^(((13[0-9])|(14[579])|(15([0-3]|[5-9]))|(16[6])|(17[0135678])|(18[0-9])|(19[89]))\d{8})$/;
    if (telReg.test(usertels)){
      this.setData({
        cokecheck: true
      })
    }else{
      this.setData({
        cokecheck: false
      })
    }
  },
  // 发送验证码
  // getcokefn:function(){
  //   var _that = this;
  //   if(_that.data.getcode==true){
  //       return false
  //   }
  //   if(_that.data.cokecheck == true){
      // 数据请求
  //     wx.request({
  //       url: this.data.codeurl + this.data.usertel, // 仅为示例，并非真实的接口地址
  //       method: "POST",
  //       header: {
  //         "Content-Type": "application/x-www-form-urlencoded"
  //       },
  //       success(res) {
  //         console.log(res.data)
  //         var getcodesuccess = res.data.status
  //         console.log(getcodesuccess)
  //         var codetips = res.data.message
  //         //获取验证码成功
  //         if (getcodesuccess == 1) {  
  //           wx.showToast({       //提示框
  //             title: codetips,
  //             icon: 'success',
  //             duration: 2000
  //           })
  //         //改变发送按钮状态  
  //         _that.setData({
  //           getcode:true,
  //           cokecheck:false
  //         })
  //       //开启倒计时
  //       var getcodenum = 60;
  //       var getcodetimer = setInterval(function () {
  //         getcodenum--;
  //         _that.setData({
  //           codetext: getcodenum + "s后重试"
  //         })
  //         //倒计时完回复初始状态
  //         if (getcodenum < 0) {
  //           clearInterval(getcodetimer);
  //           _that.setData({
  //             codetext: "获取验证码",
  //             getcode:false
  //           })
  //           var codeReg = /^(((13[0-9])|(14[579])|(15([0-3]|[5-9]))|(16[6])|(17[0135678])|(18[0-9])|(19[89]))\d{8})$/;
  //           if (codeReg.test(_that.data.usertel)) {
  //             _that.setData({
  //               cokecheck:true
  //             })
  //           }
  //           else {
  //             _that.setData({
  //               cokecheck: false
  //             })
  //           }
  //         }
  //       }, 1000)//倒计时速度
  //     }
  //     //失败提示框
  //     if (getcodesuccess == 0){
  //       console.log('失败')
  //       wx.showToast({
  //         title: codetips,
  //         icon: 'none',
  //         duration: 2000
  //       })
  //     }
  //       },
  //       fail() {
  //         console.log(1)
  //       }
  //     })
  //   }
  // },
  //登录注册双向绑定
  logininput1Fn:function(e){
    this.setData({
      logininput1: e.detail.value
    })
  },
  logininput2Fn: function (e) {
    this.setData({
      logininput2: e.detail.value
    })
  },
  // registerinput2Fn: function (e) {
  //   this.setData({
  //     registerinput2: e.detail.value
  //   })
  // },
  registerinput3Fn: function (e) {
    this.setData({
      registerinput3: e.detail.value
    })
  },
  registerinput4Fn: function (e) {
    this.setData({
      registerinput4: e.detail.value
    })
  },
  //登录验证
  loginFn: function(){
    wx.showToast({
      title:"loading",
      mask:true,
      icon: 'loading',
      duration: 2000
    })
    var _that = this;
    var telReg = /^(((13[0-9])|(14[0-9])|(15([0-9]))|(16[0-9])|(17[0-9])|(18[0-9])|(19[0-9]))\d{8})$/;
    var passwordReg = /^[a-zA-Z0-9\~\!\@\#\$\%\^\&\*\_\+\{\}\:\"\|\<\>\?\-\=\;\'\\\,\.\/]{6,15}$/;
    
    if (this.data.loginCheck == true){
      wx.request({
        url: _that.data.url + `/v1/user/login`, //仅为示例，并非真实的接口地址
        method: "POST",
        data: {
          account: _that.data.logininput1,
          password:_that.data.logininput2,
          account_type: "user"
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          console.log(res)
          var loginYes = res.data.stateCode;
          var message = res.data.message;
          console.log(loginYes)
          //var userid = res.data.data.userId;    //userid
          //console.log(devID)
          
          if(loginYes == 0){
            setTimeout(function(){
              wx.showToast({
                title: "登录成功",
                icon: 'none',
                duration: 2000
              })
              // 保存用户id
              var loginToken = res.data.data.loginToken;
              var devID = res.data.data.devID;
              wx.setStorageSync("loginToken", loginToken);
              wx.setStorageSync("devID", devID);
              var pages = getCurrentPages();//当前页面
              if (pages.length > 1) {
                var beforePage = pages[pages.length - 2];//获取上一个页面实例对象
                beforePage.changeData();//触发父页面中的方法
              }
              setTimeout(function () {
                wx.navigateBack({
                  delta: 1
                })
              }, 1000)
            },2000) 
          } else if(loginYes !== 0 && message == "account and password is not matched"){
            setTimeout(function () {
              wx.showToast({
                title: "账号或密码错误",
                icon: 'none',
                duration: 2000
              })
            }, 2000)
            return;
          }
          else{
            setTimeout(function(){
              wx.showToast({
                title: "登录失败",
                icon: 'none',
                duration: 2000
              })
            },2000)
          }
        },
        fail(err){
          console.log(err);
          setTimeout(function () {
            wx.showToast({
              title: "登录失败",
              icon: 'none',
              duration: 2000
            })
          }, 2000)
        }
      })
    }
  },
  //注册验证
  registerFn:function(){
    var loginToken = wx.getStorageSync('loginToken')
    var _that = this;
    var telReg = /^(((13[0-9])|(14[0-9])|(15([0-9]))|(16[0-9])|(17[0-9])|(18[0-9])|(19[0-9]))\d{8})$/;
    var passwordReg = /^[a-zA-Z0-9\~\!\@\#\$\%\^\&\*\_\+\{\}\:\"\|\<\>\?\-\=\;\'\\\,\.\/]{6,15}$/;
    if (!_that.data.usertel) {
      wx.showToast({
        title: "电话号码有误",
        icon: 'none',
        duration: 2000
      })
      this.setData({
        registerCheck: false
      })
      return false
    }
    // if (this.data.registerinput2 == ""){
    //   wx.showToast({
    //     title: "验证码有误",
    //     icon: 'none',
    //     duration: 2000
    //   })
    //   this.setData({
    //     registerCheck: false
    //   })
    //   return false
    //}
    if (!passwordReg.test(this.data.registerinput3)){
      wx.showToast({
        title: "密码输入有误",
        icon: 'none',
        duration: 2000
      })
      this.setData({
        registerCheck: false
      })
      return false
    }
    if(this.data.registerinput4 !== this.data.registerinput3){
      wx.showToast({
        title: "两次密码不一致",
        icon: 'none',
        duration: 2000
      })
      this.setData({
        registerCheck: false
      })
      return false
    }
    if (this.data.registerCheck == true){
      wx.request({
        url: 'https://app.xiaomangny.com:8080/v1/user/useradd', //仅为示例，并非真实的接口地址
        method: "POST",
        data: {
          UserName: _that.data.usertel,
          Passwd: _that.data.registerinput3,
          IsAdmin:0
        },
        header: {
          'content-type': 'application/json', // 默认值
          LoginToken:loginToken
        },
        success(res){
          console.log(res.data)
          var registerYes = res.data.stateCode;
          var registertips = res.data.message;
          if ( registerYes == 0) {
            wx.showToast({
              title: "添加成功",
              icon: 'none',
              duration: 2000
            })
            setTimeout(function () {
              _that.or1()
            }, 1500)
          }
          else{
            wx.showToast({
              title: "添加失败",
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '登录'
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