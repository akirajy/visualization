import React, {useEffect, useRef} from 'react'
import * as echarts from 'echarts'

export default function PolarChart(props) {
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
          text: '不同天气类别数据雷达图',
          left: 'center',
          top: '20',
          textStyle: {
            color: 'rgba(195, 66, 62)',
            fontFamily: 'Microsoft YaHei',
          }
        }
      ],
      backgroundColor: 'rgba(43, 51, 59)',
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
        top: '25%',
        left: '2%',
        right: '2%',
        bottom: '3%',
        containLabel: true
      },
      legend: {
        data: ['Allocated Budget', 'Actual Spending']
      },
      radar: {
        shape: 'circle',
        splitNumber: 4, // 雷达图圈数设置
        name: {
          textStyle: {
              color: '#838D9E',
          },
        },
        // 设置雷达图中间射线的颜色
        axisLine: {
          lineStyle: {
            color: 'rgba(131,141,158,.1)',
          },
        },
        axisLabel: {
          show: true,
          fontSize: 12,
          color: '#838D9E',
          showMaxLabel: false, //不显示最大值，即外圈不显示数字30
          showMinLabel: true, //显示最小数字，即中心点显示0
        },
        indicator: [
          { name: '风速', min: -1, max: 1.5 },
          { name: '风向', min: -1.5, max: 1.5 },
          { name: '外界温度', min: -1, max: 1.5 },
          { name: '有功功率', min: 0, max: 2000 }
        ],
        splitArea : {
          show : false,
          areaStyle : {
            color: 'rgba(255,0,0,0)', // 图表背景的颜色
          },
        },
        splitLine : {
          show : true,
          lineStyle : {
            width : 1,
            color : 'rgba(131,141,158,.1)', // 设置网格的颜色
          },
        },
      },
      series: [
        {
          name: 'Budget vs spending',
          type: 'radar',
          data: [
            {
              value: [
                0.6386066095611288, 1.4065315240048222, 0.3568551014532554,
                1095.1289193047096
              ],
              name: '类别0',
              // 设置区域边框和区域的颜色
                itemStyle: {
                    normal: {
                        color: 'rgba(255,225,0,.3)',
                        lineStyle: {
                            color: 'rgba(255,225,0,.3)',
                        },
                    },
                },
            },
            {
              value: [
                -0.3999802639662262, -0.027558445806171103, -0.8588483732167005,
                439.11912059279337
              ],
              name: '类别1'
            },
            {
              value: [
                1.2769941394691067, -1.1088276600548062, 0.054122527745449116,
                1509.3675558557884
              ],
              name: '类别2'
            },
            {
              value: [
                -0.6332654043487248, -0.41649658266208966, 1.0777341183877343,
                345.16661642973133
              ],
              name: '类别3'
            }
          ]
        }
      ]
    })
  }
  
  return (
    <div ref={figure} className={{className}} style={{height:height,width:width}} />
  )
}
