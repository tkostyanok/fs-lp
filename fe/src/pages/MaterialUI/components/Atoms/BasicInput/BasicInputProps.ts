import type { SxProps } from '@mui/material/styles';
import type { TextFieldProps } from '@mui/material/TextField';

export interface BasicInputProps extends Omit<TextFieldProps, 'label' | 'value'> {
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
   * The system prop that allows defining system overrides as well
   * as additional CSS styles.
   */
  sxProps?: SxProps;
  /**
   * The value of Input.
   */
  value?: string | null;
}