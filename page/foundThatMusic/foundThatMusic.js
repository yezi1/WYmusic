// page/foundThatMusic/foundThatMusic.js
const getapp = new getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchState: false,
    searchtext: '',
    positionNum: '7',
    inputStatus: false, 
    musicHash: null,
poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
    name: '此时此刻',
    author: '许巍',
    src: 'http://fs.w.kugou.com/201712142213/e77e42385f5006fa399cd1c90bc04094/G059/M02/17/1D/ew0DAFdr9KmAf5GnADSkTnjFCm0437.mp3'    
  },

  inputState: function (event) {
    this.data.searchtext = event.detail.value;
    if (this.data.searchtext.length > 0) {
      this.data.searchState = true;
      this.requestData();
    }else{
      this.data.searchState = false;
    }
    this.setData({
      searchState: this.data.searchState  
    });
  },

  // inputState: function () {
  //   this.data.inputStatus = false;
  //   this.setData({
  //     inputStatus: this.data.inputStatus
  //   });
  // },

  //搜索音乐接口
  requestData: function () {
    var that = this;
    var resData = [];
    var resHash = [];
    wx.request({
      url: 'http://songsearch.kugou.com/song_search_v2?userid=-1&clientver=&platform=WebFilter&tag=em&filter=2&iscorrection=1&privilege_filter=0&_=1510210621763&keyword=' + this.data.searchtext + '&page=1&pagesize=20',
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      dataType: "jsonp",
      success: (res) => {
        var jsonRes = JSON.parse(res.data);
        for (var i in jsonRes.data.lists) {
          resData.push(jsonRes.data.lists[i].FileName.replace(/<\/?em[^>]*>/gi, ''));
          resHash.push(jsonRes.data.lists[i].FileHash);
        };
        this.setData({
          songName: resData,
          songHash: resHash
        });
      },
      fail: (err) => {
        console.log(err.errMsg);
      }
    });    
  },

  searchFocus: function () {
    this.data.inputStatus = true;
    this.setData({
      inputStatus: this.data.inputStatus
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

  playMusic: function (event) {
    this.data.musicHash = event.currentTarget.dataset.hash;
    var that = this;
    wx.request({
      url: 'http://www.kugou.com/yy/index.php?r=play/getdata&hash=' + that.data.musicHash,
      method: 'GET',
      header: {
        'content-type': 'application/json' 
      },
      dataType: "jsonp",
      success: (res) => {
        var jsonRes = JSON.parse(res.data);
        this.setData({
          musiPlay: jsonRes.data.play_url
        });
      },
      fail: (err) => {
        console.log(err.errMsg);
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '当前页面当前页面当前页面当前页面当前页面'
    })
    let that = this;    
    wx.request({
      url: getapp.localIp() + 'WYmusic/data/music.json',
      method: 'GET',
      success: function (res) {
        var win = wx.getSystemInfoSync();
        var mvImgUrl = [];
        var latestUrl = [];
        var exclusiveUrl = [];
        var recommendUrl = [];
        var columnUrl = [];
        var handpickUrl = [];
        var anchorUrl = [];
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
        for (var i in res.data.handpick) {
          handpickUrl.push(getapp.localIp() + res.data.handpick[i].imgUrl);
        }
        for (var i in res.data.anchor) {
          anchorUrl.push(getapp.localIp() + res.data.anchor[i].imgUrl);
        }  
        that.setData({
          wHeight: win.windowHeight,
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
          mvImgUrl: mvImgUrl,
          handpick: res.data.handpick,
          handpickUrl: handpickUrl,
          anchor: res.data.anchor,
          anchorUrl: anchorUrl,
          singerIcon: getapp.localIp() + res.data.singerIcon,
          singerRarrow: getapp.localIp() + res.data.singerRarrow
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
  onReady: function (e) {
    let res = wx.getSystemInfoSync();
    let imgW1 = res.screenWidth*0.328;
    this.audioCtx = wx.createAudioContext('myAudio')
    this.setData({
      imgW1: imgW1
    });
  },
  audioPlay: function () {
    this.audioCtx.play()
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