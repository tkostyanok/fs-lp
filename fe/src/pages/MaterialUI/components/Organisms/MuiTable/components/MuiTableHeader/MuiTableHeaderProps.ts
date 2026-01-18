import type { MouseEvent } from 'react';

import type {
  MuiTableHeaderCell, Order 
} from 'src/pages/MaterialUI/interfaces';

export interface MuiTableHeaderProps<T extends object> {
  /**
   * Set headers for columns.
   */
  headerCells: readonly MuiTableHeaderCell<T>[];
  /**
   * Callback fired when a filter icon in a header cell is clicked.
   */
  onFilterClick?: (value: boolean | ((prevState: boolean) => boolean)) => void;
  /**
   * Callback fired when close button on filter chip clicked.
   */
  onFilterDelete?: (filter: keyof T, value: string) => void;
  /**
   * Callback fired when a column header is clicked to sort the table.
   */
  onRequestSort: (event: MouseEvent<unknown>, property: keyof T) => void;
  /**
   * Current sort order ('asc' or 'desc').
   */
  order: Order;
  /**
   * The column identifier currently being sorted.
   */
  orderBy?: keyof T;
}