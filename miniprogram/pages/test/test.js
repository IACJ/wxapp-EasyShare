// pages/test/test.js
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

    const testDB = wx.cloud.database({
      env: 'test-share-92a8ff'
    })
    if (testDB) {
      console.log('连接ok')
    }else{
      console.log('连接fail')
    }
 
    
    testDB.collection('todos').add({
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

  }
})