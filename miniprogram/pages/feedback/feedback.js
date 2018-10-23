// miniprogram/pages/feedback/feedback.js
const db = wx.cloud.database({
  env: 'test-share-92a8ff'
})
const col = db.collection('opinion')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:0,
    phonenum:0,
    array:['汽车','单车','三轮','充电宝','摄像机','医疗箱','雨伞','滑板','轮椅'],
    opinion:'',
    phone:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if(options.id!=null)
    this.setData({
      id: options.id,
      sort:options.sort
    })
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

  bindOpinion:function(e){
    this.setData({
      num: e.detail.cursor,
      opinion: e.detail.value
    })
  },
  bindPhone:function(e){
    this.setData({
      phonenum: e.detail.cursor,
      phone: e.detail.value

    })
  },
  bindPickerChange: function (e) {
    let that=this
    console.log('picker发送选择改变，携带值为', e)
    this.setData({
      sort: that.data.array[e.detail.value]
    })
    console.log('物品种类',this.data.sort)
  },
  commit:function(e){
    console.log(e)
    let that =this
    if(this.data.opinion===''){
      wx.showToast({
        title: '请填写反馈内容',
        image: '../../images/icon/xx.png',
      })
      return
    }
    if (this.data.phone!=''&&!/^(?:13\d|15\d|18\d|17\d)\d{5}(\d{3}|\*{3})$/.test(this.data.phone)){
      wx.showToast({
        title: '手机号错误',
        image:'../../images/icon/xx.png',
      })
      return 
    }
    col.add({
      data: {
        sort: that.data.sort,
        id: that.data.id,
        phone: that.data.phone,
        opinion:that.data.opinion,
      },
      success: function (res) {
        console.log('成功',JSON.stringify(res))
      },
      fail: function (res) {
        console.log('失败',JSON.stringify(res))
        wx.showToast({
          title: '网络异常，请重新打开此页面。',
          image: '../../images/icon/xx.png',
        })
      }
    })
  }
})