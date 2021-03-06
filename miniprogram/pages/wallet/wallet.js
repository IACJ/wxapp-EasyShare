// pages/wallet/wallet.js
const testDB = wx.cloud.database({
  env: 'test-share-92a8ff'
})
const col = testDB.collection('user_money')
Page({
  data: {
    overage: 0,
    ticket: 0,
    walletid:0
  },
  // 页面加载
  onLoad: function (options) {
    var that=this
    wx.setNavigationBarTitle({
      title: '我的钱包'
    })
    col.where({

    }).get({
      success: function(res){
        if(res.data.length===0){
          console.log('没有数据')
          col.add({
            // data 字段表示需新增的 JSON 数据
            data: {
              money: 0,
            },
            success: function (res) {
              console.log('Load插入成功')
            },
            fail: function (res) {
              console.log('Load插入失败')
            }
          })
          col.where({
          }).get({
            success: function(res){
              wx.setStorage({
                key: 'walletid',
                data: {
                  id: res.data[0]._id
                }
              })
              that.setData({
                walletid: res.data[0]._id,
              })
            },
          })
        }
        else{
          var r=res
          wx.setStorage({
            key: 'walletid',
            data: {
              id: r.data[0]._id
            }
          })
          that.setData({
            walletid: r.data[0]._id,
          })
        }
      }
    })
  },
  // 页面加载完成，更新本地存储的overage
  onReady: function () {
    wx.getStorage({
      key: 'overage',
      success: (res) => {
        this.setData({
          overage: res.data.overage
        })
      }
    })
  },
  // 页面显示完成，获取本地存储的overage
  onShow: function () {
    wx.getStorage({
      key: 'overage',
      success: (res) => {
        this.setData({
          overage: res.data.overage
        })
      }
    })
  },
  // 余额说明
  overageDesc: function () {
    wx.showModal({
      title: "",
      content: "为了减少小程序审核负担，暂未拉起真实支付系统",
      showCancel: false,
      confirmText: "我知道了",
    })
  },
  // 跳转到充值页面
  movetoCharge: function () {
    // 关闭当前页面，跳转到指定页面，返回时将不会回到当前页面
    wx.navigateTo({
      url: '../charge/charge',
    })
  },
  // 优惠券
  showTicket: function () {
    wx.showModal({
      title: "",
      content: "当前没有可用优惠券",
      showCancel: false,
      confirmText: "我知道了",
    })
  },
  // 押金退还
  showDeposit: function () {
    wx.showModal({
      title: "",
      content: "押金会立即退回，退款后，您将不能继续使用任何共享物品，确认要进行此退款吗？",
      cancelText: "继续使用",
      cancelColor: "#5F9EA0",
      confirmText: "押金退款",
      confirmColor: "#ccc",
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: "退款成功",
            icon: "success",
            duration: 2000
          })
        }
      }
    })
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();

    setTimeout(function () {
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();

    }, 1500);

  }
})

