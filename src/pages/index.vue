<template>
  <view class="container">
    <LocationAuthModal />
    <!-- <button @tap="scancode" type="primary">调用扫码</button>
    <view>
      <text>扫码获取的参数项</text>
      <view>path: {{scanCodeParams['path']}}</view>
      <view>result: {{scanCodeParams['result']}}</view>
      <view>rawData: {{scanCodeParams['rawData']}}</view>
    </view>
    <button @tap="navCodePage" >跳转</button> -->
    <scanCode />
  </view>
</template>
<script>
  import wepy from 'wepy'
  import LocationAuthModal from '@/components/LocationAuthModal'
  // import ScanCode from '@/components/qrcode/scanCode'
  import Mixins from '../mixin/common-mixins.js'
  export default class Index extends wepy.page {
    components = {
      LocationAuthModal
      // ScanCode
    }
    mixins = [Mixins]
    data = {
      scanCodeParams: {}
    }
    config = {
      navigationBarTitleText: '位置信息授权处理',
      usingComponents: {
        scanCode: '../components/scanCode/scanCode'
      }
    }
    onLoad () {
      this.getLocation(this.resolveLocation)
    }
    resolveLocation (res) {
      console.log(res, 'res==>>')
      wepy.showModal({
        title: '获取的位置信息',
        content: JSON.stringify(res)
      })
    }
    methods = {
      navCodePage () {
        wepy.navigateTo({ url: this.scanCodeParams['path'] })
      },
      scancode () {
        wepy.scanCode({
          onlyFromCamera: true
        }).then(res => {
          console.log(res, 'res==>>>>>')
          this.scanCodeParams = res
          this.$apply()
        }).catch(e => {
          console.log(e, 'e==>>>')
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
</style>
