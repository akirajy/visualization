import React, {useEffect, useRef} from 'react'
import * as echarts from 'echarts'

export default function ScatterToBarChart(props) {
  const {className, height = 600, width = '80%'} = props

  const femaleData = [[161.2, 51.6], [167.5, 59.0], [159.5, 49.2], [157.0, 63.0], [155.8, 53.6],
    [170.0, 59.0], [159.1, 47.6], [166.0, 69.8], [176.2, 66.8], [160.2, 75.2],
    [172.5, 55.2], [170.9, 54.2], [172.9, 62.5], [153.4, 42.0], [160.0, 50.0]
  ]
  // prettier-ignore
  const maleDeta = [[174.0, 65.6], [175.3, 71.8], [193.5, 80.7], [186.5, 72.6], [187.2, 78.8],
    [181.5, 74.8], [184.0, 86.4], [184.5, 78.4], [175.0, 62.0], [184.0, 81.6],
    [180.0, 76.6], [177.8, 83.6], [192.0, 90.0], [176.0, 74.6], [174.0, 71.0]
  ]

  function calculateAverage(data, dim) {
    let total = 0
    for (var i = 0; i < data.length; i++) {
      total += data[i][dim]
    }
    return (total /= data.length)
  }

  const scatterOption = ({
    title: {
      text: 'xxx散点图',
      left: 'center',
        top: 20,
        textStyle: {
          color: 'rgba(195, 66, 62)',
          fontFamily: 'Microsoft YaHei',
        }
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      scale: true
    },
    yAxis: {
      scale: true
    },
    series: [
      {
        type: 'scatter',
        id: 'female',
        dataGroupId: 'female',
        universalTransition: {
          enabled: true,
          delay: function(idx, count) {
            return Math.random() * 400
          }
        },
        data: femaleData
      },
      {
        type: 'scatter',
        id: 'male',
        dataGroupId: 'male',
        universalTransition: {
          enabled: true,
          delay: function(idx, count) {
            return Math.random() * 400
          }
        },
        data: maleDeta
      }
    ]
  })
  const barOption = {
    title: {
      text: 'xxx柱状图',
      left: 'center',
        top: 20,
        textStyle: {
          color: 'rgba(195, 66, 62)',
          fontFamily: 'Microsoft YaHei',
        }
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      data: ['Female', 'Male'],
    },
    yAxis: {},
    series: [
      {
        type: 'bar',
        id: 'total',
        data: [
          {
            value: calculateAverage(maleDeta, 0),
            groupId: 'male'
          },
          {
            value: calculateAverage(femaleData, 0),
            groupId: 'female'
          }
        ],
        universalTransition: {
          enabled: true,
          seriesKey: ['female', 'male'],
          delay: function(idx, count) {
            return Math.random() * 400
          }
        }
      }
    ]
  }

  const figure = useRef()

  useEffect(() => {
    initChart()  
  }, [])
  
  const initChart = () => {
    let chart = echarts.init(figure.current, 'macarons')
    let currentOption = scatterOption
    setInterval(() => {
      currentOption = currentOption === scatterOption ? barOption : scatterOption
      chart.setOption(currentOption, true)
    }, 2000)
  }
  
  return (
    <div ref={figure} className={{className}} style={{height:height,width:width}} />
  )
}