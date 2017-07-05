var define = require("./define.js")


module.exports = {

/**
 * 获取妹子图列表
 */
  getBeautifulGirls: function (pageIndex, dataType, cb) {
    wx.request({
      url: define.baseURL,
      data: {
        "showapi_appid": define.appId,
        "showapi_sign": define.appSecret,
        "type": dataType,
        "page": pageIndex
      },
      success: function (res) {
        console.log(res)
        let resultCode = res.data.showapi_res_code
        if (resultCode == 0) {
          let resultBody = res.data.showapi_res_body
          var images = []
          for (var key in resultBody) {
            if (key != "ret_code") {
              images.push(resultBody[key])
            }
          }
          cb(images)
        } else {
          cb([])
        }
      },
      fail: function (res) {
        console.log(res)
        cb([])
      }
    })
  },

  /**
   * 获取漫画列表
   */
  getComicsList: function (pageIndex, cb) {
    wx.request({
      url: 'https://route.showapi.com/978-2',
      data: {
        "showapi_appid": define.appId,
        "showapi_sign": define.appSecret,
        "page": pageIndex
      },
      success: function (res) {
        console.log(res)
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },

  /**
   * 漫画详情页
   */
  getComicsDetail: function (comicId, cb) {
    wx.request({
      url: 'https://route.showapi.com/978-1',
      data: {
        "showapi_appid": define.appId,
        "showapi_sign": define.appSecret,
        "id": comicId
      },
      success: function (res) {
        console.log(res)
      },
      fail: function (res) {
        console.log(res)
      }
    })
  }

}