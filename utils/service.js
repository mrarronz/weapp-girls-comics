var define = require("./define.js")


module.exports = {

/**
 * 获取妹子图列表
 */
  getBeautifulGirls: function (pageIndex, dataType, cb) {
    wx.request({
      url: "https://route.showapi.com/819-1",
      data: {
        "showapi_appid": define.appId,
        "showapi_sign": define.appSecret,
        "type": dataType,
        "page": pageIndex
      },
      success: function (res) {
        console.log("美女图片接口调用失败")
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
        console.log("美女图片接口调用失败")
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
        console.log("漫画列表接口调用成功")
        console.log(res)
        let resultCode = res.data.showapi_res_code
        if (resultCode == 0) {
          let resultBody = res.data.showapi_res_body
          let contentList = resultBody.pagebean.contentlist
          cb(contentList)
        } else {
          cb([])
        }
      },
      fail: function (res) {
        console.log("漫画列表接口调用失败")
        console.log(res)
        cb([])
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
        console.log("漫画详情接口调用成功")
        console.log(res)
        let resultCode = res.data.showapi_res_code
        if (resultCode == 0) {
          let resultBody = res.data.showapi_res_body
          cb(resultBody.img)
        } else {
          cb(null)
        }
      },
      fail: function (res) {
        console.log("漫画详情接口调用失败")
        console.log(res)
        cb(null)
      }
    })
  },

  /**
   * 段子接口
   */
  getJokeList: function (pageIndex, dataType, cb) {
    wx.request({
      url: 'https://route.showapi.com/255-1',
      data: {
        "showapi_appid": define.appId,
        "showapi_sign": define.appSecret,
        "type": dataType,
        "page": pageIndex
      },
      success: function (res) {
        console.log("段子接口调用成功")
        console.log(res)
        let resultCode = res.data.showapi_res_code
        if (resultCode == 0) {
          let resultBody = res.data.showapi_res_body
          var contentList = resultBody.pagebean.contentlist
          cb(contentList)
        } else {
          cb([])
        }
      },
      fail: function (res) {
        console.log("段子接口调用失败")
        console.log(res)
        cb([])
      }
    })
  }

}