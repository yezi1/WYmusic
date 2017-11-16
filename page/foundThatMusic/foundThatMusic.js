// page/foundThatMusic/foundThatMusic.js
const getapp = new getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchState: false,
    searchtext: '',
    positionNum: '7'
  },

  searchFocus: function (event) {
    this.data.searchtext = event.detail.value;
    if (this.data.searchtext.length > 0) {
      this.data.searchState = true;
      this.setData({
        searchState: this.data.searchState
      });
    }else{
      this.data.searchState = false;
      this.setData({
        searchState: this.data.searchState
      });
    }
  },

  emptying: function () {
    this.data.searchtext = '';
    this.setData({
      searchinput: this.data.searchtext
    });
    if (this.data.searchtext.length == 0) {
      this.data.searchState = false;
      this.setData({
        searchState: this.data.searchState
      });
    }
  },

  position: function (event) {
    this.data.positionNum = event.currentTarget.dataset.index;
    switch (this.data.positionNum) {
      case '1':
        this.data.positionNum = '7';
        this.setData({
          positionNum: this.data.positionNum
        });
        break;
      case '2':
        this.data.positionNum = '40';
        this.setData({
          positionNum: this.data.positionNum
        });
        break;
      case '3':
        this.data.positionNum = '73';
        this.setData({
          positionNum: this.data.positionNum
        });
        break;
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.request({
      url: getapp.localIp() + 'WYmusic/data/music.json',
      method: 'GET',
      success: function (res) {
        that.setData({
          classification: res.data.classification
        });
      }
    })
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})