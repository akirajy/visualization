import React, {useEffect, useRef} from 'react'
import * as echarts from 'echarts'

export default function PieChart(props) {
  const {className, height = 600, width = '80%'} = props

  const figure = useRef()

  useEffect(() => {
    initChart()  
  }, [])
  
  const initChart = () => {
    let chart = echarts.init(figure.current, 'macarons')

    chart.setOption({
      backgroundColor: '#2c343c',
      title: {
        text: '各类别样本数饼状图',
        left: 'center',
        top: 20,
        textStyle: {
          color: 'rgba(195, 66, 62)',
        }
      },
      tooltip: {
        trigger: 'item'
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      visualMap: {
        show: false,
        min: 80,
        max: 6000,
        inRange: {
          colorLightness: [0, 1]
        }
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '55%',
          center: ['50%', '50%'],
          data: [
            { value: 2697, name: '类1' },
            { value: 3256, name: '类2' },
            { value: 1404, name: '类3' },
            { value: 4203, name: '类4' }
          ].sort(function(a, b) {
            return a.value - b.value
          }),
          roseType: 'radius',
          label: {
            color: 'rgba(255, 255, 255, 0.3)'
          },
          labelLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.3)'
            },
            smooth: 0.2,
            length: 10,
            length2: 20
          },
          itemStyle: {
            color: '#c23531',
            shadowBlur: 200,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          },
          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: function(idx) {
            return Math.random() * 200
          }
        }
      ]
    })
  }
  
  return (
    <div ref={figure} className={{className}} style={{height:height,width:width}} />
  )
}
