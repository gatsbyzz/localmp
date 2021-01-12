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
    const cart = wx.getStorageSync('cart') || []
    // const allChecked = cart.length > 0 && cart.every(v => v.checked)
    this.setData(address)
    this.setCart(cart)
  },
  handleItemChecked(e) {
    const goods_id = e.currentTarget.dataset.id
    let { cart } = this.data
    let index = cart.findIndex(v => v.goods_id === goods_id)
    cart[index].checked = !cart[index].checked
    this.setCart(cart)
  },
  // 设置购物车状态
  setCart(cart) {
    let allChecked = true
    let totalPrice = 0 
    let totalNum = 0
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price
        totalNum += v.num
      } else {
        allChecked = false
      }
    })
    allChecked = cart.length !== 0 ? allChecked : false
    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum
    })
    wx.setStorageSync('cart', cart)
  },
  handleAllChecked() {
    let { cart, allChecked } = this.data
    allChecked = !allChecked
    cart.forEach(v => v.checked = allChecked)
    this.setCart(cart)
  },
  handleItemNumEdit(e) {
    const { operation, id } = e.currentTarget.dataset
    let { cart } = this.data
    const index = cart.findIndex(v => v.goods_id === id)
    // 是否执行删除
    if (cart[index].num === 1 && operation === -1) {
      wx.showModal({
        title: '提示',
        content: '是否要删除',
        success: (res) => {
          if (res.confirm) {
            cart.splice(index, 1)
            this.setCart(cart)
          }
        }
      })
    } else {
      cart[index].num += operation
      this.setCart(cart)
    }
  },
  handlePay(e) {
    let { address, totalNum } = this.data
    if (totalNum === 0){
      return wx.showToast({
        title: '你还没有选择商品'
      })
    }
    wx.navigateTo({
      url: '/pages/pay/index'
    })
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