import React, { useState, useEffect, useRef } from 'react'
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload, Divider, Select, Input } from 'antd';
// 处理表格数据
import * as XLSX from "xlsx"
// 取色器
import { SketchPicker } from 'react-color';

import './Customize.css'

// 菜单组件
import SliderWithInput from '../../../components/customize/selection-menu/SliderWithInput';
// 图形组件
import CustomizeScatter from '../../../components/customize/charts/CustomizeScatter';
import CustomizeScatter3d from '../../../components/customize/charts/CustomizeScatter3d';
import CustomizeBar from '../../../components/customize/charts/CustomizeBar';

// 虚拟列表
import { Table, theme } from 'antd';
import classNames from 'classnames';
import ResizeObserver from 'rc-resize-observer';
import { VariableSizeGrid as Grid } from 'react-window';

export default function Customize() {
  const [data, setData] = useState([])
  const [property, setProperty] = useState([])
  const [disable, setDisable] = useState(false);

  // 传给 upload 的属性
  const props = {
    name: 'file',
    headers: {
      authorization: 'authorization-text',
    },
    accept: ".xls, .xlsx, .csv",
    maxCount: 1,
    beforeUpload(file) {
      handleBeforeUpload(file)
      return false
    }
  };
  
  /* 数据处理 将格式转化为： {
    Key: [0,1,2],
    Time: [],
    Power: []
  } */
  const [processedData, setprocessedData] = useState({})

  // 手动上传
  const handleBeforeUpload = (file) => {
    // 数据处理excel=>json
    importsExcel(file).then((res) => {
      const arr = res.map((item, index) => {
        return {
          Key: index,
          ...item
        }
      })
      // 表格数据
      setData(arr);
      // 导入数据空，禁用「导入」按钮
      setDisable(arr.length === 0);

      // 将属性存起来
      const properties = []
      console.log('arr',arr)
      for (const [key, value] of Object.entries(arr[0])) {
        properties.push(key)
        processedData[key] = []
      }

      // 处理加工数据 获得 processedData
      for (const item of Object.values(arr)) {
        for (const [key, value] of Object.entries(item)) {
          processedData[key].push(value)
        }
      }
      setprocessedData({...processedData})

      console.log('processedData', processedData)
      setProperty(properties)
    });
    
    return false;
  };
  
  // Excel 数据转为 json 数据
  function importsExcel(file) {
    //使用promise导入
    return new Promise((resolve, reject) => {
      // 通过FileReader对象读取文件
      const fileReader = new FileReader();
      //异步操作  excel文件加载完成以后触发
      fileReader.onload = (event) => {
        try {
          const { result } = event.target
          // 以二进制流方式读取得到整份excel表格对象
          const workbook = XLSX.read(result, { type: "binary" });
          // 存储获取到的数据
          let data = []; 
          // 遍历每张工作表进行读取
          for (const sheet in workbook.Sheets) {
            if (Object.prototype.hasOwnProperty.call(workbook.Sheets, sheet)) {
              data = data.concat(
                // 将工作表转换为json数据
                XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
              );
            }
          }
          // 如果Excel文件里只有一张数据工作表（比如：data），也可以不遍历，直接获取数据
          // if (Object.prototype.hasOwnProperty.call(workbook.Sheets, "data")) {
          //    // 将工作表转换为json数据            
          //    data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
          //  }
          resolve(data); //导出数据
        } catch (e) {
          // 这里可以抛出文件类型错误不正确的相关提示
          reject("导入失败");
        }
      };
      // 以二进制方式打开文件
      fileReader.readAsBinaryString(file);
    });
  }

  // 导入数据，根据需求处理数据
  const handleImport = () => {
    // data
  }
  
  // 虚拟列表
  const VirtualTable = (props) => {
    const { columns, scroll } = props;
    const [tableWidth, setTableWidth] = useState(0);
    const { token } = theme.useToken();
    const widthColumnCount = columns.filter(({ width }) => !width).length;
    const mergedColumns = columns.map((column) => {
      if (column.width) {
        return column;
      }
      return {
        ...column,
        width: Math.floor(tableWidth / widthColumnCount),
      };
    });
    const gridRef = useRef();
    const [connectObject] = useState(() => {
      const obj = {};
      Object.defineProperty(obj, 'scrollLeft', {
        get: () => {
          if (gridRef.current) {
            return gridRef.current?.state?.scrollLeft;
          }
          return null;
        },
        set: (scrollLeft) => {
          if (gridRef.current) {
            gridRef.current.scrollTo({
              scrollLeft,
            });
          }
        },
      });
      return obj;
    });
    const resetVirtualGrid = () => {
      gridRef.current?.resetAfterIndices({
        columnIndex: 0,
        shouldForceUpdate: true,
      });
    };
    useEffect(() => resetVirtualGrid, [tableWidth]);
    const renderVirtualList = (rawData, { scrollbarSize, ref, onScroll }) => {
      ref.current = connectObject;
      const totalHeight = rawData.length * 54;
      return (
        <Grid
          ref={gridRef}
          className="virtual-grid"
          columnCount={mergedColumns.length}
          columnWidth={(index) => {
            const { width } = mergedColumns[index];
            return totalHeight > scroll?.y && index === mergedColumns.length - 1
              ? width - scrollbarSize - 1
              : width;
          }}
          height={scroll.y}
          rowCount={rawData.length}
          rowHeight={() => 54}
          width={tableWidth}
          onScroll={({ scrollLeft }) => {
            onScroll({
              scrollLeft,
            });
          }}
        >
          {({ columnIndex, rowIndex, style }) => (
            <div
              className={classNames('virtual-table-cell', {
                'virtual-table-cell-last': columnIndex === mergedColumns.length - 1,
              })}
              style={{
                ...style,
                boxSizing: 'border-box',
                padding: token.padding,
                borderBottom: `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`,
                background: token.colorBgContainer,
              }}
            >
              {rawData[rowIndex][mergedColumns[columnIndex].dataIndex]}
            </div>
          )}
        </Grid>
      );
    };
    return (
      <ResizeObserver
        onResize={({ width }) => {
          setTableWidth(width);
        }}
      >
        <Table
          {...props}
          className="virtual-table"
          columns={mergedColumns}
          pagination={false}
          components={{
            body: renderVirtualList,
          }}
        />
      </ResizeObserver>
    );
  };

  // 创建列表数据
  const getColumns = () => {
    const columns = []
    property.forEach((item, index) => {
      if (index === property.length - 1) {
        columns[index] = {
          title: item,
          dataIndex: item,
        }
      } else {
        columns[index] = {
          title: item,
          dataIndex: item,
          width: 250,
        }
      }
    })
    return columns
  }

  // Select 可选图表类型
  const chartTypes = [
    { value: 'scatter', label: '散点图' },
    { value: 'scatter3d', label: '3d散点图' },
    { value: 'bar', label: '柱状图' },
    { value: 'pie', label: '饼图' },
  ]

  // 当前图表
  const [curChart, setcurChart] = useState('scatter')
  const changeChart = (value) => {
    setcurChart(value)
  }

  // 图表对应 Select
  const chartToSelection = {
    'scatter': {
      name: '散点图',
      value: 'scatter',
      selections: ['x', 'y', 'size', 'sizeweight', 'color', 'xname', 'yname', 'title'],
    },
    'scatter3d': {
      name: '3d散点图',
      value: 'scatter3d',
      selections: ['x', 'y', 'z', 'color', 'xname', 'yname', 'zname', 'title'],
    },
    'bar': {
      name: '柱状图',
      value: 'bar',
      selections: ['x', 'y', 'color', 'xname', 'yname', 'title'],
    },
    'pie': {
      name: '饼图',
      value: 'pie',
      selections: ['x', 'y', 'color', 'xname', 'yname', 'title'],
    }
  }

  // 变量集合
  const getPropertyTypes = () => {
    const propertyTypes = []
    property.forEach((element, index) => {
      propertyTypes[index] = {
        value: element,
        label: element,
      }
    });
    return propertyTypes
  }

  // Select 可选变量类型
  const [curx, setcurx] = useState()
  const [cury, setcury] = useState()
  const [curz, setcurz] = useState()
  const [curColor, setcurColor] = useState('blue')
  const [curSize, setcurSize] = useState(16)
  const [curSizeWeight, setcurSizeWeight] = useState()
  const [curxName, setcurxName] = useState('')
  const [curyName, setcuryName] = useState('')
  const [curzName, setcurzName] = useState('')
  const [curTitle, setcurTitle] = useState('')
  const changeCurx = (value) => {
    setcurx(value)
  }
  const changeCury = (value) => {
    setcury(value)
  }
  const changeCurz = (value) => {
    setcurz(value)
  }
  const changeCurColor = (value) => {
    setcurColor(value)
  }
  const changeCurSize = (value) => {
    setcurSize(value)
  }
  const changeCurSizeWeight = (value) => {
    setcurSizeWeight(value)
  }
  // Input 的 onChange 事件传入的参数是 event
  const changeCurxName = (event) => {
    setcurxName(event.target.value)
  }
  const changeCuryName = (event) => {
    setcuryName(event.target.value)
  }
  const changeCurzName = (event) => {
    setcurzName(event.target.value)
  }
  const changeCurTitle = (event) => {
    setcurTitle(event.target.value)
  }

  const selectionToChangeFunc = {
    'x': changeCurx,
    'y': changeCury,
    'z': changeCurz,
    'color': changeCurColor,
    'size': changeCurSize,
    'sizeweight': changeCurSizeWeight,
    'xname': changeCurxName,
    'yname': changeCuryName,
    'zname': changeCurzName,
    'title': changeCurTitle,
  }

  const inputToValue = {
    'xname': curxName,
    'yname': curyName,
    'zname': curzName,
    'title': curTitle,
  }

  // 处理多选框的数据
  const handleData = (data, indexArray) => {
    const res = []
    if (!indexArray) return []
    for (let i = 0; i < indexArray.length; i++) {
      console.log(indexArray[i])
      res.push(data[indexArray[i]])
    }
    console.log(res)
    return res
  }

  // 不同属性渲染的组件集合
  const selectionSet = new Set(['x', 'y', 'z', 'sizeweight'])
  const sliderSet = new Set(['size'])
  const colorpickSet = new Set(['color'])
  const inputSet = new Set(['xname', 'yname', 'zname', 'title'])

  // 取色器
  const [materialColor, setMaterialColor] = useState({ color: '#FFFFFF' })
  const handleColorChange = colorCode => {
    setcurColor(colorCode.hex)
    setMaterialColor({ color: colorCode.hex })
  }

  // 当前图表对应渲染内容
  const chartToRender = {
    'scatter': <CustomizeScatter 
                datax={processedData[curx]}
                datay={handleData(processedData, cury)}
                dataz={processedData[curz]}
                color={curColor}
                size={curSize}
                sizeweight={processedData[curSizeWeight]}
                className='visualization-layout-chart'
                xname={curxName}
                yname={curyName}
                zname={curzName}
                title={curTitle}
                legendTitle={cury}
              />,
    'scatter3d': <CustomizeScatter3d 
                  datax={processedData[curx]}
                  datay={handleData(processedData, cury)}
                  dataz={processedData[curz]}
                  color={curColor}
                  size={curSize}
                  sizeweight={processedData[curSizeWeight]}
                  className='visualization-layout-chart'
                  xname={curxName}
                  yname={curyName}
                  zname={curzName}
                  title={curTitle}
                  legendTitle={cury}
                />,
    'bar': <CustomizeBar 
      datax={processedData[curx]}
      datay={handleData(processedData, cury)}
      dataz={processedData[curz]}
      color={curColor}
      size={curSize}
      sizeweight={processedData[curSizeWeight]}
      className='visualization-layout-chart'
      xname={curxName}
      yname={curyName}
      zname={curzName}
      title={curTitle}
      legendTitle={cury}
    />,
  }

  useEffect(() => {
    console.log('curSizeWeight', curSizeWeight);
  }, [curSizeWeight])

  return (
    <div>
      <Upload {...props}>
        <Button icon={<UploadOutlined />} onClick={handleImport}>上传数据集(.csv/.xls/.xlsx)</Button>
      </Upload>
      <VirtualTable
        columns={getColumns()}
        dataSource={data}
        scroll={{
          y: 300,
          x: '100vw',
        }}
      />
      <Divider>
        <h4>自定义图表</h4>
      </Divider>
      <div className='visualization-layout'>
        <Select
          defaultValue="散点图"
          style={{ width: 120 }}
          onChange={changeChart}
          options={chartTypes}
        />
        {/* 菜单部分 */}
        <div className='visualization-layout-select'>
          {
            chartToSelection[curChart]['selections'].map((item, index) => {
              if (selectionSet.has(item)) {
                return (
                  <div key={item}>
                    <div>{item}:</div>
                    <Select 
                      style={{width: 120}} 
                      onChange={selectionToChangeFunc[item]} 
                      options={getPropertyTypes()} mode={item === 'y' ? 'multiple' : ''}
                    />
                  </div>
                )
              } else if (sliderSet.has(item)) {
                return <SliderWithInput onChangeProps={selectionToChangeFunc[item]} defaultValue={curSize} key={item}></SliderWithInput>
              } else if (colorpickSet.has(item)) {
                return <SketchPicker onChange={handleColorChange} color = {materialColor.color} key={item}/>
              } else if (inputSet.has(item)) {
                return <Input value={inputToValue[item]} onChange={selectionToChangeFunc[item]} key={item} addonBefore={item}></Input>
              } 
              else {
                return <React.Fragment key={item} />;
              }
            })
          }
        </div>
        {/* 渲染的图表 */}
        {
          chartToRender[curChart]
        }
      </div>
    </div>
  )
}
