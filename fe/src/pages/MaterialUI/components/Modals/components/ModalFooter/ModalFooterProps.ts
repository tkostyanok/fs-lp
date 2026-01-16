export interface ModalFooterProps {
  /**
   * If `true` -> disable the Save button.
   * If `false` => enable the Save button.
   * @default false
   */
  isDisabled?: boolean;
  /**
   * Callback function to close Modal component.
   */
  onClose: () => void;
  /**
   * Callback function to submit data.
   */
  onSubmit: () => void;
  /**
   * Text for the submit button.
   * @default 'Save'
   */
  submitButtonText?: string;
}