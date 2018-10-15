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
    place: 0,
    sex:1,
    age:0,
    show:false,
    profileid:0,
    items: [
      {name:0, value: '男', checked: 'false' },
      {name:1, value: '女', checked: 'false' },
    ],
    phone:null,
    email:null
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
    console.log(e)
    console.log(that.data.profileid)
    if (this.data.email === null || /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(this.data.email)){
      if (this.data.phone === null || /^(?:13\d|15\d|18\d|17\d)\d{5}(\d{3}|\*{3})$/.test(this.data.phone)){
        col.doc(that.data.profileid).update({
          data:{
            age:that.data.age,
            sex:that.data.sex,
            place:that.data.place,
            phone:that.data.phone,
            email:that.data.email,
            show: that.data.show,
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
            console.log(res)
            that.setData({
              modalHidden: true,
              toast1Hidden: false,
              notice_str: '提交失败'
            })
          }
        })
      }
      else{
        console.log("html手机号错误")
        that.setData({
          modalHidden: true,
          toast1Hidden: false,
          notice_str: '手机号错误'
        })
      }
    }
    else{
      console.log("html弹框邮箱错误")
      that.setData({
        modalHidden: true,
        toast1Hidden: false,
        notice_str: '邮箱错误'
      })
    }
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
    console.log(e)
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
  bindPhone:function(e){
    this.setData({
      phone:e.detail.value
      })
  },
  bindEmail:function(e){
    this.setData({
      email:e.detail.value
    })
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数  
    console.log('onLoad')
    var that = this
    this.setData({
      userinfo: options.userinfo
    })
    var r
    col.where({

    }).get({
      success: function (res) {
        r=res
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
              name:that.data.userinfo,
              age: that.data.age,
              sex: that.data.sex,
              place: that.data.place,
              show: that.data.show,
              phone:that.data.phone,
              email:that.data.email,
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
              that.setData({
                profileid:res.data[0]._id
              })
              console.log("successed"+that.data.profileid)
            },
          })
        }
      },
      complete:function(){
        console.log("complete"+r)
        that.setData({
          profileid: r.data[0]._id,
          age:r.data[0].age,
          sex:r.data[0].sex,
          place:r.data[0].place,
          phone:r.data[0].phone,
          email:r.data[0].email,
          show:r.data[0].show,
        })
        var i=parseInt(that.data.sex)
        var c="items["+i+"].checked"
        console.log("i"+i+"    "+c)
        that.setData({
          [c]:true
        }) 
        console.log("complete"+that.data.profileid)
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
    that.modalTap();
  },
  formReset: function () {
    console.log('form发生了reset事件');
    this.modalTap2();
  }
})  
