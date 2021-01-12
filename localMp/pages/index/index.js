//Page Object
import { request } from '../../requests/index.js'
Page({
  data: {
    swiperlist: [],
    catlist: [],
    floorlist: [],
    indicatorDots: true,
    autoplay: true,
    interval: 1000,
    duration: 500
  },
  //options(Object)
  onLoad: function(options) {
    this.getSwiper()
    this.getCat()
    this.getFloor()
  },
  getSwiper() {
    request({
      url: 'home/swiperdata',
    }).then(res => {
      var data = res.data.message
      this.setData({
        swiperlist: data
      })
    })
  },
  getCat() {
    request({
      url: 'home/catitems',
    }).then(res => {
      var data = res.data.message
      this.setData({
        catlist: data
      })
    })
  },
  getFloor() {
    request({
      url: 'home/floordata',
    }).then(res => {
      var data = res.data.message
      this.setData({
        floorlist: data
      })
    })
  },
  onReady: function() {
    
  },
  onShow: function() {
    
  },
  onHide: function() {

  },
  onUnload: function() {

  },
  onPullDownRefresh: function() {

  },
  onReachBottom: function() {

  },
  onShareAppMessage: function() {

  },
  onPageScroll: function() {

  },
  //item(index,pagePath,text)
  onTabItemTap:function(item) {

  }
});
  