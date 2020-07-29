// components/popup/popup.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  behaviors: ['wx://form-field-group','wx://form-field-button'],
  properties: {
    title: {
      type: String,
      value: ''
    },
    phContent: {
      type: String,
      value: ''
    },
    cancelText: {
      type: String,
      value: ''
    },
    confirmText: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showModal: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    
    hide() {
      this.setData({
        showModal: false
      })
    },

    show() {
      this.setData({
        showModal: true
      })
    },

    _onCancel() {
      this.triggerEvent("cancelEvent")
    },
  }
})