import React, {useState, useEffect, useRef} from 'react'
import * as echarts from 'echarts'
import 'echarts-gl'
import generateColors from '../../../utils/generateColors'

export default function CustomizeScatter(props) {
  const {datax=[], datay=[], dataz=[], height = 600, width = '80%', className, color, size, sizeweight=[], xname, yname, zname, title, legendTitle=[]} = props

  const [maxsizeweight, setmaxsizeweight] = useState()

  const figure = useRef()
  let data = []

  // 初始化数据（根据传入的 data 重构）
  const initData = () => {
    for (let j = 0; j < datay.length; j++) {
      data.push([])
      for (let j = 0; j < datay.length; j++) {
        const curDatay = datay[j]
        data.push([])
        for (let i = 0; i < datax.length; i++) {
          if (sizeweight.length) {
            data[j].push([datax[i], curDatay[i], dataz[i], sizeweight[i]])
          } else {
            data[j].push([datax[i], curDatay[i], dataz[i]])
          }
        }
      }
    }
  }

  useEffect(() => {
    setmaxsizeweight(Math.max(...sizeweight))
    initData()
    initChart()
    return () => {
      chart.dispose()
    }
  }, [sizeweight])

  // 当 props 改变时，重构数据，初始化图像
  useEffect(() => {
    initData()
    initChart()
    return () => {
      chart.dispose()
    }
  })
  
  
  // 根据 data 生成 二维散点图 的配置（data数组有几个元素，就生成几个配置）
  const getSeriesConfig3d = (data) => {
    const res = []
    if (!data) return res
    data.forEach((element, index) => {
      res.push({
        name: legendTitle[index],
        type: 'scatter3D',
        data: element,
        symbolSize: function (value) {
          return value[3] != null && value[3] !== '' ? value[3] / maxsizeweight * size : size; // 如果有sizeweight，则使用sizeweight * size的值，否则使用默认的size
        },
        itemStyle: {
          color: generateColors(color, data.length)[index],
        },
      })
    })
    return res
  }

  let chart
  const initChart = () => {
    chart = echarts.init(figure.current, 'macarons')

    chart.setOption({
      title: [
        {
          text: title,
          textStyle: {
            fontSize: 24,
            color: '#fff',
          },
          left: 'center',
          padding: [60, 0, 0, 0]
        }
      ],
      visualMap: {
        show: false,
        min: 0,
        max: 2000,
        inRange: {
          colorAlpha: [0.2, 1]
        }
      },
      backgroundColor: '#100C2A',
      xAxis3D: {
        name: xname,
        nameTextStyle: {
          fontWeight: 'bold',
          fontSize: 16,
        }
      },
      yAxis3D: {
        name: yname,
        nameTextStyle: {
          fontWeight: 'bold',
          fontSize: 16,
        }
      },
      zAxis3D: {
        name: zname,
        nameTextStyle: {
          fontWeight: 'bold',
          fontSize: 16,
        }
      },
      grid3D: {
        axisLine: {
          lineStyle: { color: '#fff' }
        },
        axisPointer: {
          lineStyle: { color: '#fff' }
        },
      },
      series: getSeriesConfig3d(data),
      legend: {
        top: '5%',
        textStyle: {
          color: '#fff'
        }
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
    })
  }
  
  
  return (
    <div ref={figure} className={{className}} style={{height:height,width:width}} />
  )
}
