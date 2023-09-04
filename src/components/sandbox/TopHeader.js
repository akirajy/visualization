import React, { useState } from 'react'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DownOutlined,
  SmileOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Dropdown, Layout, theme, Space, Avatar } from 'antd'
const { Header } = Layout

export default function TopHeader() {
  const [collapsed, setCollapsed] = useState(false)
  const changeCollapsed = () => {
    setCollapsed(!collapsed)
  }

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const items = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          1st menu item
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          2nd menu item (disabled)
        </a>
      ),
      icon: <SmileOutlined />,
      disabled: true,
    },
    {
      key: '3',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
          3rd menu item (disabled)
        </a>
      ),
      disabled: true,
    },
    {
      key: '4',
      danger: true,
      label: 'a danger item',
    },
  ];

  return (
    <Header style={{ padding: '16px', background: colorBgContainer }}>
      {/* {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: () => setCollapsed(!collapsed),
      })} */}
      {
        collapsed ? <MenuUnfoldOutlined onClick={changeCollapsed}/> : <MenuFoldOutlined  onClick={changeCollapsed}/> 
      }

      <div style={{float: 'right'}}>
        <span>欢迎admin回来</span>
        <Dropdown menu={{items}}>
          <Avatar size="large" icon={<UserOutlined />} />
        </Dropdown>
      </div>
    </Header>
  )
}
