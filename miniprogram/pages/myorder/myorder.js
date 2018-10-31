// miniprogram/pages/myorder/myorder.js

const db = wx.cloud.database({})
const util = require('../../utils/util.js')
Page({

  data: {
    orderList:[],
    msg:''
  },

  onShow:function(e) {
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

        let orderList = res.result.data
        orderList.forEach(function (item, index) {
          console.log(item)
          item.createTimeStr = util.formatTime(new Date(item.createTime))
          // console.log(index)
        })
        that.setData({
          orderList: orderList
        })
        if (res.result.data.length === 0) {
          that.setData({
            msg: '你暂无订单'
          })
        }
        wx.hideLoading()
      },
      fail: err => {
        console.log('[call fail]:')
        console.log(err)
        wx.hideLoading()
        wx.showToast({
          title: '查询失败',
          icon: 'none'
        })
        that.setData({
          'msg': '查询失败',
          'orderList': null
        })
      },
    })
  },

  tapOrder: function(e) {
    console.log(e)
    let order = e.currentTarget.dataset.order
    console.log(order)
    if (order.status.step === "进行中") {
      let url = '/pages/' + order.share_type + '/' + order.thing_type + '/' + order.thing_type
      url += '?id=' + order.thing_numberId
      console.log(url)
      wx.navigateTo({
        url: url,
      })
    } else if (order.status.step === "已完成") {
      wx.showToast({
        title: '订单已完成',
        icon:'none'
      })
    }

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showToast({
      title: '已经触底啦！',
      icon: 'none'
    })
  },

})