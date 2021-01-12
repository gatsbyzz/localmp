// pages/goods_detail/index.js
import { request } from '../../requests/index.js'
Page({

  /**
   * Page initial data
   */
  data: {

  },
  goodsDetail: {},
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const { goods_id } = options
    this.getGoodsDetail(goods_id)
  },
  getGoodsDetail(goods_id) {
    request({
      url: 'goods/detail',
      data: {
        goods_id
      }
    }).then(res => {
      const data = res.data.message
      this.goodsDetail = data
      this.setData(
        {
          goodsDetail: data
        }
      )
    })
  },
  handlePreviewImg(e) {
    const urls = this.goodsDetail.pics.map(v => v.pics_mid)
    const current = e.currentTarget.dataset.url
    console.log(e)
    wx.previewImage({
      current,
      urls: urls
    })
  },
  handleCartAdd() {
    let cart =  wx.getStorageSync('cart') || []
    let index = cart.findIndex(v => v.goods_id === this.goodsDetail.goods_id)
    if (index === -1) {
      this.goodsDetail.num = 1
      this.goodsDetail.checked = true
      cart.push(this.goodsDetail)
    } else {
      cart[index].num++
    }
    wx.setStorageSync('cart', cart);
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      image: '',
      duration: 1500,
      mask: true
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

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})