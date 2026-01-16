import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { BasicLabel } from '../BasicLabel';

import { BasicInputLoading } from './BasicInputLoading';
import type { BasicInputProps } from './BasicInputProps';

/**
 * Basic input component.
 */
export const BasicInput = ({
  isLoading = false,
  label,
  sxProps,
  value,
  ...props
}: BasicInputProps) => {

  if (isLoading) {
    return (
      <BasicInputLoading />
    );
  }

  return (
    <Box>
      <BasicLabel label={ label } />
      <TextField
        fullWidth
        size='small'
        sx={{
          ...sxProps, 
        }}
        type='text'
        value={ value === null ? '' : value }
        variant='outlined'
        { ...props }
      />
    </Box>
  );
};
