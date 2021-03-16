const baseUrl = __wxConfig.envVersion === 'release' ?
  'http://yzz.com:8080/api/' :
  'http://yzz.com:8080/api/'

const write_url_a = __wxConfig.envVersion === 'release' ?
  'http://gatsbyzz.top/api/' :
  'http://gatsbyzz.top/api/'
var requestTask = null

export function axiosAPI(params) {
  wx.showNavigationBarLoading()
  var { url, data, method } = { ...params }
  return new Promise(function (resolve, reject) {
    requestTask = wx.request({
      url: baseUrl + (url.indexOf('/') === 0 ? url.replace('/', '') : url),
      data: data,
      header: {
        token: wx.getStorageSync('token')
      },
      method: method,
      success: function (res) {
        wx.hideNavigationBarLoading()
        resolve(res.data)
      },
      fail: function (res) {
        reject('网络错误' + res)
        wx.showToast({
          icon: 'none',
          title: '网络错误' + res
        })
      }
    })
  })
}