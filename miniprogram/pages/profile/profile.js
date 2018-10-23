// pages/profile/profile.js
var app = getApp();
const db = wx.cloud.database({
  env: 'test-share-92a8ff'
})
const col = db.collection('user_profile')
Page({
  data: {
    pageHeight:0,
    genderList: ['男', '女', '未知'],

    nickName: '',
    age: 0,
    sex: '男',
    place: ['', '', ''],
    show: false,
    phone: '',
    email: '',
  },

  bindAgeChange:function(e){
    console.log(e)
    this.setData({
      age:e.detail.value
    })
  },
  bindSexChange:function(e){
    console.log(e)
    this.setData({
      sex:e.detail.value
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      place: e.detail.value
    })
    console.log(this.data.place)
  },
  bindPhone:function(e){
    console.log(e)
    this.setData({
      phone:e.detail.value
    })
  },
  bindEmail:function(e){
    console.log(e)
    this.setData({
      email:e.detail.value
    })
  },
  bindShowChange: function (e) {
    console.log(e)
    this.setData({
      show: e.detail.value
    })
  },

  onLoad: function (options) {
    console.log('onLoad')
    var that = this
    let systemInfo = wx.getSystemInfoSync();
    this.setData({
      'pageHeight': systemInfo.windowHeight
    })
    this.setData({
      nickName: options.nickName
    })

    wx.showLoading({
      title: '加载中',
      mask: true
    })

    col.where({}).get({
      success: function (res) {  
        console.log(res)
        if (res.data.length === 0) {
          console.log('用户资料初始化.')
          col.add({
            data: {
              nickName: that.data.nickName,
              age: 0,
              sex: '未知',
              place: ['','',''],
              show: false,
              phone:'',
              email:'',
            },
            success: function (res) {
              console.log('[用户资料初始化]成功:' + JSON.stringify(res))
              wx.hideLoading()
              that.profileId = res._id;
            },
            fail: function (res) {
              console.log('[用户资料初始化]失败:' + JSON.stringify(res))
              wx.hideLoading()
              wx.showToast({
                title: '网络异常，请重新打开此页面。',
              })
            }
          })
        }else{
          that.profileId = res.data[0]._id;
          that.setData({
            age: res.data[0].age,
            sex: res.data[0].sex,
            place: res.data[0].place,
            phone: res.data[0].phone,
            email: res.data[0].email,
            show: res.data[0].show,
          })
          wx.hideLoading()
        }
      },
      fail:function(e) {
        wx.hideLoading()
        wx.showToast({
          title: '网络异常，请重新打开此页面。',
        })
      }
    })
  },

  reset: function(e) {
    this.setData({
      age: 0,
      sex: '未知',
      place: ['', '', ''],
      show: false,
      phone: '',
      email: '',
    })
  },

  submit: function (e) {
    var that = this;

    if (!this.profileId) {
      wx.showToast({
        title: '页面异常，请重新打开该页面',
        icon: 'none'
      })
    }

    if (this.data.phone && !/^(?:13\d|15\d|18\d|17\d)\d{5}(\d{3}|\*{3})$/.test(this.data.phone)) {
      wx.showToast({
        title: '手机号错误',
        icon: 'none'
      })
      return
    }
    if (this.data.email && !/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(this.data.email)) {
      wx.showToast({
        title: '邮箱错误',
        icon: 'none'
      })
      return
    }

    wx.showModal({
      title: '确认提交',
      content: '确认提交吗？',
      success: function(res) {
        if (res.confirm) {
          that.confirmSubmit()
        }
      }
    })
  },

  confirmSubmit: function () {
    var that = this
    col.doc(that.profileId).update({
      data: {
        age: that.data.age,
        sex: that.data.sex,
        place: that.data.place,
        phone: that.data.phone,
        email: that.data.email,
        show: that.data.show,
      },
      success: function (res) {
        console.log(res)
        wx.showToast({
          title: '提交成功',
        })
      },
      fail: function (res) {
        console.log(res)
        wx.showToast({
          title: '提交失败',
          icon: 'none'
        })
      }
    })
  },
})  
