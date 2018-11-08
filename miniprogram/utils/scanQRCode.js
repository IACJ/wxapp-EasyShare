const scanQRCode = function(thatPage,mothed) {
  let that = thatPage
  wx.scanCode({
    success: function (res) {
      console.log('扫码success:')
      console.log(res)
      let url = res.result
      let domain = domainURI(url)

      if (domain === 'www.easyshare.com') {
        let { share_type, thing_type, thing_numberId } = parseUrl(res.result)
        wx.showModal({
          title: '确认使用？',
          content: '确认使用 ' + thing_type + '_' + thing_numberId + '?',
          success: function (e) {
            if (e.confirm) {
              tryStartUse(thatPage, mothed, share_type, thing_type, thing_numberId)
            }
          }
        })
        return
      }

      let bizName;

      if (domain === 'ofo.so') {
        bizName = 'ofo单车'
      } else if (domain === 'www.mobike.com') {
        bizName = '摩拜单车'
      } else  {
        bizName = domain
      }

      wx.showModal({
        title: "未合作的商家",
        content: '该物品属于“' + bizName + '”,此商家尚未和我们合作。',
        success: (res) => {
          console.log(res)
        }
      })

    },
    fail: function (err) {
      console.log('扫码fail:')
      console.log(err)
      wx.showToast({
        title: '未发现二维码',
        icon: 'none'
      })
    }
  })
}

const tryStartUse = function (thatPage, mothed, share_type, thing_type, thing_numberId) {

  let that = this
  let name = 'bike_startUse'
  wx.cloud.callFunction({
    name: name,
    data: {
      'sort': thing_type,
      'id': Number(thing_numberId),
      'shareType': share_type
    },
    success: res => {
      console.log('callFunction success:')
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
        if (mothed === 'redirect') {
          wx.redirectTo({
            url: url,
          })
        } else if (mothed === 'navigate') {
          wx.navigateTo({
            url: url,
          })
        }
      }
    },
    fail: err => {
      console.log('callFunction fail:')
      console.log(err)
      wx.showToast({
        title: '开始使用失败',
        icon: 'none'
      })
    }
  })
}

function domainURI(str) {
  var durl = /https?:\/\/([^\/]+)\//i;
  let domain = str.match(durl);
  console.log(domain)
  return domain[1];
}

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

module.exports = {
  scanQRCode: scanQRCode
}