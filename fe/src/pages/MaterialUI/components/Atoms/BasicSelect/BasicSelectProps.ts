import { type SelectProps } from '@mui/material/Select';

export interface ISelectOption {
  title: string;
  value: boolean | number | string;
}

export interface BasicSelectProps<T extends object> extends Omit<SelectProps, 'label' | 'name'> {
  /**
   * If defined, show current value from options.
   */
  currentValue?: number | string | null;
  /**
   * Indicate that data is loading.
   * Show or hide skeleton.
   * @default: false
   */
  isLoading?: boolean;
  /**
   * The label content.
   */
  label: string;
  /**
   * The name of the select input.
   * Required to link with form data.
   */
  name: Extract<keyof T, string>;
  /**
   * Required data for drop-down menu.
   */
  options: ISelectOption[];
}
