import type {
  ChangeEvent, SyntheticEvent 
} from 'react';
import { useState } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import type { IMarvelHeroesDataTable } from 'src/pages/MaterialUI/interfaces';
import {
  getModificationsFromSimpleObjects,
  isEmptyObject 
} from 'src/pages/MaterialUI/utils';

import {
  ModalFooter,
  ModalHeader 
} from '../components';

import { MarvelHeroInfo } from './components';
import type { MarvelHeroModalProps } from './MarvelHeroModalProps';

export const MarvelHeroModal = ({
  data, isNewHero = false, onClose, onSave, open = false 
}: MarvelHeroModalProps) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  // TODO: Optimize with add translation
  const title = isNewHero ? 'Add New Hero' : 'Marvel Hero Details';

  const [ heroValues, setHeroValues ] = useState<IMarvelHeroesDataTable>(data);
  const [ isDataChanged, setIsDataChanged ] = useState(false);
 
  const handleChange = (
    event: SyntheticEvent | ChangeEvent<HTMLInputElement> | (Event & { target: { value: unknown;
      name: string } }),
  ) => {
    const target = event.target as HTMLInputElement;
    const name = target.name;
    const value = target.value;

    setHeroValues((prevValues: IMarvelHeroesDataTable) => ({
      ...prevValues,
      [name]: value,
    }));
    setIsDataChanged(true);
  };

  const handleSubmit = async () => {
    const modifiedValues = isNewHero
      ? {
        ...heroValues,
      }
      : getModificationsFromSimpleObjects(data, heroValues);

    // If no changes detected, do not proceed
    if (isEmptyObject(modifiedValues)) {
      onClose();
      return;
    }
    // TODO: Add error handling
    // TODO: new hero , validate required fields
    await onSave({
      ...modifiedValues,
      id: data?.id || null,
    });

    setIsDataChanged(false);
    onClose();
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth
      maxWidth='sm'
      open={open}
      onClose={onClose}
    >
      <ModalHeader
        onClose={onClose}
        title={title}
      />
      <DialogContent dividers>
        <MarvelHeroInfo
          data={heroValues}
          onChange={handleChange}
        />
      </DialogContent>
      <ModalFooter
        isDisabled={!isDataChanged}
        onClose={onClose}
        onSubmit={handleSubmit}
      />
    </Dialog>
  );
};
