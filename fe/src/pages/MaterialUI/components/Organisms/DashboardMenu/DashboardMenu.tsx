import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ChatIcon from '@mui/icons-material/Chat';
import HomeIcon from '@mui/icons-material/Home';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import TableRowsIcon from '@mui/icons-material/TableRows';

import { MenuListItem } from 'src/pages/MaterialUI/components/Molecules/MenuListItem';
import { PRIMARY_BACKGROUND_COLOR } from 'src/pages/MaterialUI//constants/colors';

const DRAWER_WIDTH = 200;

export const DashboardMenu = () => {
  return (
    <Drawer
      variant='permanent'
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { 
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          backgroundColor: PRIMARY_BACKGROUND_COLOR
        },
      }}
    >
      <Box 
        sx={{
          backgroundColor: PRIMARY_BACKGROUND_COLOR,
          overflow: 'auto'
        }}
      >
        <List>
          <MenuListItem
            Icon={<HomeIcon color='primary' />}
            text='Home'
            to='/'
          />
        </List>
        <Divider />
        <List>
          <MenuListItem
            Icon={<TableRowsIcon color='primary' />}
            text='Table'
            to='/material-ui/table'
          />
          <MenuListItem
            Icon={<SpaceDashboardIcon color='primary' />}
            text='List of cards'
            to='/material-ui/cards'
          />
        </List>
        <Divider />
        <List>
          <MenuListItem
            Icon={<StickyNote2Icon color='primary' />}
            text='Notes'
            to='/material-ui/notes'
          />
          <MenuListItem
            Icon={<CalendarMonthIcon color='primary' />}
            text='Calendar'
            to='/material-ui/calendar'
          />
          <MenuListItem
            Icon={<ChatIcon color='primary' />}
            text='Chat'
            to='/material-ui/chat'
          />
        </List>
      </Box>
    </Drawer>

  );
};
