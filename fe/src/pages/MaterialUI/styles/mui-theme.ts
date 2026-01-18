import { createTheme } from '@mui/material/styles';

import {
  PRIMARY_COLOR, SECONDARY_COLOR, WHITE 
} from 'src/pages/MaterialUI/constants/colors';

const muiTheme = createTheme({
  palette: {
    primary: {
      main: PRIMARY_COLOR,
      contrastText: WHITE,
    },
    secondary: {
      main: SECONDARY_COLOR,
      contrastText: WHITE,
    },
  },
  components: {
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: '16px 24px', 
        }, 
      }, 
    }, 
  },
});

export default muiTheme;
