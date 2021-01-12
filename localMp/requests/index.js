let ajaxtimes = 0
export const request = (params) => {
  // 判断添加tokeN
  let header = {...params.header}
  if (params.url.includes('/my/')) {
    header['Authorization'] = wx.getStorageSync('token')
  }
  // 加载动画
  ajaxtimes++
  wx.showLoading({
    title: "加载中",
    mask: true
  })
  // 定义公共url
  const baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1/'
  return new Promise((reslove, reject) => {
    wx.request({
      ...params,
      header,
      url: `${baseUrl}${params.url}`,
      success: (result) => {
        reslove(result)
      },
      fail: (error) => {
        reject(error)
      },
      complete:() => {
        ajaxtimes--
        if (ajaxtimes === 0) {
          wx.hideLoading();
        }
      }
    })
  })
}