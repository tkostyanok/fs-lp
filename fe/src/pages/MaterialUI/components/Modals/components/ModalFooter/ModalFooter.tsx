import Button, { type ButtonProps } from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';

import type { ModalFooterProps } from './ModalFooterProps';

export const ModalFooter = ({
  isDisabled = false,
  onClose,
  onSubmit,
  submitButtonText = 'Save',
  ...props
}: ModalFooterProps & ButtonProps) => {
  return (
    <DialogActions>
      <Button
        color='primary'
        disabled={ isDisabled }
        onClick={ onSubmit }
        size='small'
        type='submit'
        variant='contained'
        {...props}
      >
        {submitButtonText}
      </Button>
      <Button
        color='error'
        onClick={ onClose }
        size='small'
        variant='text'
      >
        Cancel
      </Button>
    </DialogActions>
  );
};
