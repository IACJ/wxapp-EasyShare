// miniprogram/pages/fixshare/meetingroom/meetingroom.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    open: "开锁",
    close: "已关锁",
    sort: "会议室",
    passageId: "W97QoNx_Lia3NQJp"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if (options.id) {
      this.setData({
        'inputId': options.id,
        'id': options.id
      })
    }
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

  chooseId: function (e) {
    let that = this
    let inputId = this.data.inputId
    console.log(inputId)
    if (!inputId) {
      return
    }

    //to do : check inputId


    wx.showModal({
      title: '确认使用？',
      content: '确认使用' + inputId + '？',
      success: function (e) {
        console.log(e);
        if (e.confirm) {
          that.tryStartUse(inputId)
        }
      }
    })
  },
  bindinput: function (e) {
    this.setData({
      'inputId': e.detail.value
    })
  },
  btnStopUse: function (e) {
    let that = this
    wx.showModal({
      title: '结束使用？',
      content: '结束使用' + this.data.id + '？',
      success: function (e) {
        console.log(e)
        if (e.confirm) {
          that.tryStopUse()
          // that.lock()
        }
      }
    })
  },
  scanToChoose: function (e) {
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
  },
  tryStartUse: function (id) {
    let that = this
    this.setData({
      busy: true
    })
    wx.cloud.callFunction({
      // 要调用的云函数名称
      name: 'bike_startUse',
      data: {
        'id': Number(id),
        'sort': 'meetingroom',
        'shareType': 'fixshare'
      },
      success: res => {
        console.log('call success')
        console.log(res)

        if (res.result === 'Empty.') {
          wx.showToast({
            title: 'ID输入错误',
            icon: 'none'
          })
        }
        if (res.result === 'isUsing.') {
          wx.showToast({
            title: '该物品正在被他人使用',
            icon: 'none'
          })
        }
        if (res.result === 'OK.') {
          that.setData({
            'id': id
          })
        }
      },
      fail: err => {
        console.log('call fail')
        console.log(err)
        wx.showToast({
          title: '开始使用失败',
          icon: 'none'
        })
      },
      complete: e => {
        that.setData({
          busy: false
        })
      }
    })
  },
  tryStopUse: function (e) {
    let that = this
    wx.cloud.callFunction({
      // 要调用的云函数名称
      name: 'bike_stopUse',
      data: {
        'id': Number(this.data.id),
        'sort': 'meetingroom',
      },
      success: res => {
        console.log('call success')
        console.log(res)
        if (res.result === 'OK.') {
          that.setData({
            'id': null
          })
        } else {
          wx.showToast({
            title: '结束使用失败',
            icon: 'none'
          })
        }
      },
      fail: err => {
        console.log('call fail')
        console.log(err)
        wx.showToast({
          title: '结束使用失败',
          icon: 'none'
        })
      },
      complete: e => {
        that.setData({
          busy: false
        })
      }
    })
  },
  unlock: function (e) {
    let that = this
    wx.showLoading({
      title: '正在开锁',
    })
    wx.cloud.callFunction({
      name: 'bike_unlock',
      data: {
        'id': Number(that.data.id),
        'sort': 'meetingroom'
      },
      success: res => {
        console.log('call success')
        console.log(res)
        wx.hideLoading()
        that.setData({
          open: '已开锁',
          close: '关锁'
        })
      },
      fail: err => {
        wx.hideLoading()
        wx.showToast({
          title: '开锁失败',
          icon: 'none'
        })
      }
    })
  },
  lock: function (e) {
    let that = this
    wx.showLoading({
      title: '正在关锁',
    })
    wx.cloud.callFunction({
      name: 'bike_lock',
      data: {
        'id': Number(that.data.id),
        'sort': 'meetingroom'
      },
      success: res => {
        console.log('call success')
        console.log(res)
        wx.hideLoading()
        that.setData({
          open: '开锁',
          close: '已关锁'
        })
      },
      fail: err => {
        wx.hideLoading()
        wx.showToast({
          title: '关锁失败',
          icon: 'none'
        })
      }
    })
  },
  outId: function (e) {
    console.log(this.data.id)
  },


  btnClick: function (e) {
    if (e) {
      let targetPath = "/pages/passage/passage" + "?id=" + this.data.passageId
      wx.navigateTo({
        url: targetPath,
      });
    }
  },
})