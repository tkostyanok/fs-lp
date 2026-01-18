import type {
  IMarvelHeroesDataTable,
  MuiTableHeaderCell
} from 'src/pages/MaterialUI/interfaces';

export const headerCells: MuiTableHeaderCell<IMarvelHeroesDataTable>[] = [
  {
    field: 'name',
    headerName: 'Name',
    width: 130,
  },
  {
    field: 'gender',
    headerName: 'Gender',
    width: 90,
  },
  {
    field: 'citizenship',
    headerName: 'Citizenship',
    width: 180,
  },
  {
    field: 'skills',
    headerName: 'Skills',
    width: 170,
  },
  {
    field: 'occupation',
    headerName: 'Occupation',
    width: 120,
  },
  {
    field: 'memberOf',
    headerName: 'Member of',
    width: 150,
  },
  {
    field: 'creator',
    headerName: 'Creator',
    width: 140,
  },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 50,
  },
];
