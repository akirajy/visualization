import React from 'react';
import { Col, Row } from 'antd';
import Scatter3dPredictionChart from '../../../components/wind-power/prediction/Scatter3dPredictionChart';

export default function Clustering() {
  return (
    <div className='wrapper'>
      <Row>
        <Col span={24}>
          <Scatter3dPredictionChart width="80%" height="100vh"/>
        </Col>
      </Row>
    </div>
  )
}
