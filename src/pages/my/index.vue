<template>
  <view class="container">
    <view>
      获取的页面query参数{{params}}
    </view>
  </view>
</template>
<script>
  import wepy from 'wepy'
  export default class My extends wepy.page {
    config = {
      navigationBarTitleText: '我的'
    }
    data = {
      params: ''
    }
    onLoad (params) {
      this.params = JSON.stringify(params)
    }
    methods = {
    }
  }
</script>
<style lang="scss" scoped>
</style>
