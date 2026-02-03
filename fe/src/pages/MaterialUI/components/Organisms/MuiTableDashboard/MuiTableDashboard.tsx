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
import { v4 } from 'uuid';

import { headerCells } from './utils';

export const MuiTableDashboard = () => {
  const {
    data,
    filters,
    filteredData,
    handleDeleteData,
    handleDeleteFilter,
    handleSaveData,
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
        onDelete={handleDeleteData}
        onFilterClick={setOpenFiltersModal}
        onFilterDelete={handleDeleteFilter as (filter: keyof IMarvelHeroesDataTable, value: string) => void}
        onRowClick={handleRowClick}
        rowsData={hasFilters ? filteredData : data}
      />
      <MarvelHeroModal
        data={selectedData || initialMarvelHero}
        isNewHero={isNewHero}
        // Note: use key to force remount when selectedData or isNewHero changes
        key={selectedData?.id || `new-hero-${v4()}`}
        onClose={handleCloseModal}
        onSave={handleSaveData}
        open={isModalOpen}
      />
      <MarvelHeroesFiltersModal
        open={openFiltersModal}
        onClose={() => setOpenFiltersModal(false)}
      />
    </>
  );
};
