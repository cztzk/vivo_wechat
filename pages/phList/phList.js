// pages/phList/phList.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    seleted: 0, //选项卡下标
    title: new Array, //标题
    cont: new Array, //产品集合
    product: new Array, //实际显示的产品
    pageNum: [1, 1, 1, 1], //每个栏目的当前页面
    pageSize: 6, //一次请求的数据
    isloading: false, //判断是否正在加载中
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getPhList();
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
  getPhList: function() {
    var _this = this;
    var pageNum = _this.data.pageNum[_this.data.seleted];
    var data = {
      type: "phone",
      pageNum: pageNum
    }
    _this.data.pageNum[_this.data.seleted] = ++pageNum;
    console.log(_this.data.pageNum[_this.data.seleted]);
    app.requestData(data, "get", function(res) {
      // console.log(res.data.data[0].jsonData);
      _this.setData({
        title: res.data.data[0].jsonData.phone.upper,
        cont: res.data.data[0].jsonData.phone.lower,
        product: res.data.data[0].jsonData.phone.lower[0].lower_data
      })
      // console.log(_this.data.product)
    })
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
    var _this = this;
    var pageNum = _this.data.pageNum[_this.data.seleted];
    var data = {
      type: "phone",
      pageNum: pageNum
    }
    _this.data.pageNum[_this.data.seleted] = ++pageNum;
    console.log(_this.data.pageNum[_this.data.seleted]);
    var isloading = _this.data.isloading
    // 判断是否正在加载中
    if (!isloading) {
      _this.data.isloading = true;
      var data = {
        type: "phone"
      }
      app.requestData(data, "get", function(res) {
        console.log(res.data.data[0].jsonData.phone);
        var newProductList = _this.data.product.concat(res.data.data[0].jsonData.phone.lower[0].lower_data);
        console.log(newProductList)
        _this.setData({
          isloading:false,
          product: newProductList
        })
        _this.data.isloading = false;
      })
    }
  },
  toggletab: function(e) {
    var index = e.currentTarget.dataset.id;
    var productlist = this.data.cont[index].lower_data;
    this.setData({
      seleted: index,
      product: productlist
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})