// pages/me/me.js

Page({
  data: {
    userInfo: {
      avatarUrl: "",
      nickName: "未登录"
    },
    bType: "primary", // 按钮类型
    actionText: "登录", // 按钮文字提示
    lock: false //登录按钮状态，false表示未登录
  },

  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '个人中心'
    })
    wx.getStorage({
      key: 'userInfo',
      // 能获取到则显示用户信息，并保持登录状态，不能就什么也不做
      success: (res) => {
        wx.hideLoading();
        this.setData({
          userInfo: {
            avatarUrl: res.data.userInfo.avatarUrl,
            nickName: res.data.userInfo.nickName
          },
          bType: res.data.bType,
          actionText: res.data.actionText,
          lock: true
        })
      }
    });
  },

  bindAction: function () {
    this.data.lock = !this.data.lock
    // 如果没有登录，登录按钮操作
    if (this.data.lock) {
      wx.showLoading({
        title: "正在登录"
      });
      wx.login({
        success: (res) => {
          wx.hideLoading();
          wx.getUserInfo({
            withCredentials: false,
            success: (res) => {
              this.setData({
                userInfo: {
                  avatarUrl: res.userInfo.avatarUrl,
                  nickName: res.userInfo.nickName
                },
                bType: "warn",
                actionText: "退出登录"
              });
              // 存储用户信息到本地
              wx.setStorage({
                key: 'userInfo',
                data: {
                  userInfo: {
                    avatarUrl: res.userInfo.avatarUrl,
                    nickName: res.userInfo.nickName
                  },
                  bType: "warn",
                  actionText: "退出登录"
                },
                success: function (res) {
                  console.log("存储成功")
                }
              })
            }
          })
        }
      })
      // 如果已经登录，退出登录按钮操作     
    } else {
      wx.showModal({
        title: "确认退出?",
        content: "退出后将不能使用游戏机",
        success: (res) => {
          if (res.confirm) {
            console.log("确定")
            // 退出登录则移除本地用户信息
            wx.removeStorageSync('userInfo')
            this.setData({
              userInfo: {
                avatarUrl: "",
                nickName: "未登录"
              },
              bType: "primary",
              actionText: "登录"
            })
          } else {
            console.log("cancel")
            this.setData({
              lock: true
            })
          }
        }
      })
    }
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

  //下拉刷新
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();

    setTimeout(function () {
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();

    }, 1500);
  }
})
