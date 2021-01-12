// pages/goodsList/index.js
import { request } from '../../requests/index.js'
Page({
  /**
   * Page initial data
   */
  data: {
    tabs: [
      {
        id: 0,
        name: 'xxxx',
        isActive: 1
      },
      {
        id: 1,
        name: 'bbbb',
        isActive: 0
      },
      {
        id: 2,
        name: 'cccc',
        isActive: 0
      }
    ],
    goodsList: []
  },
  queryParams: {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10
  },
  totalPages: 1,
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.queryParams.cid = options.cid
    this.getGoods()
  },
  getGoods() {
    request({
      url: 'goods/search',
      data: this.queryParams
    }).then(res => {
      var data = res.data.message
      const total = data.total
      this.totalPages = Math.ceil(total / this.queryParams.pagesize)
      // 拼接数组
      this.setData({
        goodsList: [...this.data.goodsList, ...data.goods]
      })
      wx.stopPullDownRefresh()
    })
  },
  handleTabsChange(e) {
    const { index } = e.detail
    const { tabs } = this.data
    tabs.forEach((v, i) => {
      i === index ? v.isActive = 1 : v.isActive = 0 
    })
    this.setData({
      tabs: tabs
    })
  },
  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {
    this.setData({
      goodsList: []
    })
    this.queryParams.pagenum = 1
    this.getGoods()
  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {
    if (this.queryParams.pagenum >= this.totalPages) {
      wx.showToast({
        title: '已经到底啦',
        duration: 1500
      });
        
    } else {
      this.queryParams.pagenum++
      this.getGoods()
    }
  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})