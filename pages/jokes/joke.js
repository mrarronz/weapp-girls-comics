// joke.js

var service = require("../../utils/service.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    types: [
      {
        "type": 10,
        "name": "图片"
      },
      {
        "type": 29,
        "name": "段子"
      },
      {
        "type": 31,
        "name": "声音"
      },
      {
        "type": 41,
        "name": "视频"
      },
    ],
    currentType: 10,
    jokeList: [],
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadData()
  },

  /**
   * 加载数据
   */
  loadData: function () {
    var that = this
    service.getJokeList(this.data.pageIndex, this.data.currentType, function (res) {
      var jokes = that.data.jokeList.concat(res)
      var hasMore = res.length > 0
      var pageIndex = (res.length > 0) ? ++that.data.pageIndex : that.data.pageIndex
      that.setData({
        jokeList: jokes,
        pageIndex: pageIndex,
        showLoading: false,
        hasMore: hasMore
      })
    })
  },

  /**
   * 点击类别按钮切换数据
   */
  typeButtonTap: function (e) {
    var dataType = e.currentTarget.dataset.type
    if (dataType == this.data.currentType) {
      return
    }
    this.setData({
      currentType: dataType,
      jokeList: [],
      pageIndex: 1,
      showLoading: true,
      hasMore: true
    })
    this.loadData()
  },

  /**
   * 点击图片查看大图
   */
  imageTapAction: function (e) {
    var imageUrl = e.currentTarget.dataset.url
    wx.previewImage({
      urls: [imageUrl],
    })
  },

  /**
   * 点击声音图片
   */
  voiceImageTap: function (e) {
    var imageUrl = e.currentTarget.dataset.url
    wx.previewImage({
      urls: [imageUrl],
    })
  }
})