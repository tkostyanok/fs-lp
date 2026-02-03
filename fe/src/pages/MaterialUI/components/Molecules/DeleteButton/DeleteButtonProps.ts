export interface DeleteButtonProps<T extends object> {
  /**
   * Data to be deleted.
   */
  dataToDelete: T;
  /**
   * Callback fire when Delete button clicked.
   */
  onDelete: (dataToDelete: T) => void;
}
