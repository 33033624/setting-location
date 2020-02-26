import wepy from 'wepy'
export default class Mixins extends wepy.mixin {
    data = {
        locationRes: {}
    }
    getLocation (successFun, userLocation) {
        this.getLocationSuccess = successFun
        wepy.getLocation({type: "wgs84"}).then((res) => {
            this.locationRes = res
            successFun(res)
            }).catch(res => {
                if (res.errMsg === 'getLocation:fail auth deny') {
                    this.$invoke('LocationAuthModal', 'showCom')
                    return
                } 
                if (!userLocation || !userLocation.authSetting['scope.userLocation']) {
                    this.getUserLocation()
                    return
                }
            })
    }
    getUserLocation () {
        wepy.getSetting().then(res => {
            if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
                // 拒绝授权后再次进入重新授权
                this.$invoke('LocationAuthModal', 'showCom')
            }
        })
    }
}