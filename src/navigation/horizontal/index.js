import { Mail, Home, Type, Circle } from 'react-feather'

export const adminNav = [
  {
    header: 'Tickets'
  },
  {
    id: 'typography',
    title: 'ver tickets',
    icon: <Type size={12} />,
    navLink: '/dashboard/tickets'
  },
  {
    header: 'Admin'
  },
  {
    id: 'departments',
    title: 'Departamentos',
    icon: <Circle size={12} />,
    navLink: '/dashboard/departments'
  },
  {
    id: 'roles',
    title: 'Roles',
    icon: <Circle size={12} />,
    navLink: '/dashboard/roles'
  },
  {
    id: 'users',
    title: 'Usuarios',
    icon: <Circle size={12} />,
    navLink: '/dashboard/users'
  }
]
export const clientNav = [
  {
    header: 'Tickets'
  },
  {
    id: 'typography',
    title: 'ver tickets',
    icon: <Type size={12} />,
    navLink: '/dashboard/client'
  }
]

export const employeeNav = [
  {
    header: 'Tickets'
  },
  {
    id: 'typography',
    title: 'ver tickets',
    icon: <Type size={12} />,
    navLink: '/dashboard/tickets'
  }
]

export default [
  {
    header: 'Tickets'
  },
  {
    id: 'typography',
    title: 'ver tickets',
    icon: <Type size={12} />,
    navLink: '/dashboard/tickets'
  },
  {
    header: 'Admin'
  },
  {
    id: 'departments',
    title: 'Departamentos',
    icon: <Circle size={12} />,
    navLink: '/dashboard/departments'
  },
  {
    id: 'roles',
    title: 'Roles',
    icon: <Circle size={12} />,
    navLink: '/dashboard/roles'
  },
  {
    id: 'users',
    title: 'Usuarios',
    icon: <Circle size={12} />,
    navLink: '/dashboard/users'
  }
]
