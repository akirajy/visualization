import React, {useState, useEffect, useRef} from 'react'
import * as echarts from 'echarts'
import generateColors from '../../../utils/generateColors'

export default function CustomizeScatter(props) {
  const {datax=[], datay=[], height = 600, width = '80%', className, color, size, sizeweight=[], xname, yname, title, legendTitle=[]} = props

  const [maxsizeweight, setmaxsizeweight] = useState(0)

  const figure = useRef()
  let data = []

  
  useEffect(() => {
    let maxWeight = Math.max(...sizeweight);
    if (maxWeight === -Infinity || isNaN(maxWeight)) {
      maxWeight = 0;
    }
    setmaxsizeweight(maxWeight)
  }, [sizeweight])

  // 当 props 改变时，重构数据，初始化图像
  useEffect(() => {
    for (let j = 0; j < datay.length; j++) {
      const curDatay = datay[j]
      data.push([])
      for (let i = 0; i < datax.length; i++) {
        if (sizeweight.length) {
          data[j].push([datax[i], curDatay[i], sizeweight[i]])
        } else {
          data[j].push([datax[i], curDatay[i]])
        }
      }
    }
    initChart()
    return () => {
      chart.dispose()
    }
  }, [datax, datay, size, maxsizeweight])

  // 根据 data 生成图表的配置（data数组有几个元素，就生成几个配置）
  const getSeriesConfig = (data) => {
    const res = []
    if (!data) return res
    data.forEach((element, index) => {
      res.push({
        name: legendTitle[index],
        data: element,
        type: 'scatter',
        symbolSize: function (value) {
          return value[2] != null && value[2] !== '' ? value[2] / maxsizeweight * size : size; // 如果有sizeweight，则使用sizeweight * size的值，否则使用默认的size
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
      title: {
        text: title,
        textStyle: {
          fontSize:24
        },
        left: 'center',
      },
      xAxis: {
        name: xname,
        nameLocation: 'middle',
        nameTextStyle: {
          fontWeight: 'bold',
          fontSize: 16,
          color: '#000',
          padding: [20, 0, 0, 0]
        }
      },
      yAxis: {
        name: yname,
        nameLocation: 'middle',
        nameTextStyle: {
          fontWeight: 'bold',
          fontSize: 16,
          color: '#000',
          padding: [0, 0, 24, 0]
        }
      },
      legend: {
        top: '5%'
      },
      series: getSeriesConfig(data),
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
