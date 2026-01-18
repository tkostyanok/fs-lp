import type { TableCellProps } from '@mui/material/TableCell';

export interface MuiTableHeaderCell<T extends object> {
  // TODO: Check if I need `align` property?
  /**
   * Align cell content.
   * Possible values: 'center' | 'left' | 'right' | 'justify' | 'inherit'
   */
  align?: Pick<TableCellProps, 'align'>['align'];
  /**
   * The unique identifier of the column.
   */
  field: Extract<keyof T, string>;
  /**
   * The filter values applied to this column.
   */
  filters?: Set<string> | string[] | [];
  /**
   * The title displayed in the column header cell.
   */
  headerName: string;
  /**
   * The width of the column in pixels.
   */
  width?: number;
}
