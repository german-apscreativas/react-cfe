import { Mail, Home, Type, Circle } from 'react-feather'

export const adminNav = [
  {
    header: 'Medidor'
  },
  {
    id: 'typography',
    title: 'ver Medidor1',
    icon: <Type size={12} />,
    navLink: '/dashboard/medidor'
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
    header: 'Medidor'
  },
  {
    id: 'typography',
    title: 'ver medidor2',
    icon: <Type size={12} />,
    navLink: '/dashboard/medidor'
  }
]

export const employeeNav = [
  {
    header: 'Medidor'
  },
  {
    id: 'typography',
    title: 'ver medidor 3',
    icon: <Type size={12} />,
    navLink: '/dashboard/medidor'
  }
]

export default [
  {
    header: 'Medidores'
  },
  {
    id: 'typography',
    title: 'ver medidor 4',
    icon: <Type size={12} />,
    navLink: '/dashboard/medidor'
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
