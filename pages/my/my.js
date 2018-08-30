// pages/user/user.js
const app = getApp()
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: new Array, //用户信息
    islogin: false, //是否登录
    login: true, //true登录框  false注册框
    // 用户界面相关按钮数据
    cellList: [{
        icon: "icon-icon3",
        name: "订单中心",
        url: 'order'
      },
      {
        icon: "icon-gouwuche",
        name: "购物车",
        url: 'cart'
      },
      {
        icon: "icon-dizhi",
        name: "收货地址",
        url: 'addr'
      },
      {
        icon: "icon-fenxiang",
        name: "扫码分析",
        url: 'camera'
      },
      {
        icon: "icon-guanyu",
        name: "关于vivo",
        url: 'about'
      },
    ],
    code: "7364", //验证码相关数据
    isgetcode: false, //是否点击获取验证码，以便做倒计时
    ischeck: false, //判断所有的input是否填写正确
    countdown: 60, //倒计时
    form: {
      name: "",
      phone: "13500000000",
      pass: "",
      passes: "",
      code: ""
    },
    msg: "请输入相关数据，以获取更多优惠"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let islogin = wx.getStorageSync("islogin")
    if (islogin) {
      this.setData({
        islogin: true
      })
    }
    this.getUserInfo();
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  // 获取用户相关数据
  getUserInfo: function() {
    let that = this;
    wx.getUserInfo({
      success: function(res) {
        that.setData({
          userInfo: res.userInfo,
        })
      }
    })
  },
  // 验证表单相关数据事件
  namecheck: function(e) {
    let str = e.detail.value;
    let reg = /^([\u4e00-\u9fa5]{1,10}|[a-zA-Z1-9\.\s]{1,10})$/gi;
    let phone = "form.name";
    if (!reg.test(str)) {
      this.setData({
        [phone]: '',
        msg: "请输入正确的用户名"
      })
    } else {
      this.setData({
        [phone]: str,
        msg: "请输入相关数据，以获取更多优惠"
      })
      this.checkfun();
    }
  },
  phonecheck: function(e) {
    let str = e.detail.value;
    let phone = "form.phone";
    let reg = /^1[3578]\d{9}$/gi;
    if (!reg.test(str)) {
      this.setData({
        [phone]: '',
        msg: "请输入正确的手机号"
      })
    } else {
      this.setData({
        [phone]: str,
        msg: "请输入相关数据，以获取更多优惠"
      })
      this.checkfun();
    }
  },
  passcheck: function(e) {
    let str = e.detail.value;
    let reg = /^(\w){6,20}$/;
    let pass = "form.pass";
    if (!reg.test(str)) {
      this.setData({
        [pass]: '',
        msg: "请输入6-20的密码"
      })
    } else {
      this.setData({
        [pass]: str,
        msg: "请输入相关数据，以获取更多优惠"
      })
      this.checkfun();
    }
  },
  passescheck: function(e) {
    let str = e.detail.value;
    let reg = /^(\w){6,20}$/;
    let passes = "form.passes";
    if (!reg.test(str)) {
      this.setData({
        [passes]: '',
        msg: "请输入6-20的重复密码"
      })
    } else {
      if (str == this.data.form.pass) {
        this.setData({
          [passes]: str,
          msg: "请输入相关数据，以获取更多优惠"
        })
        this.checkfun();
      } else {
        this.setData({
          [passes]: "",
          msg: "两次密码不相同"
        })
      }
    }
  },
  codecheck: function(e) {
    let str = e.detail.value;
    let code = "form.code";
    if (str == this.data.code) {
      this.setData({
        [code]: str,
        msg: "请输入相关数据，以获取更多优惠"
      })
      this.checkfun();
    } else {
      this.setData({
        [code]: "",
        msg: "验证码错误"
      })
    }
  },
  // 获取验证码事件
  newcodefun: function() {
    if (this.data.isgetcode) {
      wx.showModal({
        title: '提示',
        content: '操作频繁，请稍候',
      })
    } else {
      this.setData({
        isgetcode: !this.data.isgetcode
      })
      wx.showModal({
        title: '提示',
        content: '验证码为7364',
      });
      let _this = this;
      let interval = setInterval(function() {
        let countdown = --_this.data.countdown;
        _this.setData({
          countdown: countdown
        })
        if (_this.data.countdown == 0) {
          clearInterval(interval);
          _this.setData({
            isgetcode: !_this.data.isgetcode,
            countdown: 60
          })
        }
      }, 1000);
    }
  },
  // 失焦时判断数据是否填写完整以改变按钮的状态
  checkfun: function() {
    let form = this.data.form;
    if (this.data.login) {
      if (form.name == "" || form.pass == "") {
        return false;
      }
    } else {
      for (var index in form) {
        if (form[index] == "") {
          return false;
        }
      }
    }
    this.setData({
      ischeck: true
    })

  },
  change: function() {
    this.setData({
      login: !this.data.login,
      ischeck: false
    })
  },
  // 表单按钮点击事件
  formbtnfun: function() {
    if (this.data.ischeck) {
      //login true登录框  false注册框
      if (this.data.login) {
        this.loginfun();
      } else {
        this.registerfun();
      }
    }
  },
  loginfun: function() {
    let that = this;
    let data = {
      mobile: 13500000000,
      pwd: that.data.form.pass,
      deviceId: 1,
      deviceName: 1
    }
    util.login(data, that);
  },
  registerfun: function() {
    let that = this;
    let form = that.data.form;
    let data = {
      mobile: 13500000000,
      pwd: form.pass,
      code: form.code,
      nick: form.name,
    }
    util.register(data, that);
  },
  // 跳转事件
  jumpfun: function(e) {
    console.log(e);
    var url = e.currentTarget.dataset.url;
    if (url == "cart") {
      wx.switchTab({
        url: '/pages/' + url + "/" + url,
      })
    } else {
      wx.navigateTo({
        url: '/pages/' + url + "/" + url,
      })
    }
  }
})