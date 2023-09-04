import { Button, Form, Input, message } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import './Login.css'

export default function Login() {
  const navigate = useNavigate()

  const onFinish = (values) => {
    if (values.username === 'admin' && values.password === '123456') {
      if (!localStorage.getItem('token')) {
        localStorage.setItem('token', JSON.stringify(values))
      }
      if (localStorage.getItem('token')) {
        console.log('已更新');
        navigate("/home")
      }
    } else {
      message.error("用户名或密码不匹配")
    }
  }

  return (
    <div style={{background: 'rgba(35,39,65)', height: "100%"}}>
      <div className='form-container'>
        <div className='login-title'>能源互联网可视化系统</div>
        <Form
          name="normal_login"
          className="login-form"
          onFinish={onFinish}
        >
          <Form.Item
            style={{padding: '0 20px 0 20px'}}
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            style={{padding: '0 20px 0 20px'}}
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
