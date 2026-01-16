import Typography from '@mui/material/Typography';

import type { BasicLabelProps } from './BasicLabelProps';

/**
 * Basic label component.
 */
export const BasicLabel = ({ label }: BasicLabelProps) => {
  return (
    <Typography variant='subtitle2'>
      {label}
    </Typography>
  );
};
