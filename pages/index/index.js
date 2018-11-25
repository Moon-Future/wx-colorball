Page({
  onShareAppMessage() {
    return {
      title: '看看你中大奖了吗',
      path: '/pages/index/index'
    }
  },
  data: {
    red: ['', '', '', '', '', ''],
    blue: '',
    code: '',
    date: '',
    nextData: '',
    sales: '',
    poolmoney: '',
    prizeGrades: [],
    img: '../../img/right.png',
    tabIndex: 0,
    redArray: [],
    blueArray: [],
    redChooseMap: {},
    blueChooseMap: {},
    allChoose: [],
    redLen: 6,
    blueLen: 1,
    multiArray: [['红球'], ['蓝球']],
    multiIndex: [1, 1],
    editIndex: -1,
    choosedIndex: -1
  },
  onLoad() {
    this.timer = null
    const numMap = this.numList()
    let multiArray = [['红球'], ['蓝球']]
    for (let i = 1, len = 33; i <= len; i++) {
      i >= 6 ? multiArray[0].push(i) : false
      i <= 16 ? multiArray[1].push(i) : false
    }
    this.setData({
      redArray: numMap.redArray,
      blueArray: numMap.blueArray,
      multiArray
    })

    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    this.getDate()
  },
  numList() {
    let redArray = [], blueArray = []
    for (let i = 1, len = 33; i <= len; i++) {
      i = i < 10 ? `0${i}` : i
      redArray.push(i)
      Number(i) <= 16 ? blueArray.push(i) : false
    }
    return {redArray, blueArray}
  },
  getDate() {
    const self = this
    wx.request({
      // url: 'http://www.cwl.gov.cn/cwl_admin/kjxx/findIssue',
      url: 'https://wxserver.cl8023.com/api/ball/kjxx',
      data: {name: 'ssq', type: 'findIssue'},
      success(res) {
        self.setData({code: res.data.result.code[0]})
        self.getNum()
      }
    })
  },
  getNum() {
    const self = this
    wx.request({
      // url: 'http://www.cwl.gov.cn/cwl_admin/kjxx/findKjxx/forIssue',
      url: 'https://wxserver.cl8023.com/api/ball/kjxx',
      data: {name: 'ssq', code: self.data.code, type: 'findKjxx'},
      success(res) {
        wx.hideLoading()
        const result = res.data.result[0]
        const prizeGrades = result.prizegrades
        const date = result.date
        const day = new Date(date).getDay()
        const oneDay = 24 * 60 * 60 * 1000
        let nextData
        if (prizeGrades.length > 6) {
          prizeGrades.splice(6, prizeGrades.length)
        }
        if (day === 0 || day === 2) {
          nextData = new Date(date).getTime() + 2 * oneDay
        } else if (day === 4) {
          nextData = new Date(date).getTime() + 3 * oneDay
        }
        nextData = new Date(nextData)
        nextData = `${nextData.getFullYear()}-${nextData.getMonth() + 1}-${nextData.getDate()}`
        self.setData({
          red: result.red.split(','),
          blue: result.blue,
          date: result.date,
          nextData,
          sales: result.sales,
          poolmoney: result.poolmoney,
          prizeGrades: prizeGrades
        })
      }
    })
  },
  goHistory() {
    wx.navigateTo({
      url: '../history/history'
    })
  },
  changeTab(e) {
    const index = e.currentTarget.dataset.index
    this.setData({
      tabIndex: index
    })
    if (index == 0) {
      wx.showLoading({
        title: '加载中...',
        mask: true
      })
      this.getDate()
    }
  },
  chooseRed(e) {
    let redChooseMap = this.data.redChooseMap
    const num = e.currentTarget.dataset.num
    if (redChooseMap[num] === undefined) {
      redChooseMap[num] = true
    } else {
      delete redChooseMap[num]
    }
    this.setData({redChooseMap})
  },
  chooseBlue(e) {
    let blueChooseMap = this.data.blueChooseMap
    const num = e.currentTarget.dataset.num
    if (blueChooseMap[num] === undefined) {
      blueChooseMap[num] = true
    } else {
      delete blueChooseMap[num]
    }
    this.setData({blueChooseMap})
  },
  confirm() {
    let allChoose = this.data.allChoose
    let chooseOne = {red: [], blue: []}
    for (let key in this.data.redChooseMap) {
      chooseOne.red.push(key)
    }
    for (let key in this.data.blueChooseMap) {
      chooseOne.blue.push(key)
    }
    if (chooseOne.red.length < 6 || chooseOne.blue.length === 0) {
      wx.showToast({
        title: '请至少选择6个红球+1个蓝球',
        icon: 'none',
        duration: 1000,
        mask:true
      })
      return false
    }
    chooseOne.red.sort((a, b) => {
      return a - b
    })
    chooseOne.blue.sort((a, b) => {
      return a - b
    })
    if (this.data.editIndex === -1) {
      allChoose.push(chooseOne)
    } else {
      allChoose.splice(this.data.editIndex, 1, chooseOne)
    }
    this.clearChoosedIndex(0)
    this.setChoosedIndex(this.data.editIndex === -1 ? allChoose.length - 1 : this.data.editIndex, true)
    this.setData({allChoose, redChooseMap: {}, blueChooseMap: {}, editIndex: -1})
  },
  clear() {
    if (this.data.editIndex !== -1) {
      this.clearChoosedIndex(0)
    }
    this.setData({redChooseMap: {}, blueChooseMap: {}, editIndex: -1})
  },
  longPress(e) {
    const index = e.currentTarget.dataset.index
    const self = this
    this.clearChoosedIndex(0)
    this.setChoosedIndex(index)
    wx.showActionSheet({
      // itemList: ['编辑', '删除', '发送到微信'],
      itemList: ['编辑', '删除'],
      success(res) {
        const tapIndex = res.tapIndex
        let allChoose = self.data.allChoose
        let chooseOne, redMap = {}, blueMap = {}
        if (tapIndex === 0) {
          chooseOne = allChoose[index]
          chooseOne.red.forEach(ele => {
            redMap[ele] = true
          });
          chooseOne.blue.forEach(ele => {
            blueMap[ele] = true
          });
          self.setData({
            redChooseMap: redMap,
            blueChooseMap: blueMap,
            editIndex: index
          })
        } else if (tapIndex === 1) {
          allChoose.splice(index, 1)
          self.setData({allChoose})
          self.clearChoosedIndex(0)
        }
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },
  randomChoosePicker(e) {
    let [redIndex, blueIndex] = e.detail.value
    redIndex = redIndex === 0 ? 1 : redIndex
    blueIndex = blueIndex === 0 ? 1 : blueIndex
    this.setData({
      redLen: this.data.multiArray[0][redIndex],
      blueLen: this.data.multiArray[1][blueIndex],
    })
    this.randomChoose()
  },
  randomChoose() {
    const numMap = this.numList()
    let red = numMap.redArray, redMap = {}
    let blue = numMap.blueArray, blueMap = {}
    for (let i = 0; i < this.data.redLen; i++) {
      let index = this.getRandom(0, red.length - 1)
      redMap[red[index]] = true
      red.splice(index, 1)
    }
    for (let i = 0; i < this.data.blueLen; i++) {
      let index = this.getRandom(0, blue.length - 1)
      blueMap[blue[index]] = true
      blue.splice(index, 1)
    }
    this.setData({
      redChooseMap: redMap,
      blueChooseMap: blueMap
    })
  },
  getRandom(n, m) {
    return Math.floor(Math.random() * (m - n + 1) + n)
  },
  setChoosedIndex(index, flag = false) {
    this.setData({choosedIndex: index})
    flag ? this.clearChoosedIndex() : false
  },
  clearChoosedIndex(time = 2000) {
    const self = this
    clearTimeout(self.timer)
    if (time === 0) {
      self.setData({choosedIndex: -1})
    } else {
      self.timer = setTimeout(() => {
        self.setData({choosedIndex: -1})
      }, 2000)
    }
  }
})
