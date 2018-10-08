const testDB = wx.cloud.database({
  env: 'test-share-92a8ff'
})
const col = testDB.collection('user_money')
Page({
  data: {
    inputValue: 0,
    walletid: 0
  },
  // 页面加载
  onLoad: function (options) {
    var that=this
    wx.setNavigationBarTitle({
      title: '充值'
    })
    wx.getStorage({
      key: 'walletid',
      success: function(res) {
        console.log(res)
        var r=res
        that.setData({
          walletid:r.data.id
        })
        console.log(that.data.walletid)
      },
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
    var that=this
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
    var that = this
    var overage=0
    wx.getStorage({
      key: 'overage',
      success: (res) => {
        console.log("111")
        overage = parseInt(this.data.inputValue) + parseInt(res.data.overage)
        wx.setStorage({
          key: 'overage',
          data: {
            overage: overage
          }
        })
      },      
      // 如果没有本地金额，则设置本地金额
      fail: (res) => {
        overage = parseInt(this.data.inputValue)

        wx.setStorage({
          key: 'overage',
          data: {
            overage: overage
          },
        })
      },
      complete:function(e){
        col.doc(that.data.walletid).update({
          data: {
            money: overage,
          },
          success: function (res) {
            console.log(res)
            console.log
          },
          fail: function (res) {
            console.log(res)
            console.err
          },
        })
      }
    })
  }
})

