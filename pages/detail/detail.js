// pages/detail/detail.js
var WxParse = require('../../wxParse/wxParse.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null, //产品id
    datail: new Array, //产品详情页
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    circular: true,
    max: null, //该产品数量的最大值
    num: 1, //默认加入购物车数量为空
    minusStatus: "disabled", //减少按钮是否禁用，默认禁用
    maxStatus: "normal", //增加按钮是否禁用
    sliderLeft: 0,
    tabIndex: 0,
    cartnum:1,//购物车已有数量
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getId(options);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },
  getId: function(options) {
    var _this = this;
    var id = options.id;
    if (id) {
      _this.setData({
        id: id
      })
      _this.getDetail();
    } else {
      wx.showToast({
        title: '不存在该产品，1秒后返回首页',
        icon: 'none',
        duration: 1000,
        success: function() {
          wx.switchTab({
            url: '/pages/index/index',
          })
        }
      })
    }
  },
  getDetail: function() {
    var _this = this;
    var data = {
      type: "detail",
    }
    app.requestData(data, "get", function(res) {
      var detail = res.data.data[0].jsonData.detail;
      var id = _this.data.id;
      var leng = detail.length;
      if (leng > 0) {
        for (var i = 0; i < leng; i++) {
          if (detail[i].id == id) {
            _this.setData({
              datail: detail[i],
              max: 10, //未有接口，默认不得大于10
            })
            console.log(detail[i]);
            WxParse.wxParse("detail", "html", detail[i].homePeizhi, _this);
            if (_this.data.max > 1) {
              _this.data.maxStatus = "normal";
            } else {
              _this.data.maxStatus = "disabled";
            }
            return false;
          }
        }
        wx.showToast({
          title: '不存在该产品，1秒后返回首页',
          icon: 'none',
          duration: 1000,
          success: function() {
            wx.switchTab({
              url: '/pages/index/index',
            })
          }
        })
      }
    })
  },
  // 数量框事件
  /* 点击减号 */
  bindMinus: function() {
    var num = this.data.num;
    // 如果大于1时，才可以减  
    if (num > 1) {
      num--;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },
  /* 点击加号 */
  bindPlus: function() {
    var max = this.data.max;
    var num = this.data.num;
    var maxStatus = this.data.maxStatus;
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num < 1 ? 'disabled' : 'normal';
    // 判断是否超出最大值
    if (num < max) {
      ++num;
    } else {
      maxStatus = "disabled"
    }
    console.log(minusStatus);
    // 将数值与状态写回  
    this.setData({
      num: num,
      minusStatus: minusStatus,
      maxStatus: maxStatus
    });
  },
  /* 输入框事件 */
  bindManual: function(e) {
    var num = e.detail.value;
    var max = this.data.max;
    if (num > 1 && num < max) {
      // 将数值与状态写回  
      this.setData({
        num: num
      });
    } else {
      var num1 = this.data.num;
      this.setData({
        num: num1
      });
    }
  },
  // 选项卡切换
  tabClick: function(e) {
    var index = e.currentTarget.dataset.index;
    this.setData({
      tabIndex: index,
      sliderLeft: 50 * index,
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})