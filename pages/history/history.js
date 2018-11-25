Page({
  data: {
    count: 30,
    countSection: [30, 50, 100],
    countIndex: 0,
    history: [],
    currentIndex: 0
  },
  onLoad() {
    this.getData()
  },
  search(e) {
    const index = e.currentTarget.dataset.index
    const count = e.currentTarget.dataset.count
    this.setData({
      countIndex: index,
      count: count
    })
    this.getData()
  },
  getData() {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    const self = this
    wx.request({
      // url: 'http://www.cwl.gov.cn/cwl_admin/kjxx/findDrawNotice',
      url: 'https://wxserver.cl8023.com/api/ball/kjxx',
      data: {
        name: 'ssq',
        issueCount: self.data.count,
        type: 'findDrawNotice'
      },
      success(res) {
        wx.hideLoading()
        const history = res.data.result
        history.forEach(ele => {
          ele.red = ele.red.split(',')
          if (ele.prizegrades.length > 6) {
            ele.prizegrades.splice(6, ele.prizegrades.length)
          }
        });
        self.setData({
          history: history
        })
      }
    })
  },
  showDetail(e) {
    const index = e.currentTarget.dataset.index
    if (index == this.data.currentIndex) {
      this.setData({
        currentIndex: -1,
      })
    } else {
      this.setData({
        currentIndex: index,
      })
    }
  }
})