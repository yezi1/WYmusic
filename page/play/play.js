// page/play-template/play-template.js
const getapp = new getApp();
const backgroundAudioManager = wx.getBackgroundAudioManager();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    musicDataUrl: null,
    playStatus: true
  },

  /**
   * 播放音乐
   */
  playMusic: function () {
    backgroundAudioManager.play();
    this.data.playStatus = true;
    wx.playBackgroundAudio({
      dataUrl: this.data.musicDataUrl,
    });
    this.setData({
      playStatus: this.data.playStatus
    });
  },

  /**
   * 暂停播放
   */
  pauseMusic: function () {
    backgroundAudioManager.pause();
   // wx.pauseBackgroundAudio();
    this.data.playStatus = false;
    this.setData({
      playStatus: this.data.playStatus
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    backgroundAudioManager.title = '此时此刻'
    backgroundAudioManager.epname = '此时此刻'
    backgroundAudioManager.singer = '汪峰'
    backgroundAudioManager.coverImgUrl = 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000'
    backgroundAudioManager.src = 'http://fs.w.kugou.com/201712161041/df789544227ddee4c6d2becab86f2ab7/G002/M08/02/13/ooYBAFT-JiqABNIaAEBvMGDr7qI119.mp3'
    //this.data.musicDataUrl = 'http://fs.w.kugou.com/201712161041/df789544227ddee4c6d2becab86f2ab7/G002/M08/02/13/ooYBAFT-JiqABNIaAEBvMGDr7qI119.mp3'; 
    
    //当前歌曲播放时间
    setInterval(function(){
      var t = backgroundAudioManager.currentTime;
      var atPresentTime = Math.floor(t / 60) + ":" + (t % 60 / 100).toFixed(2).slice(-2);
      that.setData({
        atPresentTime: atPresentTime,
        atPresent: t
      });
    },1000);

    //歌曲结束时间
    setTimeout(function(){
      var t = backgroundAudioManager.duration;
      var endTime = Math.floor(t / 60) + ":" + (t % 60 / 100).toFixed(2).slice(-2);
      that.setData({
        endTimes: endTime,
        end: t
      });
    },50);
    
    //设置相关宽高
    var jsonList = jsonList || [];
    wx.request({
      url: getapp.localIp() + 'WYmusic/data/music.json',
      method: 'GET',
      success: (res) => {
        for (var i in res.data.operation) {
          jsonList.push(getapp.localIp() + res.data.operation[i]);
        }
        console.log(jsonList[0]);
        this.setData({
          wHeight: getapp.publicHeight(),
          panW: getapp.publicHeight() * 0.5,
          stylusW: getapp.publicHeight() * 0.072,
          musicIcon: jsonList
        });
      },
      fail: (err) => {
        console.log(err.errMsg);
      }
    });
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