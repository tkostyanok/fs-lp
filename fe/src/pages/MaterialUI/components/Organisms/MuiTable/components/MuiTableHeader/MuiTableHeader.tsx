import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

import {
  PRIMARY_BACKGROUND_COLOR, 
  PRIMARY_COLOR
} from 'src/pages/MaterialUI/constants/colors';
import { ensureStringArray } from 'src/pages/MaterialUI/utils';

import type { MuiTableHeaderProps } from './MuiTableHeaderProps';

export const MuiTableHeader = <T extends object>({
  headerCells,
  onFilterClick,
  onFilterDelete,
  onRequestSort,
  order,
  orderBy,
}: MuiTableHeaderProps<T>) => {
  const createSortHandler = (property: keyof T) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  const hasFilters = headerCells.some((cell) => ensureStringArray(cell?.filters).length > 0) || false;

  return (
    <TableHead>
      <TableRow
        sx={{
          backgroundColor: PRIMARY_BACKGROUND_COLOR,
          borderBottom: `2px solid ${PRIMARY_COLOR}`,
          borderTop: `2px solid ${PRIMARY_COLOR}`,
        }}
      >
        {headerCells.map((headerCell) => (
          <TableCell
            key={headerCell.field}
            align={headerCell?.align || 'inherit'}
            sortDirection={orderBy === headerCell.field ? order : false}
            sx={{
              maxWidth: headerCell?.width ? `${headerCell.width}px` : 'none',
              padding: '16px 10px',
              width: headerCell?.width ? `${headerCell.width}px` : 'auto',
            }}
          >
            {headerCell.headerName}
            {headerCell?.field !== 'actions' ? (
              <TableSortLabel
                active={orderBy === headerCell.field}
                direction={orderBy === headerCell.field ? order : 'asc'}
                onClick={createSortHandler(headerCell.field)}
              />
            ) : null}
            {headerCell?.filters && ensureStringArray(headerCell?.filters).length > 0 ? (
              <Badge
                badgeContent={[ ...headerCell.filters ].length}
                color='primary'
                onClick={() => onFilterClick?.((prevState) => !prevState)}
              >
                <FilterAltIcon
                  color='primary'
                  fontSize='small'
                />
              </Badge>
            ) : null}
          </TableCell>
        ))}
      </TableRow>
      {hasFilters ? (
        <TableRow>
          {headerCells.map((headerCell) => (
            <TableCell
              key={`${headerCell.field}-filters`}
              align={headerCell?.align || 'inherit'}
              sx={{
                maxWidth: headerCell?.width ? `${headerCell.width}px` : 'none',
                padding: '6px 10px',
                width: headerCell?.width ? `${headerCell.width}px` : 'auto',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '4px',
                  height: '40px',
                  overflowY: 'auto',
                }}
              >
                {headerCell?.filters && ensureStringArray(headerCell?.filters).length > 0
                  ? [ ...headerCell.filters ].map((filter) => (
                    <Chip
                      key={`${headerCell.field}-filter-${filter}`}
                      label={filter}
                      size='small'
                      variant='outlined'
                      onDelete={
                        onFilterDelete ? () => onFilterDelete(headerCell.field as keyof T, filter) : undefined
                      }
                    />
                  ))
                  : null}
              </Box>
            </TableCell>
          ))}
        </TableRow>
      ) : null}
    </TableHead>
  );
};
