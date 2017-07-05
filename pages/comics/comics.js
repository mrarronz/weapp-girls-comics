// comics.js
var service = require("../../utils/service.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    comicList: [],
    pageIndex: 1,
    showLoading: true,
    hasMore: true,
    currentImageUrl: null,
    selectedItem: null 
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
    service.getComicsList(this.data.pageIndex, function (res) {
      var comics = that.data.comicList.concat(res)
      var hasMore = res.length > 0
      var pageIndex = (res.length > 0) ? ++that.data.pageIndex : that.data.pageIndex
      that.setData({
        comicList: comics,
        pageIndex: pageIndex,
        showLoading: false,
        hasMore: hasMore
      })
    })
  },

  /**
   * 点击查看漫画详情
   */
  clickComicItem: function (e) {
    var comicId = e.currentTarget.dataset.id
    if (this.data.selectedItem == comicId) {
      return
    }
    this.setData({ selectedItem: comicId })
    wx.showLoading({
      title: '加载中...',
    })
    service.getComicsDetail(comicId, function (res) {
      wx.hideLoading()
      if (res == null) {
        wx.showToast({
          title: '图片获取失败',
        })
        return
      }
      wx.previewImage({
        current: res,
        urls: [res],
      })
    })
  }
})