// components/Tabs/Tabs.js
Component({
  /**
   * Component properties
   */
  properties: {
    tabs: {
      type: Array,
      value: []
    }
  },

  /**
   * Component initial data
   */
  data: {

  },
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      // console.log(this.data.tabs)
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    }
  },
  /**
   * Component methods
   */
  methods: {
    handleItemTap(e) {
      const { index } = e.currentTarget.dataset
      // 传给父亲
      // console.log(index)
      this.triggerEvent('tabsChange', { index })
    }
  }
})
