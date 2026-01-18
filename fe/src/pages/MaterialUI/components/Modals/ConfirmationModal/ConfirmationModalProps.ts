export interface ConfirmationModalProps {
  /**
   * Message to be displayed in the confirmation modal.
   */
  message: string;
  /**
   * Function to close the modal.
   */
  onClose: () => void;
  /**
   * Function to submit the action.
   * @returns Promise that resolves when the confirm operation is complete.
   */
  onSubmit: () => void;
  /**
   * Indicates if the modal is open.
   */
  open: boolean;
  /**
   * Title of the confirmation modal.
   */
  title: string;
}