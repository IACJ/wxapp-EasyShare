// pages/info/info.js
//index.js
//获取应用实例
var app = getApp();

Page({
  /*首页页面的初始数据 */
  data: {
    //轮播页面图片数据，包括图片的路径等
    sliderList: [
      { selected: true, imageSource: '../../images/1.jpg' },
      { selected: false, imageSource: '../../images/2.jpg' },
      { selected: false, imageSource: '../../images/3.jpg' }
    ],
  },

})
