import { lazy } from 'react'

// ** Document title
const TemplateTitle = '%s - Vuexy React Admin Template'

// ** Default Route
const DefaultRoute = '/login'

// ** Merge Routes
const Routes = [
  {
    path: '/dashboard/home',
    component: lazy(() => import('../../views/Home')),
    exact: true
  },
  {
    path: '/dashboard/second-page',
    component: lazy(() => import('../../views/SecondPage')),
    exact: true
  },
  {
    path: '/dashboard/tickets',
    component: lazy(() => import('../../views/dashboard/tickets')),
    exact: true
  },
  {
    path: '/dashboard/ticket-description',
    component: lazy(() => import('../../views/dashboard/tickets/TicketReview.js')),
    exact: true
  },
  {
    path: '/dashboard/departments',
    component: lazy(() => import('../../views/dashboard/department')),
    exact: true
  },
  {
    path: '/dashboard/roles',
    component: lazy(() => import('../../views/dashboard/roles')),
    exact: true
  },
  {
    path: '/dashboard/users',
    component: lazy(() => import('../../views/dashboard/user')),
    exact: true
  },
  {
    path: '/dashboard/user-detail',
    component: lazy(() => import('../../views/dashboard/user/UserDetails')),
    exact: true
  },
  {
    path: '/dashboard/client',
    component: lazy(() => import('../../views/dashboard/client')),
    exact: true
  },
  {
    path: '/dashboard/medidor',
    component: lazy(() => import('../../views/dashboard/Medidor/Medidor.js')),
    exact: true
  }
]

const RoutesPublic = [
  {
    path: '/login',
    component: lazy(() => import('../../views/Login')),
    layout: 'BlankLayout',
    exact: true
  },
  {
    path: '/signup',
    component: lazy(() => import('../../views/SignUp')),
    layout: 'BlankLayout',
    exact: true
  },
  {
    path: '/verify-code',
    component: lazy(() => import('../../views/VerifyCode')),
    layout: 'BlankLayout',
    exact: true
  }
  
]

export { DefaultRoute, TemplateTitle, Routes, RoutesPublic }
