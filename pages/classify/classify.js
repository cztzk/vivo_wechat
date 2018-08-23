// pages/classify/classify.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toscroll: true,
    active: 0,
    toView: "inToView2"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getclassift();
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
  // 获取分类信息
  getclassift: function() {
    var _this = this;
    var data = {
      type: "classify"
    }
    var _this = this;
    app.requestData(data, "get", function (res) {
      _this.setData({
        nav: res.data.data[0].jsonData.classify.left,
        cont: res.data.data[0].jsonData.classify.right
      })
    })
  },
  // 切换子导航状态
  toggleClass: function(e) {
    console.log(e.currentTarget.dataset.index);
    this.setData({
      active: e.currentTarget.dataset.index,
      toView: 'inToView' + e.currentTarget.dataset.index 
    })
    console.log(this.data.toView);
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})