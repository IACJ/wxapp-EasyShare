// pages/myindex/myindex.js
Page({

  data: {

  },

  onLoad: function (options) {

  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  btnScan: function(e) {
    let that = this
    console.log(e)
    wx.scanCode({
      success: function(res) {
        console.log('扫码success')
        console.log(res)
        function domainURI(str) {
          var durl = /https?:\/\/([^\/]+)\//i;
          domain = str.match(durl);
          console.log(domain)
          return domain[1];
        }

        var domain = domainURI(res.result)
        let bizName = domain

        if (bizName === 'ofo.so'){
          bizName = 'ofo单车'
        } else if (bizName === 'www.mobike.com'){
          bizName = '摩拜单车'
        } else if (bizName === 'www.easyshare.com') {
          console.log(res.result)

          function parseUrl(url) {
            var result = {};
            var query = url.split("?")[1];
            var queryArr = query.split("&");
            queryArr.forEach(function (item) {
              var obj = {};
              var value = item.split("=")[1];
              var key = item.split("=")[0];
              obj[key] = value;
              result[key] = value;
            });
            return result;
          }
          console.log(parseUrl(res.result))
          let { share_type, thing_type, thing_numberId } = parseUrl(res.result)

          wx.showModal({
            title: '确认使用？',
            content: '确认使用' + thing_numberId + '？',
            success: function (e) {
              console.log(e);
              if (e.confirm) {
                that.tryStartUse(share_type, thing_type, thing_numberId)
              }
            }
          })
          return
        }

        wx.showModal({
          title: "未合作的商家",
          content:'该物品属于“'+bizName+'”,此商家尚未和我们合作。',
          success: (res) => {
            console.log(res)
          }
        })
 
      },
      fail: function(err) {
        console.log('扫码fail')
        console.log(err)
        wx.showToast({
          title: '未能识别二维码',
          icon: 'none'
        })
      }
    })
  },

  btnMoveShare: function(e) {
    console.log(e)
    wx.navigateTo({
      url: '/pages/moveshare/moveshare',
    })
  },
  btnFixShare: function(e) {
    console.log(e)
    wx.navigateTo({
      url: '/pages/fixshare/fixshare',
    })
  },
  tryStartUse: function (share_type, thing_type, thing_numberId) {
  
    let that = this
    let name = thing_type+'_startUse'
    wx.cloud.callFunction({
      name: 'bike_startUse',
      data: {
        'id': Number(thing_numberId)
      },
      success: res => {
        console.log('call success')
        console.log(res)

        if (res.result === 'Empty.') {
          wx.showToast({
            title: 'ID输入错误',
            icon: 'none'
          })
        }
        if (res.result === 'isUsing.') {
          wx.showToast({
            title: '该物品正在被他人使用',
            icon: 'none'
          })
        }
        if (res.result === 'OK.') {
          
          let url = '/pages/' + share_type + '/' + thing_type + '/' + thing_type
          url += '?id=' + thing_numberId
          console.log(url)
          wx.navigateTo({
            url: url,
          })
        }
      },
      fail: err => {
        console.log('call fail')
        console.log(err)
        wx.showToast({
          title: '开始使用失败',
          icon: 'none'
        })
      }
    })
  }
  
})