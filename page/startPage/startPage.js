// page/startPage/startPage.js
const getapp = new getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    countdown: '3'
  },

  systemHeight: function () {
    this.setData({
      systemH: getapp.publicHeight()
    });
  },

  jump: function () {
    wx.switchTab({
      url: '/page/foundThatMusic/foundThatMusic',
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.systemHeight();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let thims = this.data.countdown;
    let setTimes = setInterval(() => {
      thims--;
      this.setData({
        countdown: thims
      });
      if (thims == 0) {
        clearInterval(setTimes);
        this.jump();
      }
    },1000);
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})