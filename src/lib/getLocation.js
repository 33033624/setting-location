/**
 * @description 地址授异常，提示或引导用户打开位置信息
 * @param {Object} config
 *
 *     @example
 *     var config = {
 *        success: success,
 *        fail: fail,
 *        systemDisableTip: '系统禁用了微信获取定位，快去设置-应用授权里打开吧',
 *        authFailTip: '你拒绝了小程序获取位置信息，部分功能将不能正常使用，快去打开吧'
 *     };
 *    getLocation(config);
 *
 */
let isGetting = false;
let getLocation = () => {
  return new Promise((resolve) => {
    console.log('new location')
    wx.getLocation({
      type: 'gcj02',
      // altitude: true,
      success: (res) => {
        console.log(res, '位置信息2')
        resolve(res);
      },
      fail: (res) => {
        resolve(res);
      }
    });
  });
}

let showGuide = (res, config) => {
  let modalConfig = {};
  return new Promise((resolve) => {
    let errMsg = res.errMsg, tip;
    if (errMsg.includes('fail') && errMsg.includes('auth')) {
      // 用户拒绝了小程序授权
      modalConfig.content = config.authFailTip;
      modalConfig.success = (res) => {
        console.log('confirm', res);
        if (res.confirm) {
          resolve({
            errMsg: 'ok'
          });
          return;
        } else if (res.cancel) {
          resolve({
            errMsg: 'cancel open setting'
          });
          return;
        }
        resolve({
          errMsg: 'refusing open setting'
        });
      };
      modalConfig.confirmText = '去开启';
      modalConfig.cancelText = '取消';
    } else {
      // 系统禁用了微信授权
      modalConfig.content = config.systemDisableTip;
      modalConfig.showCancel = false;
      modalConfig.success = () => resolve({
        errMsg: 'system forbids wechat from getting location'
      });
      modalConfig.confirmText = '知道了';
    }

    modalConfig.fail = () => resolve({
      errMsg: 'wx.showModal fail'
    });
    modalConfig.title = '授权提示';

    wx.showModal(modalConfig);
  })
}

let openSetting = () => {
  return new Promise((resolve) => {
    wx.openSetting({
      success: (res) => {
        if (res.errMsg.includes("ok") && res.authSetting["scope.userLocation"]) {
          // setting成功后再次获取值常常出现继续提示授权失败，延时1000ms可避免
          setTimeout(() => {
            resolve({
              errMsg: 'ok'
            })
          }, 1000);
        } else {
          resolve({
            errMsg: 'refusing authorize location infomation'
          })
        }
      },
      fail: () => {
        resolve({
          errMsg: 'wx.openSetting fail'
        })
      }
    })
  })
}

export default async function (config = {}) {
  if (isGetting) return;
  isGetting = true;

  let success = (res) => {
    isGetting = false;
    config.success && (typeof config.success === 'function') && config.success(res);
  }
  let fail = (res) => {
    isGetting = false;
    config.fail && (typeof config.fail === 'function') && config.fail(res);
  }

  let getLocationRes = await getLocation();
  let modalRes = {};
  if (getLocationRes.errMsg.includes('ok')) {
    console.log('getLocationRes success')
    success(getLocationRes);
    return;
  } else {
    // 未获取到则提示打开设置面板
    console.log('getLocationRes fail')
    modalRes = await showGuide(getLocationRes, config);
  }

  let settingRes = {};
  if (!modalRes.errMsg.includes('ok')) {
    // 系统禁用或者用户拒绝打开设置面板
    fail(modalRes);
    console.log('modalRes fail')
    return;
  } else {
    // 打开设置面板
    console.log('modalRes success')
    settingRes = await openSetting();
  }

  let tryAgainRes = {};
  if (!settingRes.errMsg.includes('ok')) {
    // 用户再次拒绝则执行fail
    fail(settingRes);
    console.log('settingRes fail')
    return;
  } else {
    console.log('settingRes success')
    tryAgainRes = await getLocation();
  }

  if (tryAgainRes.errMsg.includes('ok')) {
    console.log('tryAgainRes success');
    success(tryAgainRes);
  } else {
    console.log('tryAgainRes fail', tryAgainRes, 123);
    fail(tryAgainRes);
  }
}
