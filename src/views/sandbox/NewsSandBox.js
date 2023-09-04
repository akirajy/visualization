import React from 'react'
import SideMenu from '../../components/sandbox/SideMenu'
import TopHeader from '../../components/sandbox/TopHeader'
import { Routes, Route, Navigate, useRoutes } from 'react-router-dom'
import Home from './home/Home'
import Nopermission from './nopermission/Nopermission'

// css
import './NewsSandBox.css'

// antd
import { Layout, theme } from 'antd'

// router
import routes from '../../router/routes'

const { Content } = Layout


export default function NewsSandBox() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const routing = useRoutes(routes)
  console.log(routing)
  
  return (
    <Layout>
      <SideMenu collapsible></SideMenu>
      <Layout className="site-layout">
        <TopHeader></TopHeader>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {routing}
          {/* <Routes>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/user-manage/list" element={<UserList />}></Route>
            <Route path="/right-manage/role/list" element={<RoleList />}></Route>
            <Route path="/right-manage/right/list" element={<RightList />}></Route>
            <Route path="/" element={<Navigate to="/home" replace/>}></Route>
            <Route path="*" element={<Nopermission />}></Route>
          </Routes> */}
        </Content>
      </Layout>
    </Layout>
  )
}
