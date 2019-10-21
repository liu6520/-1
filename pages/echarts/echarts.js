import * as echarts from '../../ec-canvas/echarts.js';
const app = getApp();

function setOption(chart, xdata, ydata) {
  const option = {
    backgroundColor: "#ffffff",
    color: ["#ff3838", "#32C5E9", "#67E0E3", "#91F2DE", "#FFDB5C", "#FF9F7F"],
    series: [{
      label: {
        normal: {
          fontSize: 14
        }
      },
      type: 'pie',
      center: ['50%', '50%'],
      radius: [0, '70%'],
      data: [{
        value: 55,
        name: '北京'
      }, {
        value: 20,
        name: '武汉'
      }, {
        value: 10,
        name: '杭州'
      }, {
        value: 20,
        name: '广州'
      }, {
        value: 38,
        name: '上海'
      },
      ],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 2, 2, 0.3)'
        }
      }
    }]
  };
  chart.setOption(option)
}


Page({
  data: {
    ecOne: {
      lazyLoad: true
    },
    ecTwo: {
      lazyLoad: true
    },
    timer: ''                 //因为我要实时刷新，所以设置了个定时器
  },
  onLoad: function (options) {
    var _this = this;
    this.getOneOption();
    this.getTwoOption();
    this.setData({                    //每隔一分钟刷新一次
      timer: setInterval(function () {
        _this.getOneOption();
        _this.getTwoOption();
      }, 60000)
    })
    this.oneComponent = this.selectComponent('#mychart-one');
    this.twoComponent = this.selectComponent('#mychart-two');
  },
  onReady: function () {               //这一步是一定要注意的
    
  },
  onUnload: function () {
    clearInterval(this.data.timer)
  },
  init_one: function (xdata, ydata) {           //初始化第一个图表
    this.oneComponent.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      setOption(chart, xdata, ydata)
      this.chart = chart;
      return chart;
    });
  },
  init_two: function (xdata, ydata) {        //初始化第二个图表
    this.twoComponent.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      setOption(chart, xdata, ydata)
      this.chart = chart;
      return chart;
    });
  },
  getOneOption: function () {        //这一步其实就要给图表加上数据
    var _this = this;
    wx.request({
      url: 'http://localhost:3000/num',    //你请求数据的接口地址
      method: 'get',
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        //我这里就假设res.xdata和res.ydata是我们需要的数据，即在x轴和y轴展示的数据，记住一定是数组哦！
        
      }
    })
  },
  //第二个图表也是一样的处理
  getTwoOption: function () {
    var _this = this;
    wx.request({
      url: 'http://localhost:3000/num',    //你请求数据的接口地址
      method: 'get',
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        console.log(res)
        _this.init_two(res.data.num, res.data.num)
      }
    })
  }
});