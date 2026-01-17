import { Outlet } from 'react-router';

import Box from '@mui/material/Box';
import { ThemeProvider as MaterialTM } from '@mui/material/styles';

import { DashboardMenu } from 'src/pages/MaterialUI/components/Organisms';
import { MaterialUIProvider } from 'src/pages/MaterialUI/context';
import { mockData } from 'src/pages/MaterialUI/data/mockData';
import muiTheme from 'src/pages/MaterialUI/styles/mui-theme';

/**
 * @returns MaterialUI page.
 *
 * This page serves as a test page for Material-UI components.
 * It includes a layout, navigation tabs and outlet.
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
          <MaterialUIProvider initData={mockData}>
            <Outlet />
          </MaterialUIProvider>
        </Box>
      </Box>
    </MaterialTM>
  );
};
