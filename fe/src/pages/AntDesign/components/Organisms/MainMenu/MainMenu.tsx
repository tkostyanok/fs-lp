import { memo } from 'react';
import { Link } from 'react-router';

import { Menu } from 'antd';
import {
  AppstoreOutlined,
  HomeOutlined,
  ScheduleOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

import {
  getItem, MenuItem 
} from './utils';

export const MainMenu = memo(() => {
  /**
   * Note: do not change key orders.
   * Reason: Keys present in order how data should be shown in the Menu.
   * 
   * Note: another variant how to create Menu items shown in MainMenuItems.
   */
  const MENU_ITEMS: MenuItem[] = [
    getItem('home', <Link to='/'>Home</Link>, <HomeOutlined />),
    getItem('nutritionist', 'Nutritionist', <UserOutlined />, [
      getItem('nutritionist-dashboard', <Link to='/ant-design/nutritionist/dashboard'>Dashboard</Link>, 
        <AppstoreOutlined
          style={{
            fontWeight: 500 
          }}
        />
      ),
      getItem('nutritionist-patients', <Link to='/ant-design/nutritionist/patients'>Patients</Link>, <TeamOutlined />),
      getItem('nutritionist-appointments', <Link to='/ant-design/nutritionist/appointments'>Appointments</Link>, <ScheduleOutlined />),
      getItem('nutritionist-chat', <Link to='/ant-design/nutritionist/chat'>Chat</Link>),
      getItem('nutritionist-settings', <Link to='/ant-design/nutritionist/settings'>Settings</Link>),
    ]),
    getItem('client', <Link to='/ant-design/client/dashboard'>Client</Link>, <UserOutlined />),
    getItem('admin', <Link to='/ant-design/admin/dashboard'>Admin</Link>, <TeamOutlined />),
  ];

  return (
    <Menu 
      defaultSelectedKeys={[ 'nutritionist-dashboard' ]}
      defaultOpenKeys={[ 'nutritionist' ]}
      items={MENU_ITEMS}
      mode='inline'
      style={{
        fontWeight: 500,
      }}
    />
  );
});

