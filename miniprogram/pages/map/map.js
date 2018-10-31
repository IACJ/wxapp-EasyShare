// pages/map/map.js
const defaultScale = 18
var bottomHeight = 0
var windowHeight = 0
var windowWidth = 0
Page({
  data: {

    // latitude: 23.099994,
    // longitude: 113.324520,
    markers: [],

    scale:defaultScale
  },

  onShow:function(e){
    console.log('onShow--------------------->')
    var that = this
    that.changeMapHeight()
    that.requestLocation()
    //that.setHomeActionLeftDistance()
    //如果刚从选择地址页面带数据回调回来，则显示选择的地址
    // console.log(that.data.callbackAddressInfo)
    // if (that.data.callbackAddressInfo == null) {
    //   that.getCenterLocation()
    //   //正在上传的话，不去请求地理位置信息
    //   if (that.data.showUpload) {
    //     that.requestLocation()
    //   }
    // } else {
    //   that.setData({
    //     selectAddress: that.data.callbackAddressInfo.title,
    //     callbackLocation: that.data.callbackAddressInfo.location
    //   })
    //   //置空回调数据，即只使用一次，下次中心点变化后就不再使用
    //   that.setData({
    //     callbackAddressInfo: null
    //   })
    // }
  },

  onLoad:function (e) {
    // this.setData({
    //   'windowHeight': getApp().globalData.systemInfo.windowHeight
    // })
  },

  onReady: function (e) {
     this.mapCtx = wx.createMapContext('myMap')
    // this.setData({
    //   'windowHeight': getApp().globalData.systemInfo.windowHeight
    // })
     this.mapCtx.moveToLocation()
     
  },

  //移动到当前定位点
  moveTolocation: function () {
    var mapCtx = wx.createMapContext('myMap')
    mapCtx.moveToLocation()
    
  },

  //请求地理位置
  requestLocation: function () {
    var that = this
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        console.log(res)
        that.setData({
          latitude: res.latitude,
          longitude:res.longitude
        })
        that.moveTolocation()
      },
    })
  },


  selfLocationClick: function () {
    var that = this
    //还原默认缩放级别
    that.setData({
      scale: defaultScale
    })
    //必须请求定位，改变中心点坐标
    that.requestLocation()
  },

  //拖动改变中心位置
  regionChange: function (res) {
    var that = this
    //改变中心点位置  
    if (res.type === "end") {
      that.getCenterLocation()
    }
  },

  /**
   * 得到中心点坐标
   */
  getCenterLocation: function () {
    var that = this
    var mapCtx = wx.createMapContext('myMap')
    mapCtx.getCenterLocation({
      success: function (res) {
        console.log('getCenterLocation----------------------->')
        console.log(res)
        if(that.data.centerLatitude===undefined){
          that.setData({
            centerLatitude:res.latitude,
            centerLongitude:res.longitude
          })
        }
        else{
          that.setData({
            centerLatitude: res.latitude,
            centerLongitude: res.longitude
          })
          wx.cloud.callFunction({
            name: 'search',
            data: {
              sort: 'bike'
            },
            success: res => {
              console.log('call success')
              var currentMarker = []
              var markerList = res.result.data
              for(var key in markerList)
                console.log(key)
            },
            fail: err => {
              console.log('call fail')
              console.log(err)
            }
          })
        }
        //that.updateCenterLocation(res.latitude, res.longitude)
        //that.regeocodingAddress()
        //that.queryMarkerInfo()
      }
    })
  },

  // //更新上传坐标点
  // updateCenterLocation: function (latitude, longitude) {
  //   var that = this
  //   that.setData({
  //     centerLatitude: latitude,
  //     centerLongitude: longitude
  //   })
  // },

  // setMapHeight: function (params) {
  //   var that = this
  //   that.setData({
  //     mapHeight: (windowHeight - bottomHeight) + 'px'
  //   })
  //   var controlsWidth = 40
  //   var controlsHeight = 48
    //设置中间部分指针
    // that.setData({
    //   controls: [{
    //     id: 1,
    //     iconPath: '../../images/icon/center-location.png',
    //     position: {
    //       left: (windowWidth - controlsWidth) / 2,
    //       top: (windowHeight - bottomHeight) / 2 - controlsHeight * 3 / 4,
    //       width: controlsWidth,
    //       height: controlsHeight
    //     },
    //     clickable: true
    //   }]
    // })
  // },

  changeMapHeight: function () {
    var that = this
    var count = 0
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        that.setData({
          windowHeight : res.windowHeight,
          windowWidth : res.windowWidth
        })
        //that.setMapHeight()
        // //创建节点选择器
        // var query = wx.createSelectorQuery()
        // query.select('#bottom-layout').boundingClientRect()
        // query.exec(function (res) {
        //   console.log(res)
        //   that.setData({
        //     bottomHeight : res[0].height
        //   })
        // }
      },
    })
  }


})
