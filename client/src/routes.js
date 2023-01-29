import { RouteNames } from './utils/consts'

import Admin from './pages/Admin'
import Auth from './pages/Auth'
import Basket from './pages/Basket'
import DevicePage from './pages/DevicePage'
import Shop from './pages/Shop'

export const authRoutes = [
  {
    path: RouteNames.ADMIN_ROUTE,
    element: Admin,
  },
  {
    path: RouteNames.BASKET_ROUTE,
    element: Basket,
  },
]

export const publicRoutes = [
  {
    path: RouteNames.SHOP_ROUTE,
    element: Shop,
  },
  {
    path: RouteNames.LOGIN_ROUTE,
    element: Auth,
  },
  {
    path: RouteNames.REGISTRATION_ROUTE,
    element: Auth,
  },
  {
    path: RouteNames.DEVICE_ROUTE + '/:id',
    element: DevicePage,
  },
  {
    path: RouteNames.REDIRECT_ROUTE,
    element: Shop,
  },
]