const db = wx.cloud.database({})

Page({
  /*首页页面的初始数据 */
  data: {
    //轮播页面图片数据，包括图片的路径等
    sliderList: [
      { selected: true, imageSource: '../../images/1.jpg' },
      { selected: false, imageSource: '../../images/2.jpg' },
      { selected: false, imageSource: '../../images/3.jpg' }
    ],
    containerShow: true,
    //图片展示页列表
    infoList: [],
    cursor: 0,
    loading: true,
  },
  onLoad: function () {

    var that = this;
    this.setData({
      cursor: 0
    })
    db.collection('info').where({}).get({
      success: function(res) {
        // console.log(res)
        if (res.data.length === 0) {
          wx.showToast({
            title: '没有更多了',
            icon: 'loading'
          })
        } else {
          that.setData({
            'infoList': res.data
          })
        }
      },
      complete: function(e) {
        that.setData({
          'loading':false
        })
      }
    })

  },


  //轮播图绑定change事件，修改图标的属性是否被选中
  switchTab: function (e) {
    var sliderList = this.data.sliderList;
    var i, item;
    for (i = 0; item = sliderList[i]; ++i) {
      item.selected = e.detail.current == i;
    }
    this.setData({
      sliderList: sliderList
    });
  },

  //点击下面的图片列表的时候
  onItemClick: function (event) {
    if (event.currentTarget.dataset.id != null) {
      let targetPath = "/pages/passage/passage" + "?id=" + event.currentTarget.dataset.id;
      wx.navigateTo({
        url: targetPath,
      });
    }
  },
  //加载更多
  loadMore: function (event) {
    var that = this;
    that.setData({
      'loading': true
    })
    db.collection('info').where({}).get({
      success: function (res) {
        wx.showToast({
          title: '没有更多了',
          icon: 'loading',
          duration: 2000
        })
      },
      complete: function (e) {
        that.setData({
          'loading': false
        })
      }
    })


  },
  //点击单选按钮改变,重新进行排序
  radioChange: function (e) {

  },


  //用户点击右上角分享
  onShareAppMessage: function () {
    return {
      title: 'Easy Share',
      desc: '分享我正在使用的小程序',
      success: function (res) {
        //转发成功
        wx.showToast({
          title: "分享成功",
          duration: 1000,
          icon: "success"
        })
      }
    }
  }
})
