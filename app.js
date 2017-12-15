App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
  
  },

  publicHeight: function () {
    var res = wx.getSystemInfoSync();
    return res.windowHeight;
  },

  localIp: function () {
    //return 'http://192.168.80.1/';
    // return 'http://127.0.0.1:8020/';
    // return 'http://169.254.124.145/'
    return 'http://192.168.8.117/';
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  }
})
