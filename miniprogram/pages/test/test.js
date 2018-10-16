// pages/test/test.js
const testDB = wx.cloud.database({
  env: 'test-share-92a8ff'
})

const col=testDB.collection('todos')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  wxapp_Add: function() {
    console.log('小程序端_新增数据')
    col.add({
      // data 字段表示需新增的 JSON 数据
      data: {
        description: "learn cloud database",
        due: new Date("2018-09-25"),
        tags: [
          "cloud",
          "database"
        ],
        done: false
      },
      success: function (res) {
        console.log('插入成功')
        console.log(res)
      },
      fail: function(res) {
        console.log('插入失败')
        console.log(res)
      }
    })
  },

  wxapp_Remove: function(){
    console.log('小程序端_删除数据')
    col.doc('W6xD_tdfTEkKDbvK').remove({
      success: function (res) {
        console.log('删除成功')
        console.log(res)
        console.log
      },
      fail: function(res) {
        console.log('删除失败')
        console.log(res)
        console.err
      },
    })
  },

  wxapp_Get: function(){
    console.log('小程序端_查询数据')
    col.where({
      
    }).get({
        success: function (res) {
          console.log('查询成功')
          console.log(res)
          console.log(res.data[0]._id)
        },
        fail: function (res) {
          console.log('查询失败')
          console.log(res)
          console.err
        },
    })
  },

  wxapp_Update: function(){
    console.log('小程序端_修改数据')
    col.doc('W6xD_tdfTEkKDbvK').update({
      data:{
        description: 'test1',
      },
      success: function (res) {
        console.log('修改成功')
        console.log(res)
        console.log
      },
      fail: function (res) {
        console.log('修改失败')
        console.log(res)
        console.err
      },
    })
  },

  cloudFn_Add: function(e){
    console.log(e)
    wx.cloud.callFunction({
      // 要调用的云函数名称
      name: 'cloudFn_Add',
      // 传递给云函数的参数
      data: {
        x: 1,
        y: 2,
      },
      success: res => {
        console.log('call success')
        console.log(res)
      },
      fail: err => {
        console.log('call fail')
        console.log(err)
      }
    })
  },

  cloudFn_Remove: function(e){
    console.log(e)
    wx.cloud.callFunction({
      name: 'cloudFn_Remove',
      data: {
        x:'W6xEkddfTEkKDbv_'
      },
      success: res => {
        console.log('call success')
        console.log(res)
      },
      fail: err => {
        console.log('call fail')
        console.log(err)
      }
    })
  },

  cloudFn_Get:function(e){
    console.log(e)
    wx.cloud.callFunction({
      name:'cloudFn_Get',
      data:{
        _openid: 'o52Tl5SPVrcXw9QIYufUePYVoawM',
      },
      success: res => {
        console.log('call success')
        console.log(res)
      },
      fail: err => {
        console.log('call fail')
        console.log(err)
      }
    })
  },

  cloudFn_Update:function(e){
    console.log(e)
    wx.cloud.callFunction({
      name:'cloudFn_Update',
      data:{
        id: 'W6xEkddfTEkKDbv_',
        desc:'new test'
      },
      success: function (res) {
        console.log('修改成功')
        console.log(res)
        console.log
      },
      fail: function (res) {
        console.log('修改失败')
        console.log(res)
        console.err
      },
    })
  },

  resetBike: function (e) {
    let that = this
    this.setData({
      busy:true
    })
    console.log(e)

    wx.cloud.callFunction({
      // 要调用的云函数名称
      name: 'resetBike',
      success: res => {
        console.log('call success')
        console.log(res)
        wx.showToast({
          title: '调用成功',
        })
      },
      fail: err => {
        console.log('call fail')
        console.log(err)
        wx.showToast({
          title: '调用失败',
          icon: 'none'
        })
      },
      complete: e=> {
        that.setData({
          busy: false
        })
      }
    })
  }
})