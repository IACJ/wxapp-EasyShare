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
  }
})
