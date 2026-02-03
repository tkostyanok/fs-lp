import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloudIcon from '@mui/icons-material/Cloud';

import { Database } from 'lucide-react';
import { useMaterialUIContext } from 'src/pages/MaterialUI/context';

/**
 * Switcher between local and remote data usage.
 */
export const DataUsage = () => {
  const {
    dataUsage, setDataUsage 
  } = useMaterialUIContext();

  const handleChangeDataUsage = () => {
    setDataUsage(dataUsage === 'local' ? 'remote' : 'local');
  };

  
  return (
    <Button
      disableRipple
      fullWidth
      onClick={handleChangeDataUsage}
      sx={{
        justifyContent: 'left'
      }}
      startIcon={dataUsage === 'local' ? <Database /> : <CloudIcon />}

      variant='contained'
    >
      <Box
        component='span'
        sx={{
          lineHeight: '0.5rem',
          textAlign: 'left'
        }}
      >
        <p>{dataUsage}</p>
        <p
          style={{
            textTransform: 'none' 
          }}
        >Data Source
        </p>
      </Box>
    </Button>
  );
};
