import type { ReactNode } from 'react';
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';

import apiMaterialUI from 'src/api/apiMaterialUI';
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
  // Save local data for session until it will not be reloaded.
  const prevLocalDataRef = useRef<string | null>(null);
  const prevDataUsageRef = useRef<DataUsage>('local');

  /** *******************************  State Variables  **************************************** */

  const [ data, setData ] = useState<IMarvelHeroesDataTable[]>([]);
  const [ dataUsage, setDataUsage ] = useState<DataUsage>('local');
  const [ filters, setFilters ] = useState<MarvelHeroFilterValues>(initialFiltersData);
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ selectedData, setSelectedData ] = useState<IMarvelHeroesDataTable | null>(null);


  /** ************************  Initialization and Effects  ************************************ */

  // Set initial data, if data usage is 'local'
  useEffect(() => {
    if (dataUsage === 'local') {
      return setData((prevData) => {
        // Check if previous data exist and it is identical to current data.
        const currentDataJson = JSON.stringify(prevData);

        if (prevLocalDataRef.current) {
          if (prevLocalDataRef.current === currentDataJson) {
            return prevData;
          } else {
            return JSON.parse(prevLocalDataRef.current);
          }
        }

        // Clear data if initData is empty
        if (!initData || initData?.length === 0) {
          return [];
        }

        // Set new data
        const tableData: IMarvelHeroesDataTable[] = initData.map((item: IMarvelHeroesData) => {
          const heroID = v4();
  
          return {
            ...item,
            id: heroID,
            canDelete: true,
            canEdit: true,
          };
        });
  
        return tableData;
      });
    }
  }, [ dataUsage, initData, prevLocalDataRef ]);

  // Set initial data if data usage id 'remote'
  useEffect(() => {
    if (dataUsage === 'remote') {
      apiMaterialUI
        .getAllHeroes()
        .then((fetchedData: Omit<IMarvelHeroesDataTable, 'canDelete' | 'canEdit'>[]) => {
          // Clear data if fetchedData is empty
          if (!fetchedData || fetchedData.length === 0) {
            setData([]);
            return;
          }

          const tableData: IMarvelHeroesDataTable[] = fetchedData.map(
            (hero: Omit<IMarvelHeroesDataTable, 'canDelete' | 'canEdit'>) => ({
              ...hero,
              canDelete: true,
              canEdit: true,
            }),
          );
          setData(tableData);
        })
        .catch((error: unknown) => {
          console.error('Error fetching remote data:', error);
          // TODO: show notification
          setData([]);
        });
    }
  }, [ dataUsage, initData ]);



  /** *********************************  Functions  ******************************************** */

  // Delete data locally
  const handleDeleteDataLocal = useCallback((dataToDelete: IMarvelHeroesDataTable) => {
    setData((prevData) => prevData.filter((item) => item.id !== dataToDelete.id));
  }, []);

  // Delete data remotely
  const handleDeleteDataRemote = useCallback(async (dataToDelete: IMarvelHeroesDataTable) => {
    await apiMaterialUI
      .deleteHero(dataToDelete.id as string)
      .then(() => {
        setData((prevData) => prevData.filter((item) => item.id !== dataToDelete.id));
      })
      .catch((error: unknown) => {
        console.error('Error deleting hero remotely:', error);
        // TODO: show notification
      });
  }, []);

  // Delete filter value
  const handleDeleteFilter = useCallback((filter: keyof MarvelHeroFilterValues, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filter]: [ ...prevFilters[filter] ].filter((item) => item !== value),
    }));
  }, []);

  const handleDeleteData = useMemo(() => {
    return  dataUsage === 'local' ? handleDeleteDataLocal : handleDeleteDataRemote;
  }, [ dataUsage, handleDeleteDataLocal, handleDeleteDataRemote ]);

  // Create or Update data locally
  const handleSaveDataLocal = useCallback(
    (dataToSave: Partial<IMarvelHeroesDataTable>) => {
      setData((prevData) => {
        const newHeroTableData: IMarvelHeroesDataTable | null =
          dataToSave?.id === null
            ? ({
              ...dataToSave,
              canDelete: true,
              canEdit: true,
              id: v4(),
            }) as IMarvelHeroesDataTable
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
    [],
  );

  // Create or Update data remotely
  const handleSaveDataRemote = useCallback(
    async (dataToSave: Partial<IMarvelHeroesDataTable>) => {
      const newORupdateHeroData: IMarvelHeroesDataTable | null =
        dataToSave.id === null
          ? await apiMaterialUI
            .createHero({
              ...dataToSave,
            } as IMarvelHeroesData)
            .then((createdHero: Omit<IMarvelHeroesDataTable, 'canDelete' | 'canEdit'>) => {
              return {
                ...createdHero,
              } as IMarvelHeroesDataTable;
            })
            .catch((error: unknown) => {
              console.error('Error creating hero remotely:', error);
              // TODO: show notification
              return null;
            })
          : await apiMaterialUI
            .updateHero(dataToSave.id as string, dataToSave)
            .then((updatedHero: Omit<IMarvelHeroesDataTable, 'canDelete' | 'canEdit'>) => {
              return {
                ...updatedHero,
              } as IMarvelHeroesDataTable;
            })
            .catch((error: unknown) => {
              console.error('Error updating hero remotely:', error);
              // TODO: show notification
              return null;
            });

      const newOrUpdateHeroTableData: IMarvelHeroesDataTable | null =
        newORupdateHeroData !== null
          ? {
            ...newORupdateHeroData,
            canDelete: true,
            canEdit: true,
          }
          : null;

      return setData((prevData) => {
        return dataToSave?.id === null
          ? newOrUpdateHeroTableData
            ? [ newOrUpdateHeroTableData, ...prevData ]
            : prevData
          : prevData.map((item) =>
            item.id === dataToSave.id
              ? {
                ...item,
                ...dataToSave,
              }
              : item,
          );
      });
    },
    [],
  );

  const handleSaveData = useMemo(() => {
    return dataUsage === 'local' ? handleSaveDataLocal : handleSaveDataRemote;
  }, [ dataUsage, handleSaveDataLocal, handleSaveDataRemote ]);

  // Filter data based on current filters
  // TODO: divide filters for local and remote 
  // TODO: filtering remote data in BE
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

  // Update DataUsageRef and reset filters
  const setDataUsageAndResetFilters = useCallback(
    (dataUsage: DataUsage) => {
      if (prevDataUsageRef.current !== dataUsage) {
        setFilters(initialFiltersData);
        prevDataUsageRef.current = dataUsage;
      }
      // Store current local data ref for the session
      if (dataUsage === 'remote') {
        prevLocalDataRef.current = JSON.stringify(data);
      }
      setDataUsage(dataUsage);
    },
    [ data, setFilters ],
  );

  console.log('CURRENT DATA', data);
  console.log('dataUsage', dataUsage);

  const contextValue = {
    data,
    dataUsage,
    filteredData,
    filters,
    handleDeleteData,
    handleDeleteFilter,
    handleSaveData,
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
