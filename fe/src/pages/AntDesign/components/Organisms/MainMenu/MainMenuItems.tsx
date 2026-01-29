import { Link } from 'react-router';

import {
  AppstoreOutlined,
  HomeOutlined,
  ScheduleOutlined,
  TeamOutlined,
  UserOutlined,
  WechatOutlined,
} from '@ant-design/icons';

import { MenuItem } from './utils';

/**
 * Note: value export name 'MenuItems' is used in MainMenu.tsx.
 * 
 * Note: another variant how to export Menu items.
 *    export const MenuItems: MenuItem[] = [
 *      getItem('home', <Link to='/'>Home</Link>, <HomeOutlined />),
 *      ...
 *    ];
 * 
 * Note: do not change items order.
 * Reason: Item present in order how data should be shown in the Menu.
 */
export const MenuItems: MenuItem[] = [
  {
    key: 'home',
    label: <Link to='/'>Home</Link>,
    icon: <HomeOutlined />,
  },
  {
    type: 'divider'
  },
  {
    key: 'nutritionist',
    icon: <UserOutlined />,
    label: 'Nutritionist',
    children: [
      {
        key: 'nutritionist-dashboard',
        icon: 
          <AppstoreOutlined
            style={{
              fontWeight: 500 
            }}
          />,
        label: <Link to='/ant-design/nutritionist/dashboard'>Dashboard</Link>,
      },
      {
        key: 'nutritionist-patients',
        icon: <TeamOutlined />,
        label: <Link to='/ant-design/nutritionist/patients'>Patients</Link>,
      },
      {
        key: 'nutritionist-appointments',
        icon: <ScheduleOutlined />,
        label: <Link to='/ant-design/nutritionist/appointments'>Appointments</Link>,
      },
      {
        key: 'nutritionist-chat',
        icon: <WechatOutlined />,
        label: <Link to='/ant-design/nutritionist/chat'>Chat</Link>,
      },
      {
        key: 'nutritionist-settings',
        label: <Link to='/ant-design/nutritionist/settings'>Settings</Link>,
      },
    ],
  },
  {
    key: 'client',
    icon: <UserOutlined />,
    label: <Link to='/ant-design/client/dashboard'>Client</Link>,
  },
  {
    key: 'admin',
    label: <Link to='/ant-design/admin/dashboard'>Admin</Link>,
    icon: <TeamOutlined />,
  },
];