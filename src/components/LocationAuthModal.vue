<template>
  <view class="modal-box" wx:if="{{showModal}}">
    <view class="modal-filter"></view>
    <view class="success-modal-box" >
        <view class="success-title">提示</view>
        <view class="success-tip">
            小程序需要您开启位置授权，请打开设置->位置信息->仅在使用小程序期间
        </view>
        <button class="know-button" open-type="openSetting" @opensetting="opensetting">设置</button>
    </view>
  </view>
</template>
<script>
  import wepy from 'wepy'
  export default class LocationAuthModal extends wepy.component {
    data = {
      showModal: false
    }
    showCom () {
      this.showModal = true
      this.$apply()
    }
    methods = {
      opensetting ({detail}) {
        this.showModal = false
        this.$parent['getLocation'](this.$parent.getLocationSuccess, detail)
        this.$apply()
      }
    }
  }
</script>
<style lang='scss' scoped>
.modal-box{
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
}
.modal-filter{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.7;
}
.success-modal-box{
    position: absolute;
    z-index: 1000;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    width: 80%;
    border-radius: 10px;
    .success-title{
        margin-top: 30px;
        text-align: center;
        padding-bottom: 47px;
    }
    .success-tip{
        font-size: 24px;
        line-height: 32px;
        color: #666666;
        text-align: center;
    }
    .know-button{
        margin-top: 33px;
        width: 100%;
        height: 96px;
        font-size: 36px;
	      color: #000;
    }
}
</style>
