import { memo } from 'react';

import { Menu } from 'antd';

import { MenuItems } from './MainMenuItems';
import { MAIN_MENU_STYLES } from './MainMenuStyles';

export const MainMenu = memo(() => {
  return (
    <Menu 
      defaultSelectedKeys={[ 'nutritionist-dashboard' ]}
      defaultOpenKeys={[ 'nutritionist' ]}
      items={MenuItems}
      mode='inline'
      style={MAIN_MENU_STYLES.menu}
    />
  );
});

/**
 * Note: another variant how to create Menu items.
 * Note: 'divider' is not implemented.
 * 
 * Note: do not change key orders.
 * Reason: Keys present in order how data should be shown in the Menu.
 */
/*
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
      getItem('nutritionist-chat', <Link to='/ant-design/nutritionist/chat'>Chat</Link>, <WechatOutlined />),
      getItem('nutritionist-settings', <Link to='/ant-design/nutritionist/settings'>Settings</Link>),
    ]),
    getItem('client', <Link to='/ant-design/client/dashboard'>Client</Link>, <UserOutlined />),
    getItem('admin', <Link to='/ant-design/admin/dashboard'>Admin</Link>, <TeamOutlined />),
  ];
*/
