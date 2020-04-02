<template>
  <view class="scancode_box">
    <view @tap="scancode" class="scancode_fixbutton">扫码</view>
    <view class="scancode_modal" wx:if="{{showModal}}">
      <view class="scancode_modal--filter"></view>
      <view class="scancode_modal--content">
        <view class="scancode_modal--title">二维码信息</view>
        <view class="scancode_modal--detail">
          <text>path: {{scanCodeParams['path']}}</text>
          <text>result: {{scanCodeParams['result']}}</text>
          <text>rawData: {{scanCodeParams['rawData']}}</text>
        </view>
        <view class="scancode_modal--buttonbox">
          <view @tap="navCodePage" type="primary">跳转到Path</view>
          <view @tap="close">关闭</view>
        </view>    
      </view>
    </view>
  </view>
</template>
<script>
  import wepy from 'wepy'
  export default class ScanCode extends wepy.component {
    data = {
      showModal: false,
      scanCodeParams: {}
    }
    showCom () {
    }
    methods = {
      close () {
        this.showModal = false
      },
      scancode () {
        wepy.scanCode({
          onlyFromCamera: true
        }).then(res => {
          console.log(res, 'res==>>>>>')
          this.scanCodeParams = res
          this.showModal = true
          this.$apply()
        }).catch(e => {
          wepy.showToast({
            icon: 'none',
            title: e
          })
        })
      },
      navCodePage () {
        wepy.navigateTo({ url: this.scanCodeParams['path'] })
      }
    }
  }
</script>
<style lang='scss' scoped>
.scancode_fixbutton{
  height: 100px;
  width: 100px;
  line-height: 100px;
  text-align: center;
  border-radius: 50%;
  border: 1px solid #eeeeee;
  position: fixed;
  right: 20px;
  bottom: 100px;
}
.scancode_modal{
  position: fixed;
  width: 100%;
  height: 100%;
  &--filter{
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0.7;
  }
  &--content{
    position: absolute;
    z-index: 2;
    background-color: #fff;
    width: 80%;
    height: 80%;
    left: 10%;
    top: 10%;
    border-radius: 5px;
  }
  &--title{
    text-align: center;
    font-size: 40px;
    line-height: 80px;
    border-bottom: 1px solid #666;
  }
  &--detail{
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
    text-overflow:ellipsis;
    word-wrap:break-word;
  }
  &--buttonbox{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    border-top: 1px solid #333333;
    view{
      flex: 1;
      height: 80px;
      text-align: center;
      line-height: 80px;
      &:nth-child(1) {
        border-right: 1px solid #333;
        background-color: green;
        color: #fff;
      }
    }
  }
}
</style>
