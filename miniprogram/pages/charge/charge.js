Page({
  data: {
    inputValue: 0
  },
  // 页面加载
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '充值'
    })

  },
  // 存储输入的充值金额
  bindInput: function (res) {
    this.setData({
      inputValue: res.detail.value
    })
  },
  // 充值
  charge: function () {
    // 必须输入大于0的数字
    if (parseInt(this.data.inputValue) <= 0 || isNaN(this.data.inputValue)) {
      wx.showModal({
        title: "提示",
        content: "请正确输入整数金额",
        showCancel: false,
        confirmText: "OK"
      })
    } else {
      wx.redirectTo({
        url: '../wallet/wallet',
        success: function (res) {
          wx.showToast({
            title: "充值成功",
            icon: "success",
            duration: 2000
          })
        }
      })
    }
  },
  // 页面销毁，更新本地金额，（累加）
  onUnload: function () {

    wx.getStorage({
      key: 'overage',
      success: (res) => {
        wx.setStorage({
          key: 'overage',
          data: {
            overage: parseInt(this.data.inputValue) + parseInt(res.data.overage)
          }
        })
      },
      // 如果没有本地金额，则设置本地金额
      fail: (res) => {
        wx.setStorage({
          key: 'overage',
          data: {
            overage: parseInt(this.data.inputValue)
          },
        })
      }
    })
  }
})

