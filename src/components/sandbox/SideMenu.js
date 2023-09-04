import {
  AppstoreOutlined,
  PieChartOutlined,
  MailOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import './index.css'
import { useNavigate, useLocation } from'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
const { Sider } = Layout;

// const iconList = {
//   "/home": <HomeOutlined />,
//   "/user-manage/list": <AppstoreOutlined />,
//   "/right-manage/right/list": <PieChartOutlined />,
// }

export default function SideMenu() {
  const menu = [
    {
      "id": 1,
      "label": "首页",
      "key": "/home",
      "grade": 1,
    },
    {
      "id": 2,
      "label": "风力发电",
      "key": "/wind-power",
      "grade": 1,
      "children": [
        {
          "id": 3,
          "label": "原始数据集",
          "key": "/wind-power/origin-data",
          "grade": 2
        },
        {
          "id": 4,
          "label": "聚类",
          "key": "/wind-power/clustering",
          "grade": 2
        },
        {
          "id": 5,
          "label": "预测效果",
          "key": "/wind-power/prediction",
          "grade": 2
        },
      ]
    },
    {
      "id": 6,
      "label": "光伏发电",
      "key": "/solar-power",
      "grade": 1,
      // "children": [
      // ]
    },
    {
      "id": 7,
      "label": "自定义数据",
      "key": "/customize",
      "grade": 1,
    },
  ]

  // antd
  const [collapsed, setCollapsed] = useState(false);

  // 点击 menu, router 导航
  const navigate = useNavigate();

  const changeRouter = (props) => {
    navigate(props.key)
  }

  // 获取组件路径
  const location = useLocation();
  const selectKeys = location.pathname
  const openKeys = ["/" + location.pathname.split('/')[1]]

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div style={{display: "flex", height: "100%", "flexDirection": "column"}}>
        <div className="logo" >能源互联网可视化系统</div>
        <div style={{flex: 1, "overflow": "auto"}}>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={selectKeys}
            defaultOpenKeys={openKeys}
            items={menu}
            onClick={changeRouter}
          />
        </div>
      </div>
    </Sider>
  )
}
