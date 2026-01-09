import { Outlet } from 'react-router';
import { ThemeProvider as MaterialTM } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { DashboardMenu } from 'src/pages/MaterialUI/components/Organisms';

import { MaterialUIProvider } from 'src/pages/MaterialUI/context';

import muiTheme from 'src/pages/MaterialUI/styles/mui-theme';
import { mockData } from 'src/pages/MaterialUI/data/mockData';

/**
 * @returns MaterialUI page.
 *
 * This page serves as a test page for Material-UI components.
 * It includes a layout, navigation tabs and outlet.
 */

/**
 * TODO: add translations
 */

export const MaterialUI = () => {
  return (
    <MaterialTM theme={muiTheme}>
      <Box
        sx={{ 
          display: 'flex',
          width: '100%'
        }}
      >
        <DashboardMenu />
        <Box
          component='main'
          sx={{
            flexGrow: 1,
            width: '100%',
          }}
        >
          <Toolbar>
            <Typography variant='h6' noWrap component='div'>
              AppBar right
            </Typography>
          </Toolbar>
          <Divider />
          
          <MaterialUIProvider initData={mockData}>
            <Outlet />
          </MaterialUIProvider>
        </Box>
      </Box>
    </MaterialTM>
  );
};
