// pages/me/me.js

Page({
  data: {
    userInfo: null,
  },

  onLoad: function () {
    wx.getStorage({
      key: 'userInfo',
      success: (res) => {
        this.setData({
          userInfo: res.data.userInfo,
        })
      }
    });
  },

  //拨打电话
  actiondel: function () {
    wx.showActionSheet({
      itemList: ['15013356356', '18366196180'],
      itemColor: '#31c5ff',
      success: function (res) {
        console.log(res.tapIndex)
        if (res.tapIndex === 0) {
          wx.makePhoneCall({
            phoneNumber: '15013356356',
            success: function () {
              console.log("拨打电话成功！")
            },
            fail: function () {
              console.log("拨打电话失败！")
            }
          })
        } else
          if (res.tapIndex === 1) {
            wx.makePhoneCall({
              phoneNumber: '18366196180',
              success: function () {
                console.log("拨打电话成功！")
              },
              fail: function () {
                console.log("拨打电话失败！")
              }
            })
          }
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },

  getuserinfo: function(e) {
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
    });
    // 存储用户信息到本地
    wx.setStorage({
      key: 'userInfo',
      data: {
        userInfo: e.detail.userInfo,
      }
    })
  },

  btnLogout: function(e) {
    wx.showModal({
      title: "确认退出?",
      success: (res) => {
        if (res.confirm) {
          wx.removeStorageSync('userInfo')
          this.setData({
            userInfo: null,
          })
        }
      }
    })
  }
})
