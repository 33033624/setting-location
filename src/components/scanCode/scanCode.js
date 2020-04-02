
Component({
  data: {
    showModal: false,
    scanCodeParams: {}
  },
  methods: {
    close () {
      this.setData({
        showModal: false
      })
    },
    scancode () {
      wx.scanCode({
        onlyFromCamera: true,
        success: (res) => {
          this.setData({
            scanCodeParams: res,
            showModal: true
          })
        }
      })
    },
    navCodePage () {
      wx.navigateTo({ url: this.data.scanCodeParams['path'] })
    }
  }
})