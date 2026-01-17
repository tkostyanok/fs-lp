import type { ReactNode } from 'react';
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState 
} from 'react';

import { DeleteHeroButton } from 'src/pages/MaterialUI/components';
import type { 
  DataUsage,
  Gender,
  IMarvelHeroesData,
  IMarvelHeroesDataTable,
  MarvelHeroFilterValues
} from 'src/pages/MaterialUI/interfaces';
import { ensureStringArray } from 'src/pages/MaterialUI/utils';
import { v4 } from 'uuid';

import { MaterialUIContext } from './MaterialUIContext';
import {
  initialFiltersData,
  initialMarvelHero 
} from './utils';

interface IMaterialUIProviderProps {
  children?: ReactNode;
  initData?: IMarvelHeroesData[];
}

export const MaterialUIProvider = ({
  children, initData 
}: IMaterialUIProviderProps) => {
  const prevInitDataRef = useRef<string | null>(null);
  const prevDataUsageRef = useRef<DataUsage>('local');

  /** *******************************  State Variables  **************************************** */

  const [ data, setData ] = useState<IMarvelHeroesDataTable[]>([]);
  const [ dataUsage, setDataUsage ] = useState<DataUsage>('local');
  const [ filters, setFilters ] = useState<MarvelHeroFilterValues>(initialFiltersData);
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ selectedData, setSelectedData ] = useState<IMarvelHeroesDataTable | null>(null);


  /** *********************************  Functions  ******************************************** */

  // Delete data locally
  const handleDeleteDataLocal = useCallback((dataToDelete: IMarvelHeroesDataTable) => {
    setData((prevData) => prevData.filter((item) => item.id !== dataToDelete.id));
  }, []);

  // Delete data remotely

  // Delete filter value
  const handleDeleteFilter = useCallback((filter: keyof MarvelHeroFilterValues, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filter]: [ ...prevFilters[filter] ].filter((item) => item !== value),
    }));
  }, []);

  // Create or Update data locally
  const handleSaveDataLocal = useCallback(
    (dataToSave: Partial<IMarvelHeroesDataTable>) => {
      setData((prevData) => {
        const newHeroData: IMarvelHeroesDataTable | null =
          dataToSave.id === null
            ? ({
              ...dataToSave,
              actions: null,
              id: v4(),
            } as IMarvelHeroesDataTable)
            : null;

        const newHeroTableData: IMarvelHeroesDataTable | null =
          newHeroData !== null
            ? {
              ...newHeroData,
              actions: (
                <DeleteHeroButton
                  dataToDelete={newHeroData}
                  onDelete={() => handleDeleteDataLocal(newHeroData)}
                />
              ),
            }
            : null;

        if (newHeroTableData !== null) {
          return [ newHeroTableData, ...prevData ];
        }

        return prevData.map((item) =>
          item.id === dataToSave.id
            ? {
              ...item,
              ...dataToSave,
            }
            : item,
        );
      });
    },
    [ handleDeleteDataLocal ],
  );

  // Create or Update data remotely
  const handleSaveDataRemote = async () => {
    console.log('Some code will be implemented here for remote data saving');
  };

  // Filter data based on current filters
  const {
    filteredData,
    hasFilters 
  } = useMemo(() => {
    let _filteredData = data;
    let _hasFilters = false;

    // filter by name
    if (filters?.name && ensureStringArray(filters.name).length !== 0) {
      const selectedNames = ensureStringArray(filters.name);
      _filteredData = _filteredData.filter((item) => selectedNames.includes(item.name as string));
      _hasFilters = true;
    }

    // filter by gender
    if (filters?.gender && ensureStringArray(filters.gender).length !== 0) {
      const selectedGenders = ensureStringArray(filters.gender) as unknown as Gender[];
      _filteredData = _filteredData.filter((item) => selectedGenders.includes(item.gender as Gender));
      _hasFilters = true;
    }

    return {
      filteredData: _hasFilters ? _filteredData : [],
      hasFilters: _hasFilters,
    };
  }, [ data, filters ]);

  // Set Data Usage change effect and reset filters
  const setDataUsageAndResetFilters = useCallback(
    (dataUsage: DataUsage) => {
      if (prevDataUsageRef.current !== dataUsage) {
        setFilters(initialFiltersData);
        prevDataUsageRef.current = dataUsage;
      }
      setDataUsage(dataUsage);
    },
    [ setFilters ],
  );

  /** ************************  Initialization and Effects  ************************************ */

  // Set initial data, if data usage is 'local'
  useEffect(() => {
    if (dataUsage === 'local') {
      console.log('Setting initial local data:', initData);
      return setData((prevData) => {
        // Skip if current data identical to previous data
        const currentDataJson = JSON.stringify(initData ?? []);
        if (prevInitDataRef.current === currentDataJson) return prevData;

        // Update ref
        prevInitDataRef.current = currentDataJson;

        // Clear data if initData is empty
        if (!initData || initData?.length === 0) {
          return prevData.length !== initData?.length ? [] : prevData;
        }

        // Set new data
        return initData.map((item: IMarvelHeroesData) => {
          const hero = {
            ...item,
            actions: null,
            id: v4(), // Ensure unique IDs,
          };
          return {
            ...hero,
            actions: (
              <DeleteHeroButton
                dataToDelete={hero}
                id={`${hero.id}-delete-button`}
                onDelete={() => handleDeleteDataLocal(hero)}
              />
            ),
          };
        });
      });
    }
  }, [ dataUsage, initData, handleDeleteDataLocal ]);

  // Set initial data if data usage id 'remote'

  console.log('CURRENT DATA', data);

  const contextValue = {
    data,
    dataUsage,
    filteredData,
    filters,
    handleDeleteFilter,
    handleSaveDataLocal,
    handleSaveDataRemote,
    hasFilters,
    initialFiltersData,
    initialMarvelHero,
    isModalOpen,
    selectedData,
    setDataUsage: setDataUsageAndResetFilters,
    setFilters,
    setIsModalOpen,
    setSelectedData,
  };

  return (
    <MaterialUIContext.Provider value={contextValue}>
      {children}
    </MaterialUIContext.Provider>
  );
};
