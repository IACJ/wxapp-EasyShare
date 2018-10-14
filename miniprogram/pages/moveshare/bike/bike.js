// miniprogram/pages/moveshare/bike/bike.js
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

  chooseId: function(e) {
    let that = this
    let inputId = this.data.inputId
    console.log(inputId)
    if (!inputId) {
      return
    }

    //to do : check inputId

 
    wx.showModal({
      title: '确认使用？',
      content: '确认使用' + inputId +'？',
      success: function(e) {
        console.log(e);
        if (e.confirm) {
          that.setData({
            'id': inputId
          })
        }
      }
    })
  },
  bindinput:function(e) {
    this.setData({
      'inputId' : e.detail.value
    })
  },
  btnStopUse:function(e) {
    let that = this
    wx.showModal({
      title: '结束使用？',
      content: '结束使用' + this.data.id + '？',
      success: function (e) {
        console.log(e);
        if (e.confirm) {
          that.setData({
            'id': null
          })
        }
      }
    })
  },
  scanToChoose:function(e) {
    wx.scanCode({
      success: function (res) {
        console.log('扫码success')
        console.log(res)
      },
      fail: function (err) {
        console.log('扫码fail')
        console.log(err)
        wx.showToast({
          title: '未能识别二维码',
          icon: 'none'
        })
      }
    })
  }
})