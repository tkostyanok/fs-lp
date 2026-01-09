import {
  createContext,
  useContext
} from 'react';

import type { IMarvelHeroesData } from 'src/pages/MaterialUI/interfaces';


interface IMaterialUIContext {
  data: IMarvelHeroesData[];

}

export const MaterialUIContext = createContext<IMaterialUIContext>({
  data: [],
});

export const useMaterialUIContext = () => {
  const context = useContext(MaterialUIContext);
  if (!context) {
    throw new Error('useMaterialUIContext must be used within an MaterialUIProvider');
  }
  return context;
};
