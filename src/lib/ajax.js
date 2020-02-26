import wepy from 'wepy'
const AjaxMethod = function (method) {
  return (url, data = {}) => wepy.request({
    url,
    method,
    data
  }).then(wepy => wepy.data).then(
    response => new Promise((resolve, reject) => {
      console.log(`%c url=====> ${url}`, 'background: green;color: white')
      console.log(`%c response=====> ${JSON.stringify(response)}`, 'background: green;color: white')
      // const {respCode, respData, errorMsg} = response
  
      // respCode === 0 ? resolve(respData) : reject(errorMsg)
      resolve(response)
    })
  )
}

const getJson = new AjaxMethod('GET')
const postJson = new AjaxMethod('POST')
export {getJson, postJson}
