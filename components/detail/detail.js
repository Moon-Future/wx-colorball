Component({
  properties: {
    prizeGrades: {
      type: Array,
      value: []
    }
  },
  data: {
    title: ['奖等', '中奖注数（注）', '中奖金额（元）'],
    typeMap: {
      1: '一等奖',
      2: '二等奖',
      3: '三等奖',
      4: '四等奖',
      5: '五等奖',
      6: '六等奖'
    }
  }
})