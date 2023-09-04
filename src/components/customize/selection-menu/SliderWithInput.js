import React, { useEffect, useState } from 'react'
import { Col, InputNumber, Row, Slider, Space } from 'antd'

export default function SliderWithInput(props) {
  const { onChangeProps, defaultValue } = props

  const [inputValue, setInputValue] = useState(defaultValue)
  const onChange = (newValue) => {
    setInputValue(newValue)
    onChangeProps(newValue)
  }

  return (
    <Row>
      <Col span={12}>
        <Slider
          min={1}
          max={20}
          onChange={onChange}
          value={typeof inputValue === 'number' ? inputValue : 0}
        />
      </Col>
      <Col span={4}>
        <InputNumber
          min={1}
          max={20}
          style={{ margin: '0 16px' }}
          value={inputValue}
          onChange={onChange}
        />
      </Col>
    </Row>
  )
}
