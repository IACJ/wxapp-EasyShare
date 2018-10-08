// pages/myindex/myindex.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

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

  },

  btnScan: function(e) {
    console.log(e)
    wx.scanCode({
      success: function(res) {
        console.log('扫码success')
        console.log(res)
        function domainURI(str) {
          var durl = /https?:\/\/([^\/]+)\//i;
          domain = str.match(durl);
          return domain[1];
        }

        var domain = domainURI(res.result)
        let bizName = domain

        if (bizName === 'ofo.so'){
          bizName = 'ofo单车'
        } else if (bizName === 'www.mobike.com'){
          bizName = '摩拜单车'
        }

        wx.showModal({
          title: "未合作的商家",
          content:'该物品属于“'+bizName+'”,此商家尚未和我们合作。',
          success: (res) => {
            console.log(res)
          }
        })
 
      },
      fail: function(err) {
        console.log('扫码fail')
        console.log(err)
        wx.showToast({
          title: '未能识别二维码',
          icon: 'none'
        })
      }
    })
  },

  btnMoveShare: function(e) {
    console.log(e)
    wx.navigateTo({
      url: '/pages/moveshare/moveshare',
    })
  },
  btnFixShare: function(e) {
    console.log(e)
    wx.navigateTo({
      url: '/pages/fixshare/fixshare',
    })
  }
})