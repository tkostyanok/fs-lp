import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { type SelectProps } from '@mui/material/Select';

import { BasicLabel } from '../BasicLabel';

import { BasicSelectLoading } from './BasicSelectLoading';
import type {
  BasicSelectProps, ISelectOption 
} from './BasicSelectProps';

/**
 * Basic select component.
 */
export const BasicSelect = <T extends object>({
  currentValue,
  isLoading = false,
  label,
  name,
  options,
  ...props
}: BasicSelectProps<T> & SelectProps) => {

  if (isLoading) {
    return (
      <BasicSelectLoading />
    );
  }

  return (
    <FormControl
      fullWidth
      size='small'
    >
      <BasicLabel label={label} />
      <Select
        fullWidth
        name={name}
        value={currentValue}
        {...props}
      >
        {options.map((option: ISelectOption) => {
          // Only render MenuItem if value is string, number, or readonly string[]
          if (
            typeof option.value === 'string' ||
            typeof option.value === 'number' ||
            (Array.isArray(option.value) && option.value.every(v => typeof v === 'string'))
          ) {
            return (
              <MenuItem
                key={`custom-basic-select-item-${option.value}`}
                value={option.value}
              >
                {option.title}
              </MenuItem>
            );
          }
          // Skip rendering for invalid value types
          return null;
        })}
      </Select>
    </FormControl>
  );
};
