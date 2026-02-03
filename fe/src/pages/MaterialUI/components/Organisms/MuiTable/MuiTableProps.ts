import type { MuiTableHeaderCell } from 'src/pages/MaterialUI/interfaces';

export interface  MuiTableProps<T extends object> {
  /**
   * Set headers for columns.
   */
  headerCells: readonly MuiTableHeaderCell<T>[];
  /**
   * Callback fired when delete button is clicked.
   */
  onDelete?: (dataToDelete: T) => void;
  /**
   * Callback fired when edit button is clicked.
   */
  onEdit?: (dataToEdit: T) => void;
  /**
   * Callback fired when a filter icon in a header cell is clicked.
   */
  onFilterClick?: (value: boolean | ((prevState: boolean) => boolean)) => void;
  /**
   * Callback fired when close button on filter chip clicked.
   */
  onFilterDelete?: (filter: keyof T, value: string) => void;
  /**
   * Callback fired when a row is clicked.
   */
  onRowClick?: (data: T) => void;
  /**
   * Set rows data.
   */
  rowsData: readonly T[];
}
