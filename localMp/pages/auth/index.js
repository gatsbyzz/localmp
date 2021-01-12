// pages/auth/index.js
import { request } from '../../requests/index.js'
Page({

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },
  handleGetUserInfo(e) {
    try {
      const { encryptedData, rawData, iv, signature } = e.detail
      var code = ''
      wx.login({
        success: (result) => {
          code = result.code
          const params = { encryptedData, rawData, iv, signature, code }
          request({
            url: 'users/wxlogin',
            data: params,
            method: 'post'
          }).then(res => {
            const { token } = res
            wx.setStorageSync('token', token);
            wx.navigateBack({
              delta: 1
            })
          })
        }
      })
    } catch (error) {
      console.log(error)
    }
  },
  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  }
})