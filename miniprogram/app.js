//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
        env: 'test-share-92a8ff'
      })
      console.log('小程序云已加载: test-share')
    }
    let systemInfo = wx.getSystemInfoSync();

    this.globalData = {
      'systemInfo': systemInfo
    }

    let that = this
    wx.showLoading({
      title: '加载中',
      mask: true
    })

    wx.cloud.callFunction({
      name: 'getOrderByOpenid',
      success: res => {
        console.log('[call success]:')
        console.log(res)
        let needCheck = false

        let orderList = res.result.data
        orderList.forEach(function (item, index) {
          if (item.status.step === '进行中'){
            needCheck = true
          }
        })

        if (needCheck) {
          wx.showModal({
            title: '提示',
            content: '你有未完成的订单,前往查看？',
            success: (res)=>{
              if (res.confirm){
                wx.navigateTo({
                  url: '/pages/myorder/myorder',
                })
              }
            }
          })
        }
      },
      complete:(e)=>{
        wx.hideLoading()
      }
    })
  }
})
