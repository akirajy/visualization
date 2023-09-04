import React, {useState, useEffect, useRef} from 'react'
import * as echarts from 'echarts'
import generateColors from '../../../utils/generateColors'

export default function CustomizeBar(props) {
  const {datax=[], datay=[], height = 600, width = '80%', className, color, size, sizeweight=[], xname, yname, title, legendTitle=[]} = props

  const [maxsizeweight, setmaxsizeweight] = useState()

  const figure = useRef()
  let data = []

  // 当 props 改变时，重构数  据，初始化图像
  useEffect(() => {
    initChart()
    return () => {
      chart.dispose()
    }
  }, [datax, datay, size, sizeweight, color, xname, yname, title, legendTitle])
  

  useEffect(() => {
    setmaxsizeweight(Math.max(...sizeweight))
  }, [sizeweight])

  let app = {}
  const posList = [
    'left',
    'right',
    'top',
    'bottom',
    'inside',
    'insideTop',
    'insideLeft',
    'insideRight',
    'insideBottom',
    'insideTopLeft',
    'insideTopRight',
    'insideBottomLeft',
    'insideBottomRight'
  ];
  app.configParameters = {
    rotate: {
      min: -90,
      max: 90
    },
    align: {
      options: {
        left: 'left',
        center: 'center',
        right: 'right'
      }
    },
    verticalAlign: {
      options: {
        top: 'top',
        middle: 'middle',
        bottom: 'bottom'
      }
    },
    position: {
      options: posList.reduce(function (map, pos) {
        map[pos] = pos;
        return map;
      }, {})
    },
    distance: {
      min: 0,
      max: 100
    }
  };
  app.config = {
    rotate: 90,
    align: 'left',
    verticalAlign: 'middle',
    position: 'insideBottom',
    distance: 15,
    onChange: function () {
      const labelOption = {
        rotate: app.config.rotate,
        align: app.config.align,
        verticalAlign: app.config.verticalAlign,
        position: app.config.position,
        distance: app.config.distance
      };
      figure.setOption({
        series: [
          {
            label: labelOption
          },
          {
            label: labelOption
          },
          {
            label: labelOption
          },
          {
            label: labelOption
          }
        ]
      });
    }
  };

  const labelOption = {
    show: true,
    position: app.config.position,
    distance: app.config.distance,
    align: app.config.align,
    verticalAlign: app.config.verticalAlign,
    rotate: app.config.rotate,
    formatter: '{c}  {name|{a}}',
    fontSize: 16,
    rich: {
      name: {}
    }
  };

  // 根据 data 生成图表的配置（data数组有几个元素，就生成几个配置）
  const getSeriesConfig = (data) => {
    const res = []
    console.log('------data------')
    console.log(data)
    if (!data) return res
    data.forEach((element, index) => {
      res.push({
        name: legendTitle[index],
        data: element,
        type: 'bar',
        itemStyle: {
          color: generateColors(color, data.length)[index],
        },
        barGap: 0,
        label: labelOption,
        emphasis: {
          focus: 'series'
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
        },
        data: datax
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
      series: getSeriesConfig(datay),
      toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar', 'stack'] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
    })
  }
  
  return (
    <div ref={figure} className={{className}} style={{height:height,width:width}} />
  )
}
