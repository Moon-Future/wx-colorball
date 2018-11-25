// import * as echarts from '../../ec-canvas/echarts';

// let chart = null;

// function initChart(canvas, width, height) {
//   chart = echarts.init(canvas, null, {
//     width: width,
//     height: height
//   });
//   canvas.setChart(chart);

//   return chart;
// }


Page({
  // onShareAppMessage: function (res) {
  //   return {
  //     title: 'ECharts 可以在微信小程序中使用啦！',
  //     path: '/pages/index/index',
  //     success: function () { },
  //     fail: function () { }
  //   }
  // },
  // data: {
  //   ec: {
  //     onInit: initChart
  //   },
  //   ballData: [],
  //   count: 100,
  //   selectList: ['近30期', '近50期', '近100期'],
  //   index: 0
  // },
  // onLoad() {
  //   this.getData()
  // },
  // changeType(e) {
  //   const type = e.currentTarget.dataset.type
  //   if (type === 'bar') {
  //     this.barOption(this.data.ballData)
  //   } else {
  //     this.lineOption(this.data.ballData)
  //   }
  // },
  // getData() {
  //   const self = this
  //   wx.request({
  //     url: 'http://www.cwl.gov.cn/cwl_admin/kjxx/findDrawNotice',
  //     data: {
  //       name: 'ssq',
  //       issueCount: self.data.count
  //     },
  //     success(res) {
  //       self.data.ballData = res.data.result
  //       self.barOption(self.data.ballData)
  //     }
  //   })
  // },
  // barOption(data) {
  //   let redNum = [], numCount = [], numMap = {}
  //   data.forEach(ele => {
  //     let redList = ele.red.split(',')
  //     redList.forEach(red => {
  //       red = Number(red)
  //       if (numMap[red] === undefined) {
  //         numMap[red] = 1
  //       } else {
  //         numMap[red] += 1
  //       }
  //     })
  //   });
  //   for (let i = 1; i <= 33; i++) {
  //     redNum.push(i)
  //     numCount.push(numMap[i] || 0)
  //   }

  //   const option = {
  //     title: {
  //       text: `近${this.data.count}期红球总量`,
  //       textStyle: {
  //         color: '#fff'
  //       },
  //       subtext: '数据来自中国福利彩票官网',
  //       subtextStyle: {
  //         color: '#fff'
  //       },
  //     },
  //     tooltip : {
  //       trigger: 'axis',
  //       axisPointer : {            // 坐标轴指示器，坐标轴触发有效
  //         type : 'shadow'          // 默认为直线，可选为：'line' | 'shadow'
  //       }
  //     },
  //     grid: {
  //       containLabel: true
  //     },
  //     xAxis: {
  //       type: 'value',
  //       axisLine: {
  //         lineStyle: {
  //           color: '#fff'
  //         }
  //       }
  //     },
  //     yAxis: {
  //       type: 'category',
  //       data: redNum,
  //       axisTick: {
  //         alignWithLabel: true
  //       },
  //       axisLine: {
  //         lineStyle: {
  //           color: '#fff'
  //         }
  //       }
  //     },
  //     series: [
  //       {
  //         name: `近${this.data.count}期红球总量`,
  //         type: 'bar',
  //         data: numCount,
  //         itemStyle:{
  //           normal:{
  //             color:'#FF3366'
  //           }
  //         }
  //       }
  //     ]
  //   };
  //   chart.setOption(option);
  // },
  // lineOption(data) {
  //   let redNum = [], numCount = [], numMap = {}
  //   data.forEach(ele => {
  //     let redList = ele.red.split(',')
  //     redList.forEach(red => {
  //       red = Number(red)
  //       if (numMap[red] === undefined) {
  //         numMap[red] = 1
  //       } else {
  //         numMap[red] += 1
  //       }
  //     })
  //   });
  //   for (let i = 1; i <= 33; i++) {
  //     redNum.push(i)
  //     numCount.push(numMap[i] || 0)
  //   }

  //   const option = {
  //     xAxis: {
  //       type: 'value'
  //     },
  //     yAxis: {
  //       type: 'category',
  //       data: redNum
  //     },
  //     series: [{
  //       data: numCount,
  //       type: 'line'
  //     }]
  //   };
  //   chart.setOption(option);
  // }
})