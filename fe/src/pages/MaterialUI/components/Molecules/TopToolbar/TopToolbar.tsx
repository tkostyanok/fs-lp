import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { PRIMARY_BACKGROUND_COLOR } from 'src/pages/MaterialUI/constants/colors';

import type { TopToolbarProps } from './TopToolbarProps';

export const TopToolbar = ({ 
  children,
  title = ''
}: TopToolbarProps) => {
  return (
    <Toolbar
      sx={{
        backgroundColor: PRIMARY_BACKGROUND_COLOR,
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <div>
        {title !== ''  ? (
          <Typography
            color='inherit'
            component='div'
            sx={{
              flex: '1 1 100%' 
            }}
            variant='subtitle1'
          >
            {title} 
          </Typography>
        ) : (
          null
        )}
      </div>
      
      <div>
        {children}
      </div>
    </Toolbar>
  );
};
