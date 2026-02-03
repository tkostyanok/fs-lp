import type {
  Dispatch, SetStateAction 
} from 'react';
import {
  createContext,
  useContext
} from 'react';

import type { 
  DataUsage,
  IMarvelHeroesDataTable,
  MarvelHeroFilterValues
} from 'src/pages/MaterialUI/interfaces';

import {
  initialFiltersData,
  initialMarvelHero 
} from './utils';

interface IMaterialUIContext {
  data: IMarvelHeroesDataTable[];
  dataUsage: DataUsage;
  filteredData: IMarvelHeroesDataTable[];
  filters: MarvelHeroFilterValues;
  /**
   * Function calls to delete data.
   * @param dataToDelete 
   * @returns 
   */
  handleDeleteData: (dataToDelete: IMarvelHeroesDataTable) => void | Promise<void>;
  handleDeleteFilter: (filter: keyof MarvelHeroFilterValues, value: string) => void;
  /**
   * Function calls to save data.
   */
  handleSaveData: (dataToSave: Partial<IMarvelHeroesDataTable>) => void | Promise<void>;
  hasFilters: boolean;
  initialFiltersData: MarvelHeroFilterValues;
  initialMarvelHero: IMarvelHeroesDataTable;
  isModalOpen: boolean;
  selectedData: IMarvelHeroesDataTable | null;
  setDataUsage: (dataUsage: DataUsage) => void;
  setFilters: Dispatch<SetStateAction<MarvelHeroFilterValues>>;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedData: Dispatch<SetStateAction<IMarvelHeroesDataTable | null>>;
}

export const MaterialUIContext = createContext<IMaterialUIContext>({
  data: [],
  dataUsage: 'local',
  filteredData: [],
  filters: initialFiltersData,
  handleDeleteData: () => {},
  handleDeleteFilter: () => {},
  handleSaveData: () => {},
  hasFilters: false,
  initialFiltersData,
  initialMarvelHero,
  isModalOpen: false,
  selectedData: null,
  setDataUsage: () => {},
  setFilters: () => {},
  setIsModalOpen: () => {},
  setSelectedData: () => {},
});

export const useMaterialUIContext = () => {
  const context = useContext(MaterialUIContext);
  if (!context) {
    throw new Error('useMaterialUIContext must be used within an MaterialUIProvider');
  }
  return context;
};
