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
    }else{
      this.data.searchState = false;
    }
    this.setData({
      searchState: this.data.searchState
    });
  },

  emptying: function () {
    this.data.searchtext = '';
    if (this.data.searchtext.length == 0) {
      this.data.searchState = false;
    }
    this.setData({
      searchinput: this.data.searchtext,
      searchState: this.data.searchState
    });
  },

  position: function (event) {
    this.data.positionNum = event.currentTarget.dataset.index;
    switch (this.data.positionNum) {
      case '1':
        this.data.positionNum = '7';
        break;
      case '2':
        this.data.positionNum = '40';
        break;
      case '3':
        this.data.positionNum = '73';
        break;
    }
    this.setData({
      positionNum: this.data.positionNum
    });
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
        var mvImgUrl = [];
        var latestUrl = [];
        var exclusiveUrl = [];
        var recommendUrl = [];
        var columnUrl = [];
        for (var i in res.data.mv) {
          mvImgUrl.push(getapp.localIp() + res.data.mv[i].imgUrl);
        } 
        for (var i in res.data.latest) {
          latestUrl.push(getapp.localIp() + res.data.latest[i].imgUrl);
        } 
        for (var i in res.data.exclusive) {
          exclusiveUrl.push(getapp.localIp() + res.data.exclusive[i].imgUrl);
        } 
        for (var i in res.data.recommend) {
          recommendUrl.push(getapp.localIp() + res.data.recommend[i].imgUrl);
        } 
        for (var i in res.data.column) {
          columnUrl.push(getapp.localIp() + res.data.column[i].imgUrl);
        } 
        that.setData({
          searchIcon: getapp.localIp() + res.data.searchIcon,
          cancel: getapp.localIp() + res.data.cancel,
          rightArrow: getapp.localIp() + res.data.rightArrow,
          classification: res.data.classification,
          roasting: res.data.roasting,
          column: res.data.column,
          columnUrl: columnUrl,
          recommend: res.data.recommend,
          recommendUrl: recommendUrl,
          exclusive: res.data.exclusive,
          exclusiveUrl: exclusiveUrl,
          latest: res.data.latest,
          latestUrl: latestUrl,
          mv: res.data.mv,
          mvImgUrl: mvImgUrl
        });
      },
      fail: function (err) {
        console.log(err.errMsg);
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let res = wx.getSystemInfoSync();
    let imgW1 = res.screenWidth*0.328;
    this.setData({
      imgW1: imgW1
    });
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
    //console.log('11');
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})