// pages/map/map.js
const defaultScale = 18
var bottomHeight = 0
var windowHeight = 0
var windowWidth = 0
var app=getApp()
Page({
  data: {
    markers: [],
    km:1,
    sort:"bike",
    scale:defaultScale
  },

  onShow:function(options){
    console.log('onShow--------------------->')
    var that = this
    if(app.sortWord){
      // that.setData({
      //   sort:app.sortWord
      // })
      console.log("app.sortWord " + app.sortWord)
      // console.log("that.data.sort "+that.data.sort)
    }
    that.changeMapHeight()
    that.requestLocation()
    that.getItemList()
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

  //请求手机地理位置
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

  //定位自身
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
   * 得到地图中心点坐标并搜索周边
   */
  getCenterLocation: function () {
    var that = this
    var mapCtx = wx.createMapContext('myMap')
    mapCtx.getCenterLocation({
      success: function (res) {
        console.log('getCenterLocation----------------------->')
        console.log(res)
        that.setData({
          centerLatitude:res.latitude,
          centerLongitude:res.longitude
        })
        that.kmToLongitude()
        that.kmToLatitude()
        that.setMarker(that.data.list,that.data.centerLatitude,that.data.centerLongitude)
        // if(that.data.sort!=that.data.temp)
        //   {
        //     that.setData({
        //       temp:that.data.sort
        //     })
          // wx.cloud.callFunction({
          //   name: 'search',
          //   data: {
          //     sort: that.data.sort
          //   },
          //   success: res => {
          //     console.log('call success')
          //     console.log(res)
          //     that.setData({
          //       list:res.result.data
          //     })
          //     console.log(that.data.list)
          //     that.setMarker(that.data.list, that.data.centerLatitude, that.data.centerLongitude)

          //   },
          //   fail: err => {
          //     console.log('call fail')
          //     console.log(err)
          //   }
          // })
        // }
      }
    })
  },

  //设置周边共享物件
  setMarker: function (list, centerLatitude, centerLongitude){
    console.log("createMarker start")
    if(list!=undefined){
      let that = this
      var currentMarker = []
      var markerList = list
      for (var i=0;i<markerList.length;i++){
        var m=markerList[i]
        if(m.status.isUsing===false&&
          m.position[0]<that.data.centerLatitude+that.data.long&&
          m.position[0]>that.data.centerLatitude-that.data.long&&
          m.position[1]<that.data.centerLongitude+that.data.lat&&
          m.position[1]>that.data.centerLongitude-that.data.lat){
            let marker = {}
            marker.id=m.numberId
            marker.latitude=m.position[0]
            marker.longitude=m.position[1]
            marker.title = m.description+" "+m.numberId
            marker.sort=that.data.sort
            currentMarker.push(marker)
            console.log("marker   "+marker)
          }
      }
      that.setData({
        markers: currentMarker
      })
      console.log("markers"+that.data.markers)
    }
  },

  //获取数据列表
  getItemList:function(){
    let that=this
    console.log("getItemList start")
    wx.cloud.callFunction({
      name: 'search',
      data: {
        sort: that.data.sort
      },
      success: res => {
        console.log('call success')
        console.log(res)
        that.setData({
          list: res.result.data
        })
        that.setMarker(that.data.list, that.data.centerLatitude, that.data.centerLongitude)

      },
      fail: err => {
        console.log('call fail')
        console.log(err)
      }
    })
  },

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
      },
    })
  },

  kmToLongitude:function(){
    console.log("kmToLongitude start")
    let that = this
    that.setData({
      long:that.data.km/2/111
    })
  },
  kmToLatitude:function(){
    console.log("kmToLatitude start")
    let that = this
     that.setData({
       lat: that.data.km / 2 / 111 / Math.cos(Math.PI / 180*that.data.centerLatitude)
     })
  },
  //改变物品种类
  changeSort:function(e){
    let that=this
    that.setData({
      sort: e.detail.value
    })
    app.sortWord=that.data.sort
    that.getItemList()
  },
  bindMarkertap:function(e){
    let that=this
    that.setData({
      thingId:e.markerId
    })
    console.log(that.data.thingId)
  },
  selected:function(e){
    let that=this
    if(that.data.thingId){
      wx.showModal({
        title: '确认使用？',
        content: '确认使用' + that.data.thingId + '？',
        success: function (e) {
          console.log(e);
          if (e.confirm) {
            wx.navigateTo({
              url: '../moveshare/'+that.data.sort+"/"+that.data.sort+"?id="+that.data.thingId+"&type=open",
            })
            that.setData({
              thingId:null
            })
          }
        }
      })
    }
    else{
      wx.showToast({
        title: '请先选择物品',
        icon: 'loading'
      })
    }
  }
})
