// var host = "https://www.it120.cc/fstzk/json/list"; //测试服务器
var url = "https://api.it120.cc/fstzk/json/list"; //测试服务器
// function requestData(url, data, method, success) {
function requestData(data, method, success) {
  // var requestUrl = host +url;
  wx.showLoading({
    title: '加载中...',
  })
  wx.request({
    url: url,
    data: data,
    header: {
      'content-type': 'application/json'
    },
    method: method,
    dataType: '',
    success: function(res) {
      console.log(res.data.code)
      if(res.data.code==0){
        wx.hideLoading();
        success(res);
      }else{
        wx.hideLoading();
        wx,wx.showModal({
          title: '提示',
          content: '数据异常，返回首页',
          showCancel: true,
          success: function(res) {
            wx.switchTab({
              url: '/pages/index/index',
            })
          },
          fail: function(res) {

          },
          complete: function(res) {

          },
        })
      }
      
    },
    fail: function(err) {
      console.log(err);
    }
  })
}

module.exports = {
  requestData: requestData,
}