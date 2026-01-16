import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';

import { GREY_600 } from 'src/pages/MaterialUI/constants/colors';

import type { ModalHeaderProps } from './ModalHeaderProps';

export const ModalHeader = ({
  onClose,
  subtitle,
  title
}: ModalHeaderProps) => {
  return (
    <DialogTitle
      sx={ { 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      } }
      id={ title }
    >
      <Box>
        <Typography variant='h6'>
          {title}
        </Typography>
        {subtitle
          ? (
            <Typography
              sx={ {
                color: GREY_600 
              } }
              variant='body1'
            >
              {subtitle}
            </Typography>
          )
          : null}
      </Box>
      {onClose
        ? (
          <Button
            aria-label='modal-dialog-close'
            onClick={ onClose }
            sx={ {
              zIndex: 100,
              color: GREY_600,
              minWidth: 6,
            } }
            variant='text'
          >
            <CloseIcon />
          </Button>
        )
        : null}
    </DialogTitle>
  );
};
