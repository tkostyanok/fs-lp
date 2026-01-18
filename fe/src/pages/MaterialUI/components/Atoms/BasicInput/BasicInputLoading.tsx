import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

/**
 * BasicInput loading skeleton.
 */
export const BasicInputLoading = () => {
  return (
    <Box
      display='grid'
      mt={ 0.5 }
      width='100%'
    >
      <Skeleton
        height={ 14 }
        sx={{
          marginBottom: '4px' 
        }}
        variant='rounded'
        width='25%'
      />
      <Skeleton
        variant='rounded'
        height={ 40 }
        width='100%'
      />
    </Box>
  );
};
