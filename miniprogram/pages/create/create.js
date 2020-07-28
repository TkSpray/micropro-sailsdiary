// pages/create/create.js
const db = wx.cloud.database();
const _ = db.command;
import Toast from "@vant/weapp/toast/toast";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: "",
    tag: "",
    article: "",
    fileList: [],
    file: {},
    _id: "",
    id: 0
  },
  afterRead(event) {
    const { file } = event.detail;
    this.setData({ file });

    const fileList = this.data.fileList;
    fileList.push({ url: file.path });
    this.setData({ fileList });
  },
  async confirm() {
    if (
      this.data.title &&
      this.data.tag &&
      this.data.article &&
      this.data.file
    ) {
      const file = this.data.file;
      let that = this;
      let cloudPath =
        `sailsdiary/${Date.now()}-${Math.floor(Math.random(0, 1) * 1000)}` +
        file.path.match(/\.[^.]+?$/)[0];

      Toast.loading({
        mask: true,
        message: "上传中..."
      });

      wx.cloud.uploadFile({
        filePath: file.path,
        cloudPath,
        success(res) {
          // 上传完成需要更新 fileList
          db.collection("diary")
            .doc(that.data._id)
            .update({
              data: {
                articles: _.push([
                  {
                    id: that.data.id,
                    title: that.data.title,
                    tag: that.data.tag,
                    text: that.data.article,
                    coverURL: res.fileID
                  }
                ])
              }
            })
            .then(result => {
              Toast.clear();
              Toast({
                type: "success",
                message: "上传成功",
                onClose: () => {
                  wx.redirectTo({
                    url: "/pages/home/home"
                  });
                }
              });
            });
        }
      });
    } else Toast.fail("信息不完整");
  },
  async checkUser() {
    const userData = await db.collection("diary").get();
    let _id = userData.data[0]._id;
    let id = userData.data[0].articles.length;

    this.setData({
      _id,
      id
    });
  },
  onBlur(e) {
    let name = e.currentTarget.dataset.name;
    let value = e.detail.value;
    this.setData({
      [name]: value
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.checkUser();
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
