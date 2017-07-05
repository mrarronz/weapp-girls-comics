//index.js

var service = require("../../utils/service.js")

//获取应用实例
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    types:[
      {
        "type": 34,
        "name": "大胸妹"
      },
      {
        "type": 35,
        "name": "小清新"
      },
      {
        "type": 36,
        "name": "文艺范"
      },
      {
        "type": 37,
        "name": "性感妹"
      },
      {
        "type": 38,
        "name": "大长腿"
      },
      {
        "type": 39,
        "name": "黑丝袜"
      },
      {
        "type": 40,
        "name": "小翘臀"
      },
    ],
    currentType: 34,
    imageList:[],
    pageIndex: 1,
    showLoading: true,
    hasMore: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 点击类别按钮切换图片类型
   */
  typeButtonTap: function (e) {
    var dataType = e.currentTarget.dataset.type
    if (dataType == this.data.currentType) {
      return
    }
    this.setData({
      currentType: dataType, 
      imageList: [],
      pageIndex: 1,
      showLoading: true,
      hasMore: true
    })
    this.loadData()
  },

  /**
   * 点击图片查看大图
   */
  showBigImage: function (e) {
    var currentUrl = e.currentTarget.dataset.url
    var urls = []
    for (var index in this.data.imageList) {
      var picItem = this.data.imageList[index]
      urls.push(picItem.thumb)
    }
    wx.previewImage({
      current: currentUrl,
      urls: urls,
    })
  },

  /**
   * 加载数据的方法
   */
  loadData: function () {
    var that = this
    service.getBeautifulGirls(this.data.pageIndex, this.data.currentType, function (res) {
      var images = that.data.imageList.concat(res)
      var hasMore = res.length > 0
      var pageIndex = (res.length > 0) ? ++that.data.pageIndex : that.data.pageIndex
      that.setData({
        imageList: images,
        pageIndex: pageIndex,
        showLoading: false,
        hasMore: hasMore
      })
    })
  }
})
