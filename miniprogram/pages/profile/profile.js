// pages/profile/profile.js
var app = getApp();
const testDB = wx.cloud.database({
  env: 'test-share-92a8ff'
})
const col = testDB.collection('user_profile')
Page({
  data: {
    // text:"这是一个页面"  
    array: ["广东", "上海", "深圳", "北京"],
    toast1Hidden: true,
    modalHidden: true,
    modalHidden2: true,
    notice_str: '',
    userinfo: {},
    place: 'China',
    sex:1,
    age:18,
    show:false,
    profileid:0
  },
  toast1Change: function (e) {
    this.setData({ toast1Hidden: true });
  },
  //弹出确认框  
  modalTap: function (e) {
    this.setData({
      modalHidden: false
    })
  },
  confirm_one: function (e) {
    var that=this
    col.doc(that.data.profileid).update({
      data:{
        age:that.data.age,
        sex:that.data.sex,
        place:that.data.place,
        show:that.data.show,
      },
      success: function (res) {
        console.log(res)
        that.setData({
          modalHidden:true,
          toast1Hidden:false,
          notice_str:'提交成功'
        })
      },
      fail:function(res){
        that.setData({
          modalHidden: true,
          toast1Hidden: false,
          notice_str: '提交失败'
        })
      }
    })
    // this.setData({
    //   modalHidden: true,
    //   toast1Hidden: false,
    //   notice_str: '提交成功'
    // });
  },
  cancel_one: function (e) {
    console.log(e);
    this.setData({
      modalHidden: true,
      toast1Hidden: false,
      notice_str: '取消成功'
    });
  },
  //弹出提示框  
  modalTap2: function (e) {
    this.setData({
      modalHidden2: false
    })
  },
  modalChange2: function (e) {
    this.setData({
      modalHidden2: true
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      place: e.detail.value
    })
    console.log(this.data.place)
  },
  bindAgeChange:function(e){
    this.setData({
      age:e.detail.value
    })
    console.log(this.data.age)
  },
  bindSexChange:function(e){
    this.setData({
      sex:e.detail.value
    })
    console.log(this.data.sex)
  },
  bindShowChange:function(e){
    this.setData({
      show:e.detail.value
    })
    console.log(this.data.show)
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数  
    console.log('onLoad')
    var that = this
    this.setData({
      userinfo: options.userinfo
    })
    col.where({

    }).get({
      success: function (res) {
        if (res.data.length === 0) {
          console.log('没有数据')
          // wx.getStorage({
          //   key: 'userinfo',
          //   success: function(res) {
          //     that.setData({
          //       userinfo:res.data.userinfo
          //     })
          //   },
          // })
          col.add({
            // data 字段表示需新增的 JSON 数据
            data: {
              // name:that.data.userinfo.Nickname,
              age: that.data.age,
              sex: that.data.sex,
              place: that.data.place,
              show: that.data.show
            },
            success: function (res) {
              console.log('Load插入成功')
            },
            fail: function (res) {
              console.log('Load插入失败')
            }
          })
          col.where({
          }).get({
            success: function (res) {
              wx.setStorage({
                key: 'profileid',
                data: {
                  profileid: res.data[0]._id
                }
              })
              that.setData({
                profileid: res.data[0]._id,
              })
              console.log(that.data.profileid)
            },
          })
        }
        else {
          var r = res
          wx.setStorage({
            key: 'id',
            data: {
              profileid: r.data[0]._id
            }
          })
          that.setData({
            profileid: r.data[0]._id,
            age:r.data[0].age,
            sex:r.data[0].sex,
            place:r.data[0].place,
            show:r.data[0].show
          })
          console.log(that.data.profileid)
        }
      }
    })
  },
  onReady: function () {
    // 页面渲染完成  
  },
  onShow: function () {
    // 页面显示  
  },
  onHide: function () {
    // 页面隐藏  
  },
  onUnload: function () {
    // 页面关闭  
  },
  formSubmit: function (e) {
    var that = this;
    console.log(e)
    var formData = e.detail.value;
    wx.request({
      url: 'http://www.xazyjj.com/client/',
      data: formData,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data)
        that.modalTap();
      },
      fail: function (res) {
        that.modalTap();
      }
    })
  },
  formReset: function () {
    console.log('form发生了reset事件');
    this.modalTap2();
  }
})  
