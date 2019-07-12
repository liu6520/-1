Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
  },
  data: {
    footerurl1: "/imges/footer1.png",
    footerurl1_1: "/imges/footer1-1.png",
    footerurl2: "/imges/footer2.png",
    footerurl2_1: "/imges/footer2-1.png",
    footerurl3: "/imges/footer3.png",
    footerurl3_1: "/imges/footer3-1.png",
    footerurl4: "/imges/footer4.png",
    footerurl4_1: "/imges/footer4-1.png",
    num:0,
    selected1: true,
    selected2: false,
    selected3: false,
    selected4: false,
    // 这里是一些组件内部数据
    someData: {
     
    }
  },
  methods: {
    table:function(e){  
   
    this.setData({
      
    })
    },
    onReady: function () {
        
    },
    // 这里是一个自定义方法
    selected1: function (e) {
      console.log(e)
      this.setData({
        selected1: true,
        selected2: false,
        selected3: false,
        selected4: false,
      })
      wx.redirectTo({
        url: '/pages/index/index'
      })
    },
    selected2: function (e) {
      this.setData({
        num: e.currentTarget.dataset.index,
        selected1: false,
        selected2: true,
        selected3: false,
        selected4: false,
      })
      wx.redirectTo({
        url: '/pages/classifly/classifly'
      })
    },
    selected3: function (e) {
      this.setData({
        selected1: false,
        selected2: false,
        selected3: true,
        selected4: false,
      })
      wx.redirectTo({
        url: '/pages/logs/logs'
      })
    },
    selected4: function (e) {
      this.setData({
        selected1: false,
        selected2: false,
        selected3: false,
        selected4: true,
      })
      wx.redirectTo({
        url: '/pages/percenter/percenter'
      })
      },
    customMethod: function () { }
  }
})