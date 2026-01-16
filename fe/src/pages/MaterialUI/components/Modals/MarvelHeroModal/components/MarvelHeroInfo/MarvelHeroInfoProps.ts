import type {
  ChangeEvent, SyntheticEvent 
} from 'react';

import type { IMarvelHeroesData } from 'src/pages/MaterialUI/interfaces';

export interface MarvelHeroInfoProps {
  /**
   * Data of the Marvel hero to be displayed or edited in the modal. 
   * If null, the modal is in 'create new hero' mode.
   */
  data: IMarvelHeroesData | null;
  /**
   * Indicate that data is loading.
   * @default: false
   */
  isLoading?: boolean;
  /**
   * Callback to handle changes in the form fields.
   */
  onChange: (
    event: 
      | SyntheticEvent 
      | ChangeEvent<HTMLInputElement> 
      | (Event & { target: { value: unknown;
        name: string; }; })
  ) => void;
}