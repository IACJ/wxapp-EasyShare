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
    //四大功能模块数据
    selectState: [1, 0, 0, 0],
    //三大推荐
    items: [
      { name: 'attention', value: '关注', checked: 'true' },
      { name: 'recommend', value: '推荐' },
      { name: 'heat', value: '热度' }
    ],
    //图片展示页列表
    paintingList: [],
    cursor: 0,
    loading: true,
  },
  onShow: function () {

    var that = this;
    this.setData({
      cursor: 0
    })

    // wx.request({
    //   url: 'https://www.iacj.win/matches/painting/list', //仅为示例，并非真实的接口地址
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   data: {
    //     limit0: this.data.cursor,
    //     limit1: 5
    //   },
    //   success: function (res) {
    //     console.log(res.data)
    //     that.setData({
    //       paintingList: res.data.paintingList,
    //       cursor: that.data.cursor + res.data.paintingList.length,
    //       loading: false,
    //     })
    //   },
    //   fail: function () {
    //     wx.showToast({
    //       title: '网络连接失败',
    //     })
    //   }
    // })
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

  //点击四大功能模块-购画
  clickBuypaint: function () {
    this.setData({
      selectState: [1, 0, 0, 0],
    })
    //this.onShow();
  },
  //点击四大功能模块-阶梯课堂
  clickLadderclass: function () {
    this.setData({
      selectState: [0, 1, 0, 0],
    })
    //this.onShow();
  },
  //点击四大功能模块-公益之窗
  clickPublicwindow: function () {
    this.setData({
      selectState: [0, 0, 1, 0],
    })
    //this.onShow();
  },
  //点击四大功能模块-联名X
  clickJointly: function () {
    this.setData({
      selectState: [0, 0, 0, 1],
    })
    //this.onShow();
  },
  //点击下面的图片列表的时候
  onItemClick: function (event) {
    var targetPath = "../detail/detail";
    if (event.currentTarget.dataset.id != null) {
      targetPath = targetPath + "?id=" + event.currentTarget.dataset.id;
    }
    wx.navigateTo({
      url: targetPath,
    });
  },
  //加载更多
  loadMore: function (event) {

    // var that = this;
    // wx.request({
    //   url: 'https://www.iacj.win/matches/painting/list', //仅为示例，并非真实的接口地址
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   data: {
    //     limit0: this.data.cursor,
    //     limit1: 5
    //   },
    //   success: function (res) {
    //     console.log(res.data)
    //     that.setData({
    //       paintingList: that.data.paintingList.concat(res.data.paintingList),
    //       cursor: that.data.cursor + res.data.paintingList.length,
    //     })
    //     if (res.data.paintingList.length === 0) {
    //       wx.showToast({
    //         title: '没有更多了哦~',
    //         duration: 2000
    //       })
    //     }
    //   },
    //   fail: function () {
    //     wx.showToast({
    //       title: '网络连接失败',
    //     })
    //   }
    // })

  },
  //点击单选按钮改变,重新进行排序
  radioChange: function (e) {

  },


  /**
   * 请求数据
  */
  frequestData: function (that, targetPage) {
    wx.request({
      url: '',
    });

  },

  //用户点击右上角分享
  onShareAppMessage: function () {
    return {
      title: 'Easy Share',
      desc: '分享个小程序，希望你喜欢',
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
