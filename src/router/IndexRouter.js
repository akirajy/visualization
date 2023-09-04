import { Route, HashRouter, Routes, Navigate } from 'react-router-dom'
import Login from '../views/login/Login'
import NewsSandBox from '../views/sandbox/NewsSandBox'

export default function IndexRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login />}/>
        {/* <Route path="/" element={<NewsSandBox />}/> */}
        <Route path="/*" element={
          /* localStorage.getItem('token') ? 
          <NewsSandBox /> : 
          <Navigate to="/login" replace={true} /> */
          <NewsSandBox />
        } />
      </Routes>
    </HashRouter>
  )
}
