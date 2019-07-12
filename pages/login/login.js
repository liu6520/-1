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
    codeurl:"http://nc.wugui8.cn/api/rcode/",
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
  getcokefn:function(){
    var _that = this;
    if(_that.data.getcode==true){
        return false
    }
    if(_that.data.cokecheck == true){
      // 数据请求
      wx.request({
        url: this.data.codeurl + this.data.usertel, // 仅为示例，并非真实的接口地址
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success(res) {
          console.log(res.data)
          var getcodesuccess = res.data.status
          console.log(getcodesuccess)
          var codetips = res.data.message
          //获取验证码成功
          if (getcodesuccess == 1) {  
            wx.showToast({       //提示框
              title: codetips,
              icon: 'success',
              duration: 2000
            })
          //改变发送按钮状态  
          _that.setData({
            getcode:true,
            cokecheck:false
          })
        //开启倒计时
        var getcodenum = 60;
        var getcodetimer = setInterval(function () {
          getcodenum--;
          _that.setData({
            codetext: getcodenum + "s后重试"
          })
          //倒计时完回复初始状态
          if (getcodenum < 0) {
            clearInterval(getcodetimer);
            _that.setData({
              codetext: "获取验证码",
              getcode:false
            })
            var codeReg = /^(((13[0-9])|(14[579])|(15([0-3]|[5-9]))|(16[6])|(17[0135678])|(18[0-9])|(19[89]))\d{8})$/;
            if (codeReg.test(_that.data.usertel)) {
              _that.setData({
                cokecheck:true
              })
            }
            else {
              _that.setData({
                cokecheck: false
              })
            }
          }
        }, 1000)//倒计时速度
      }
      //失败提示框
      if (getcodesuccess == 0){
        console.log('失败')
        wx.showToast({
          title: codetips,
          icon: 'none',
          duration: 2000
        })
      }
        },
        fail() {
          console.log(1)
        }
      })
    }
  },
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
  registerinput2Fn: function (e) {
    this.setData({
      registerinput2: e.detail.value
    })
  },
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
    var _that = this;
    var telReg = /^(((13[0-9])|(14[0-9])|(15([0-9]))|(16[0-9])|(17[0-9])|(18[0-9])|(19[0-9]))\d{8})$/;
    var passwordReg = /^[a-zA-Z0-9\~\!\@\#\$\%\^\&\*\_\+\{\}\:\"\|\<\>\?\-\=\;\'\\\,\.\/]{6,15}$/;
    
    if (this.data.loginCheck == true){
      wx.request({
        url: 'http://39.97.97.99:8080/v1/user/login', //仅为示例，并非真实的接口地址
        method: "POST",
        data: {
          account: 'test',
          password: "123sedaew",
          account_type: "user"
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          console.log(res.data)
          var loginYes = res.data.stateCode;
          var logintips = "登录成功";
          var userid = res.data.data.userId;    //userid
          var loginToken = res.data.data.loginToken;
          var devID = res.data.data.devID;
          console.log(devID)
          console.log(userid)
          if(loginYes == 0){
            wx.showToast({
              title: logintips,
              icon: 'none',
              duration: 2000
            })
            // 保存用户id
            wx.setStorageSync("loginToken", loginToken);
            wx.setStorageSync("devID", devID);
            var pages = getCurrentPages();//当前页面
            if (pages.length > 1) {
              var beforePage = pages[pages.length - 2];//获取上一个页面实例对象
              beforePage.changeData();//触发父页面中的方法
            }
            setTimeout(function(){
              wx.navigateBack({
                delta: 1
              })
            },1000) 
          }
          else{
            wx.showToast({
              title: "登录失败",
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
    }
  },
  //注册验证
  registerFn:function(){
    var _that = this;
    var telReg = /^(((13[0-9])|(14[0-9])|(15([0-9]))|(16[0-9])|(17[0-9])|(18[0-9])|(19[0-9]))\d{8})$/;
    var passwordReg = /^[a-zA-Z0-9\~\!\@\#\$\%\^\&\*\_\+\{\}\:\"\|\<\>\?\-\=\;\'\\\,\.\/]{6,15}$/;
    if (!telReg.test(_that.data.usertel)) {
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
    if (this.data.registerinput2 == ""){
      wx.showToast({
        title: "验证码有误",
        icon: 'none',
        duration: 2000
      })
      this.setData({
        registerCheck: false
      })
      return false
    }
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
        url: 'http://nc.wugui8.cn/api/reg', //仅为示例，并非真实的接口地址
        method: "POST",
        data: {
          phone: _that.data.usertel,
          password: _that.data.registerinput3,
          code: _that.data.registerinput2,
          uid: _that.data.uid
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res){
          console.log(res.data)
          var registerYes = res.data.status;
          var registertips = res.data.message;
          if ( registerYes == 1) {
            wx.showToast({
              title: registertips,
              icon: 'none',
              duration: 2000
            })
            setTimeout(function () {
              _that.or1()
            }, 1500)
          }
          else{
            wx.showToast({
              title: registertips,
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