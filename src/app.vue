<script>
import wepy from 'wepy'
import 'wepy-async-function'
export default class extends wepy.app {
  constructor () {
    super()
    this.use('promisify')
  }
  config = {
    pages: [
      'pages/index',
      'pages/my/index'
    ],
    'permission': {
      'scope.userLocation': {
        'desc': '请您务必开启位置授权' // 高速公路行驶持续后台定位
      }
    },
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'api趣用',
      navigationBarTextStyle: 'black'
    }
  }
}
</script>
<style lang='scss'>
</style>
