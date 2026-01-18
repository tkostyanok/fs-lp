import type { IMarvelHeroesDataTable } from 'src/pages/MaterialUI/interfaces';

export interface MarvelHeroModalProps {
  /**
   * Data of the Marvel hero to be displayed or edited in the modal.
   */
  data: IMarvelHeroesDataTable;
  /**
   * Indicates if the modal is for creating a new hero.
   */
  isNewHero?: boolean;
  /**
   * Function to close the modal.
   */
  onClose: () => void;
  /**
   * Function to save the hero data.
   * @param dataToSave - Partial data of the Marvel hero to be saved.
   * @returns Return function or promise that resolves when the save operation is complete.
   */
  onSave: (dataToSave: Partial<IMarvelHeroesDataTable>) => Promise<void> | void;
  /**
   * Indicates if the modal is open.
   */
  open: boolean;
}
