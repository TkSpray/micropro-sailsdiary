// pages/home/home.js
const app = getApp();
const db = wx.cloud.database();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    time: "",
    day: "",
    date: "",
    text: "",
    auther: "",
    cardTitle: "采得百花成蜜后,为谁辛苦为谁甜。",
    cardText: "采得百花成蜜后,为谁辛苦为谁甜。",
    cardTag: "心情",
    userData: {},
    avatarUrl: "",
    dateMap: ["日", "一", "二", "三", "四", "五", "六"]
  },
  async checkUser() {
    //获取clouddisk是否有当前用户的数据，注意这里默认带了一个where({_openid:"当前用户的openid"})的条件
    const userData = await db.collection("diary").get();
    console.log("当前用户的数据对象", userData);

    //如果当前用户的数据data数组的长度为0，说明数据库里没有当前用户的数据
    if (userData.data.length === 0) {
      //没有当前用户的数据，那就新建一个数据框架，其中_id和_openid会自动生成
      return await db
        .collection("diary")
        .add({
          data: {
            articles: []
          }
        })
        .then(res => {
          console.log(res);
        });
    } else {
      this.setData({
        userData
      });
    }
  },
  getAvatar() {
    wx.getSetting({
      success: res => {
        if (res.authSetting["scope.userInfo"]) {
          wx.getUserInfo({
            success: res => {
              let { avatarUrl } = res.userInfo;
              avatarUrl = avatarUrl.split("/");
              avatarUrl[avatarUrl.length - 1] = 0;
              avatarUrl = avatarUrl.join("/");
              this.setData({
                avatarUrl
              });
            }
          });
        }
      }
    });
  },
  getSentence() {
    wx.cloud.callFunction({
      name: "getSentence",
      success: res => {
        this.setData({
          text: res.result.text,
          auther: "——" + res.result.auther
        });
      }
    });
  },
  formatDate(date) {
    date = date.toString();
    return date[1] ? date : "0" + date;
  },
  getTime() {
    const now = new Date();
    const time = [now.getHours(), now.getMinutes(), now.getSeconds()]
      .map(this.formatDate)
      .join(":");
    this.setData({
      time
    });
  },
  getDetails(e) {
    console.log(e);
    let data = JSON.stringify(e.currentTarget.dataset.item);
    app.globalData.article = data;
    wx.navigateTo({
      url: "/pages/article/article"
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAvatar();
    this.getSentence();
    const now = new Date();
    const day = "星期" + this.data.dateMap[now.getDay()];
    const date =
      now.getFullYear() +
      "年" +
      this.formatDate(now.getMonth() + 1) +
      "月" +
      this.formatDate(now.getDate()) +
      "日";
    this.getTime();
    this.setData({
      day,
      date
    });
    setInterval(this.getTime, 1000);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.checkUser();
  },

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
