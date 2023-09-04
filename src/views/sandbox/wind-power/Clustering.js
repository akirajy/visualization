import React from 'react';
import { Col, Row } from 'antd';
import PieChart from '../../../components/wind-power/clustering/PieChart';
import ScatterToBarChart from '../../../components/wind-power/clustering/ScatterToBarChart';
import BarChart from '../../../components/wind-power/clustering/BarChart';
import PolarChart from '../../../components/wind-power/clustering/PolarChart';
import RaddarChart from '../../../components/wind-power/clustering/RaddarChart';

export default function Clustering() {
  return (
    <div className='wrapper'>
      <Row gutter={[8, 16]}>
        {/* 第一行 */}
        <Col span={12}>
          <PieChart width="400px" height="400px"/>
        </Col>
        <Col span={12}>
          <ScatterToBarChart width="400px" height="400px"/>
        </Col>
        {/* 第二行 */}
        <Col span={10}>
          <PolarChart width="600px" height="700px"/>
        </Col>
        <Col span={7}>
          <BarChart width="400px" height="400px"/>  
        </Col>
        <Col span={7}>
          <RaddarChart width="400px" height="400px"/>
        </Col>
      </Row>
    </div>
  )
}
