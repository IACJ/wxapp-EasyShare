// pages/map/map.js
Page({
  data: {
    pageHeight:0,
    latitude: 23.099994,
    longitude: 113.324520,
    markers: [{
      id: 1,
      latitude: 23.099994,
      longitude: 113.324520,
      name: 'T.I.T 创意园'
    }],
  },

  onLoad:function (e) {
    this.setData({
      'pageHeight': getApp().globalData.systemInfo.windowHeight
    })
  },

  onReady: function (e) {
    this.mapCtx = wx.createMapContext('myMap')
    this.setData({
      'pageHeight': getApp().globalData.systemInfo.windowHeight
    })
    this.mapCtx.moveToLocation()
  },

})
