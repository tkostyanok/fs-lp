import type { ReactNode } from 'react';
import {
  useEffect,
  useState,
} from 'react';

import type { IMarvelHeroesData } from 'src/pages/MaterialUI/interfaces';

import { MaterialUIContext } from './MaterialUIContext';

interface IMaterialUIProviderProps {
  children?: ReactNode;
  initData?: IMarvelHeroesData[];
}

export const MaterialUIProvider = ({
  children, initData 
}: IMaterialUIProviderProps) => {
  /** *******************************  State Variables  **************************************** */

  const [ data, setData ] = useState<IMarvelHeroesData[]>([]);

  /** *********************************  Functions  ******************************************** */

  /** ************************  Initialization and Effects  ************************************ */

  // Set initial data
  useEffect(() => {
    return setData((prevData) => {
      return JSON.stringify(prevData) === JSON.stringify(initData)
         ? prevData 
         : (initData || []);

    });
  }, [ initData ]);


  console.log('CURRENT DATA', data);

  const contextValue = {
    data
  };

  return <MaterialUIContext.Provider value={contextValue}>
    {children}
    </MaterialUIContext.Provider>;
};
