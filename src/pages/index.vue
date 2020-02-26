<template>
  <view class="container">
    <text>位置信息授权处理页面</text>
    <LocationAuthModal />
  </view>
</template>
<script>
  import wepy from 'wepy'
  import LocationAuthModal from '@/components/LocationAuthModal'
  import Mixins from '../mixin/common-mixins.js'
  export default class Index extends wepy.page {
    components = {
      LocationAuthModal
    }
    mixins = [Mixins]
    data = {
    }
    config = {
      navigationBarTitleText: '位置信息授权处理'
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
  }
</script>
<style lang="scss" scoped>
.top-bg{
  height: 542px;
  position: relative;
  .bg-image{
    height: 100%;
  }
  .position-icon{
    position: absolute;
    left: 46px;
    top: 70px;
    image{
      display: inline-block;
      height: 30px;
      width: 25px;
      vertical-align: middle;

    }
    text{
      font-size: 30px;
      display: inline-block;
      color: #fff;
      vertical-align: middle;
    }
  }
  image{
    width: 100%;
  }
  .position-box{
    width: 690px;
    height: calc(100vh - 380px);
    position: absolute;
    top:333px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #ffffff;
    box-shadow: 0px 0px 18px 0px 
      rgba(186, 186, 186, 0.58);
    border-radius: 10px;
    .position-bg-image{
      position: absolute;
      bottom:0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }
    .position-content{
      position: absolute;
      top:0;
      left: 0;
      z-index: 10;
      height: 100%;
      width: 100%;
    }
    .no-permission{
      // display: block;
      position: absolute;
      z-index: 30;
      width: 100%;
      top: 100px;
      // margin: 0 auto;
      
    }
    .button-box{
      padding: 104px 20px 40px;
      text-align: center;
    }
  }
  .position-tip-title{
      font-size: 30px;
      width: 100%;
      text-align: center;
      line-height: 40px;
      color: #333333;
      margin-top: 80px;
  }
  .position-current{
    font-size: 40px;
    color: #5166e6;
    text-align: center;
    margin-top: 23px;
    padding-bottom: 45px;
  }
  .position-bottom-tip{
    // position: absolute;
    width: 100%;
    text-align: center;
    // bottom: 0;
    height: 75px;
    padding-top: 15px;
    font-size: 24px;
    // line-height: 85px;
    color: #999999;
    text-align: center;
    border-top:  solid 1px #e8e8e8;
    view{
      display: block;
      width: 100%;
    }
  }
}
.login_btn{
  // position: fixed;
  // bottom: 20px;
  width: 600px;
  height: 96px;
  line-height: 96px;
  background-color: #ec4532;
  border-radius: 48px;
  font-size: 36px;
  color: #ffffff;
  margin-left: 50%;
  transform: translateX(-50%);
}
.success_login_btn{
    background-color: #f4f4f4;
    color: #ec4532;
    height: 96px;
    line-height: 96px;
    font-size: 45px;
    border-radius: 48px;
  }
  .current-time{
    color: #999999;
    font-size: 28px;
    margin-top: 20px;
  }
.login_other{
  line-height: 60px;
  text-align: center;
  color: #ec4532;
  font-size: 28px;
}
.fix-filter{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 400;
  height: 100%;
  width: 100%;
  background-color: #000;
  opacity: .7;
}
</style>
