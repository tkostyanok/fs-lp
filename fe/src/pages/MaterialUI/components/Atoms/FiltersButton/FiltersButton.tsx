import IconButton, { type IconButtonProps } from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FilterListIcon from '@mui/icons-material/FilterList';

import type { FiltersButtonProps } from './FiltersButtonProps';

export const FiltersButton = ({
  openModal,
  ...props
}: FiltersButtonProps & IconButtonProps) => {
  const handleOpenModal = () => {
    openModal(prevState => !prevState);
  };
  
  return (
    <Tooltip title='Filters'>
      <IconButton
        aria-label='filter-heroes-btn'
        onClick={handleOpenModal}
        {...props}
      >
        <FilterListIcon color='primary' />
      </IconButton>
    </Tooltip>
  );
};
