import type { SyntheticEvent } from 'react';
import {
  useEffect, useMemo, useState 
} from 'react';

import{ type AutocompleteChangeReason } from '@mui/material/Autocomplete';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { BasicAutocomplete } from 'src/pages/MaterialUI/components/Atoms';
import { useMaterialUIContext } from 'src/pages/MaterialUI/context';
import type {
  Gender,
  IMarvelHeroesData,
  MarvelHeroFilterValues 
} from 'src/pages/MaterialUI/interfaces';
import { isEmptyObject } from 'src/pages/MaterialUI/utils';

import {
  ModalFooter, ModalHeader 
} from '../components';

import type { MarvelHeroesFiltersModalProps } from './MarvelHeroesFiltersModalProps';

export const MarvelHeroesFiltersModal = ({
  onClose, open = false 
}: MarvelHeroesFiltersModalProps) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const {
    data,
    filters,
    initialFiltersData,
    setFilters 
  } = useMaterialUIContext();

  const [ isDataChanged, setIsDataChanged ] = useState(false);
  const [ autocompleteFilters, setAutocompleteFilters ] = useState<MarvelHeroFilterValues>(filters || initialFiltersData);

  // TODO: Optimize with add translation
  const LABELS: {[key in keyof IMarvelHeroesData]: string } = {
    name: 'Name',
    gender: 'Gender',
    citizenship: 'Citizenship',
    id: 'ID',
    skills: 'Skills',
    occupation: 'Occupation',
    memberOf: 'Member of',
    creator: 'Creator',
  } as const;

  const heroesFilterValues = useMemo(() => {
    if (!isEmptyObject(data)) {
      const names =
        data
          ?.map((item) => item.name)
          .filter((v): v is string => !!v)
          .sort() ?? [];
      const genders = data?.map((item) => item.gender).filter((v): v is Gender => !!v) ?? [];

      return {
        ...initialFiltersData,
        name: [ ...new Set(names) ],
        gender: [ ...new Set(genders) ],
      };
    }

    return {
      ...initialFiltersData,
    };
  }, [ data, initialFiltersData ]);

  useEffect(() => {
    setAutocompleteFilters(filters);
  }, [ filters ]);

  const handleChange = (
    _event: SyntheticEvent<Element, Event>,
    value: (string | number)[],
    _reason: AutocompleteChangeReason,
    field: string,
  ) => {
    setAutocompleteFilters((prevValues: MarvelHeroFilterValues) => ({
      ...prevValues,
      [field]: value as (string | number)[],
    }));

    setIsDataChanged(true);
  };

  const handleClose = () => {
    setAutocompleteFilters(filters);
    setIsDataChanged(false);
    onClose();
  };

  const handleSubmit = async () => {
    setFilters(autocompleteFilters);
    handleClose();
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth
      maxWidth='sm'
      open={open}
      onClose={handleClose}
    >
      <ModalHeader
        onClose={handleClose}
        title='Marvel Heroes Filters'
      />
      <DialogContent dividers>
        <Grid
          container
          spacing={2}
        >
          {([ 'name', 'gender' ] as const).map((item) => (
            <Grid
              key={`filters-${item}`}
              size={12}
            >
              <BasicAutocomplete
                disabled={heroesFilterValues[item].length === 0}
                id={`basic-autocomplete-${item}`}
                label={LABELS[item]}
                onChange={(event, value, reason) => handleChange(event, value, reason, `${item}`)}
                options={[ ...heroesFilterValues[item] ] as string[]}
                size='small'
                value={[ ...autocompleteFilters[`${item}`] ]}
              />
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <ModalFooter
        isDisabled={!isDataChanged}
        onClose={handleClose}
        onSubmit={handleSubmit}
        submitButtonText='Apply'
      />
    </Dialog>
  );
};
