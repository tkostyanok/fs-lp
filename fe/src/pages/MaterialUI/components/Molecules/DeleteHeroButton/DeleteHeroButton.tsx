import { useState } from 'react';

import IconButton, { type IconButtonProps } from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';

import { ConfirmationModal } from 'src/pages/MaterialUI/components/Modals';

import type { DeleteHeroButtonProps } from './DeleteHeroButtonProps';

export const DeleteHeroButton = ({
  dataToDelete,
  onDelete,
  ...props
}: DeleteHeroButtonProps & IconButtonProps) => {
  const [ openConfirmationModal, setOpenConfirmationModal ] = useState(false);
  
  const handleOpenConfirmationModal = () => {
    setOpenConfirmationModal(prevState => !prevState);
  };

  const handleDelete = () => {
    onDelete(dataToDelete);
    handleOpenConfirmationModal();
  };
  
  return (
    <>
      <Tooltip title='Delete hero'>
        <IconButton
          onClick={handleOpenConfirmationModal}
          {...props}
        >
          <DeleteIcon color='primary' fontSize='small' />
        </IconButton>
      </Tooltip>
      <ConfirmationModal
        open={openConfirmationModal}
        title='Delete Hero'
        message='Are you sure you want to delete this hero? This action cannot be undone.'
        onClose={handleOpenConfirmationModal}
        onSubmit={handleDelete}
      />
    </>
  );
};
