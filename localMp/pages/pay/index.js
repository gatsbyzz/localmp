// pages/cart/index.js
Page({
  data: {
    address: {},
    cart: [],
    // 全选
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },
  onShow() {
    const address = wx.getStorageSync('address')
    let cart = wx.getStorageSync('cart') || []
    // const allChecked = cart.length > 0 && cart.every(v => v.checked)
    cart = cart.filter(v => v.checked)
    this.setData({address})
    this.setCart(cart)
  },
  // 设置购物车状态
  setCart(cart) {
    let totalPrice = 0 
    let totalNum = 0
    cart.forEach(v => {
      totalPrice += v.num * v.goods_price
      totalNum += v.num
    })
    this.setData({
      cart,
      totalPrice,
      totalNum
    })
  },
  handlePayNow(e) {
    try {
      // 1 获取token
      const token = wx.getStorageSync('token')
      if (!token) {
        wx.navigateTo({
          url: '/pages/auth/index'
        })
        return
      }
      // 2 发送请求 获取order_id
      // 3 发起预支付获取 微信支付参数 
      // 4 调取微信支付 wx.requestPayment
      // 5 查询后台订单状态
      wx.showToast({
        title: '支付成功',
        mask: true
      })
      let newCart = wx.getStorageSync('cart')
      newCart = newCart.filter(v => !v.checked)
      wx.setStorageSync('cart', newCart)
      wx.navigateTo({
        url: '/pages/order/index'
      })
    } catch (error) {
      wx.showToast({
        title: '支付失败',
        mask: true
      })
    }
    
  },
  handleChooseAddres() {
    wx.getSetting({
      success: (result) => {
        const scopeAddress = result.authSetting['scope.address']
        if (scopeAddress === true || scopeAddress === undefined) {
          wx.chooseAddress({
            success: (address) => {
              wx.setStorageSync('address', address)
            },
            fail(res) {
              wx.openSetting({
                success: (result) => {
                  wx.chooseAddress({
                    success: (res2) => {
                      console.log(res2)
                    }
                  })
                },
                fail(tes) {
                  console.log(tes)
                }
              })
            }
          })
        } else {
          wx.openSetting({
            success: (result) => {
              wx.chooseAddress({
                success: (res2) => {
                  wx.setStorageSync('addres', address)
                }
              })
            }
          })
        }
      }
    })
  },
  onLoad() {
   
  }
})