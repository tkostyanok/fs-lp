import Autocomplete, { type AutocompleteProps } from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { BasicLabel } from '../BasicLabel';

import type { BasicAutocompleteProps } from './BasicAutocompleteProps';

export const BasicAutocomplete = <T extends string | number = string>({
  label,
  ...props
}: BasicAutocompleteProps & Omit<AutocompleteProps<T, true, true, false>, 'renderInput'>) => {
  return (
    <Box>
      <BasicLabel label={label} />
      <Autocomplete<T, true, true, false>
        multiple
        disableCloseOnSelect
        getOptionLabel={(option: T) => String(option)}
        isOptionEqualToValue={(option, value) => option === value}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder='Search'
          />
        )}
        {...props}
      />
    </Box>
  );
};
