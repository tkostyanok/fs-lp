import {
  useCallback, useMemo, useState
} from 'react';

import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';

import {
  AddNewHeroButton,
  FiltersButton
} from 'src/pages/MaterialUI/components/Atoms';
import {
  MarvelHeroesFiltersModal,
  MarvelHeroModal
} from 'src/pages/MaterialUI/components/Modals';
import { TopToolbar } from 'src/pages/MaterialUI/components/Molecules';
import { MuiTable } from 'src/pages/MaterialUI/components/Organisms/MuiTable';

import { useMaterialUIContext } from 'src/pages/MaterialUI/context';
import type { IMarvelHeroesDataTable } from 'src/pages/MaterialUI/interfaces';
import { headerCells } from './utils';

export const MuiTableDashboard = () => {
  const {
    data,
    // dataUsage,
    filters,
    filteredData,
    handleDeleteFilter,
    handleSaveDataLocal,
    // handleSaveDataRemote,
    hasFilters,
    initialMarvelHero,
    isModalOpen,
    selectedData,
    setIsModalOpen,
    setSelectedData,
  } = useMaterialUIContext();

  const [ isNewHero, setIsNewHero ] = useState(false);
  const [ openFiltersModal, setOpenFiltersModal ] = useState(false);

  const _headerCells = useMemo(() => {
    return headerCells.map((cell) => ({
      ...cell,
      filters: filters[cell.field as keyof typeof filters],
    }));
  }, [ filters ]);

  const handleAddMarvelHero = () => {
    setSelectedData(null);
    setIsNewHero(true);
    setIsModalOpen((isModalOpen) => !isModalOpen);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedData(null);
    setIsNewHero(false);
  };

  const handleRowClick = useCallback(
    (data: IMarvelHeroesDataTable) => {
      setSelectedData((prevData) => ({
        ...prevData,
        ...data,
      }));
      setIsNewHero(false);
      setIsModalOpen((isModalOpen) => !isModalOpen);
    },
    [ setSelectedData, setIsNewHero, setIsModalOpen ],
  );
  
  console.log('MuiTableDashboard openFiltersModal', openFiltersModal);
  console.log('MuiTableTab render', data, data?.length, filteredData, filteredData?.length, hasFilters);
  
  return (
    <>
      <TopToolbar>
        <Stack
          direction='row'
          spacing={1}
        >
          <AddNewHeroButton
            disabled={false} // TODO: add ->  isLoading || remote server not available
            onClick={handleAddMarvelHero}
          />
          <FiltersButton
            disabled={ !data || data?.length === 0} // TODO:add ->  isLoading
            openModal={setOpenFiltersModal}
          />
          <Divider />
        </Stack>
      </TopToolbar>
      <MuiTable<IMarvelHeroesDataTable>
        headerCells={_headerCells}
        onFilterClick={setOpenFiltersModal}
        onFilterDelete={handleDeleteFilter as (filter: keyof IMarvelHeroesDataTable, value: string) => void}
        onRowClick={handleRowClick}
        rowsData={hasFilters ? filteredData : data}
      />
      <MarvelHeroModal
        data={selectedData || initialMarvelHero}
        isNewHero={isNewHero}
        onClose={handleCloseModal}
        // onSave={dataUsage === 'local' ? handleSaveDataLocal : handleSaveDataRemote} // TODO: add data usage
        onSave={handleSaveDataLocal}
        open={isModalOpen}
      />
      <MarvelHeroesFiltersModal
        open={openFiltersModal}
        onClose={() => setOpenFiltersModal(false)}
      />
    </>
  );
};
