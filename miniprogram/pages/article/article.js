// pages/article/article.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    article: {},
    title: "如鱼饮水，冷暖自知 ，每个人都是自己的英雄",
    tag: "心情",
    article:
      "每一个昨天都已经成为过去，每一个过客都已经成为记忆，每一份情感都会掺杂进风雨。翻开一篇新的日历，属于昨天的一切都已变淡变远，活在当下，且歌且行生活才会充满着惬意。\n每天才是人生崭新的诗篇，擦干眼泪，要写美写暖让心情得到释放与舒缓，做自己喜欢的事，爱值得爱的人。任一切从记忆走散走远，任一切随风雨而改变。守心自暖，才是一份安稳的甜蜜。\n过好当下，才是生命最好的姿态，听风看雨赏花让心在每天变美丽。阅读写作让灵魂变得优雅与高贵。人的一生总要为了理想与梦想而不懈努力的追求，无论前路是崎岖坎坷，还是风雨交加，都要面带微笑为自己鼓励与加油，要相信美丽的彩虹就在风雨后。"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let article = JSON.parse(app.globalData.article);
    this.setData({
      article
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {}
});
