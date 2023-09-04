import React, {useEffect, useRef} from 'react'
import * as echarts from 'echarts'

export default function RaddarChart(props) {
  const {className, height = 600, width = '80%'} = props

  const figure = useRef()

  useEffect(() => {
    initChart()  
  }, [])
  
  const initChart = () => {
    let chart = echarts.init(figure.current, 'macarons')

    chart.setOption({
      color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087'],
      title: {
        text: '预测结果类累计图',
        left: 'center',
          top: 20,
          textStyle: {
            color: 'rgba(195, 66, 62)',
            fontFamily: 'Microsoft YaHei',
          }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: ['s1', 's2', 's3', 's4', 's5', 's6', 's7']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Line 1',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(128, 255, 165)'
              },
              {
                offset: 1,
                color: 'rgb(1, 191, 236)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: [140, 232, 101, 264, 90, 340, 250]
        },
        {
          name: 'Line 2',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(0, 221, 255)'
              },
              {
                offset: 1,
                color: 'rgb(77, 119, 255)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: [120, 333, 111, 234, 220, 340, 310]
        },
        {
          name: 'Line 3',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(55, 162, 255)'
              },
              {
                offset: 1,
                color: 'rgb(116, 21, 219)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: [320, 132, 201, 444, 90, 130, 220]
        },
        {
          name: 'Line 4',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(255, 0, 135)'
              },
              {
                offset: 1,
                color: 'rgb(135, 0, 157)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: [220, 788, 231, 88, 190, 230, 120]
        }
      ]
    })
  }
  
  return (
    <div ref={figure} className={{className}} style={{height:height,width:width}} />
  )
}
