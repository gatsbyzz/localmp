// pages/category/index.js
import { request } from '../../requests/index.js'
Page({

  /**
   * Page initial data
   */
  data: {
    categories: [],
    rightContent: [],
    // 被点击的菜单
    currentIndex: 0,
    scrollTop: 0
  },
  cats: [],
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    // 本地缓存分类
    // {time: data.now, data: {...}}
    const cats = wx.getStorageSync('cats')
    if (!cats) {
      this.getCategories()
    } else {
      // 定义过期时间
      if (Date.now() - cats.time > 1000 * 10) {
        this.getCategories()
      } else {
        this.cats = cats.data
        this.setData({
          categories: cats.data,
          rightContent: cats.data[0].children
        })
      }
    }
  },
  getCategories() {
    request({
      url: 'categories',
    }).then(res => {
      var data = res.data.message
      this.cats = data
      wx.setStorageSync('cats', {
        time: Date.now(),
        data: this.cats
      })
      this.setData({
        categories: data,
        rightContent: data[0].children
      })
    })
  },
  handleTabCat(e) {
    const { index } = e.currentTarget.dataset
    let rightContent = this.data.categories[index].children
    // 右侧置顶
    this.setData({
      currentIndex: index,
      rightContent,
      scrollTop: 0
    })
  }
})