import { useRoutes, Navigate } from 'react-router-dom'
import Login from '../views/login/Login'
import NewsSandBox from '../views/sandbox/NewsSandBox'
import Home from '../views/sandbox/home/Home';
import Nopermission from '../views/sandbox/nopermission/Nopermission';

import SolarPower from '../views/sandbox/solar-power/SolarPower';

import OriginData from '../views/sandbox/wind-power/OriginData';
import Clustering from '../views/sandbox/wind-power/Clustering';
import Prediction from '../views/sandbox/wind-power/Prediction';
import Customize from '../views/sandbox/customize/Customize';

const routes = [
  {
    path: 'home',
    element: <Home />,
  },
  {
    path: 'wind-power',
    children: [
      {
        path: "origin-data",
        element: <OriginData />
      },
      {
        path: "clustering",
        element: <Clustering />
      },
      {
        path: "prediction",
        element: <Prediction />
      }
    ]
  },
  {
    path: 'solar-power',
    element: <SolarPower />,
  },
  {
    path: "customize",
    element: <Customize />
  },
  {
    path: '/',
    element: <Navigate to="/home" />,
  },
  {
    path: '*',
    element: <Nopermission />,
  },
];

export default routes
// export default function AppRoutes() {
//   return useRoutes(routes);
// }
