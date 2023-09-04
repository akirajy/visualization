import React, {useEffect, useRef} from 'react'
import * as echarts from 'echarts'

export default function BarChart(props) {
  const {className, height = 600, width = '80%'} = props

  const figure = useRef()

  useEffect(() => {
    initChart()  
  }, [])
  
  const initChart = () => {
    let chart = echarts.init(figure.current, 'macarons')

    chart.setOption({
      title: [
        {
          text: '样本分类概率柱状图',
          left: 'center',
          top: 20,
          textStyle: {
            color: 'rgba(195, 66, 62)',
            fontFamily: 'Microsoft YaHei',
          }
        }
      ],
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        top: 40,
        left: '2%',
        right: '2%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        data: ['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9', 's10'],
        axisTick: {
          alignWithLabel: true
        }
      }],
      yAxis: [{
        type: 'value',
        axisTick: {
          show: false
        }
      }],
      series: [{
        name: 'pageA',
        type: 'bar',
        stack: 'vistors',
        barWidth: '60%',
        data: [15, 12, 60, 13, 80, 45, 10, 10, 4, 15],
      }, {
        name: 'pageB',
        type: 'bar',
        stack: 'vistors',
        barWidth: '60%',
        data: [17, 66, 26, 7, 7, 19, 21, 79, 11, 5],
      }, {
        name: 'pageC',
        type: 'bar',
        stack: 'vistors',
        barWidth: '60%',
        data: [55, 11, 10, 19, 5, 24, 58, 6, 62, 37],
      }, {
        name: 'pageD',
        type: 'bar',
        stack: 'vistors',
        barWidth: '60%',
        data: [13, 11, 4, 61, 8, 12, 12, 5, 23, 42],
      }]
    })
  }
  
  return (
    <div ref={figure} className={{className}} style={{height:height,width:width}} />
  )
}
