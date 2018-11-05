// pages/myindex/myindex.js
const { scanQRCode } = require('../../utils/scanQRCode.js')

Page({

  btnScan :function(e){
    scanQRCode(this,'navigate')
  },

  btnMoveShare: function(e) {
    wx.navigateTo({
      url: '/pages/moveshare/moveshare',
    })
  },
  
  btnFixShare: function(e) {
    wx.navigateTo({
      url: '/pages/fixshare/fixshare',
    })
  },
})