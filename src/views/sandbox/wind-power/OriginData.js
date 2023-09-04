import React from 'react';
import { Col, Row } from 'antd';
import Calendar from '../../../components/wind-power/origin-data/Calendar';

export default function OriginData() {
  return (
    <div>
      <Row>
        <Col span={24}>
          <Calendar width="80%" height="600px"/>
        </Col>
      </Row>
    </div>
  )
}
