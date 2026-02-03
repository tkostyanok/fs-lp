import type {
  MouseEvent, SyntheticEvent 
} from 'react';
import {
  useCallback, useMemo, useState 
} from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import { DeleteButton } from 'src/pages/MaterialUI/components/Molecules';
import {
  GREY_50, GREY_200, GREY_600 
} from 'src/pages/MaterialUI/constants/colors';
import type { Order } from 'src/pages/MaterialUI/interfaces';

import { MuiTableHeader } from './components';
import type { MuiTableProps } from './MuiTableProps';
import { getComparator } from './utils';

/**
 * MuiTable displays a `MUI Table` component.
 */
export const MuiTable = <T extends object>({
  headerCells,
  onDelete,
  onFilterClick,
  onFilterDelete,
  onRowClick,
  rowsData,
}: MuiTableProps<T>) => {
  const [ order, setOrder ] = useState<Order>('asc');
  const [ orderBy, setOrderBy ] = useState<keyof T | undefined>(undefined);
  const [ page, setPage ] = useState(0);
  const [ rowsPerPage, setRowsPerPage ] = useState(10);

  const headerCellsMap = useMemo(
    () => headerCells.map((cell) => cell.field),
    [ headerCells ],
  );
  
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (
    _event: MouseEvent<unknown>,
    property: keyof T,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleRowClick = useCallback(
    (row: T) => (event: SyntheticEvent) => {
      const target = event.target as HTMLElement;

      if (target.closest('button') || target.closest('a')) return;
      
      onRowClick?.(row);
    },
    [ onRowClick ],
  );

  
  //  Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rowsData.length) : 0;

  // Memoized visible rows data based on current page and rows per page.
  const visibleRowsData = useMemo(
    () =>
      [ ...rowsData ]
        .sort(orderBy ? getComparator<T>(order, orderBy) : undefined)
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [ order, orderBy, page, rowsPerPage, rowsData ],
  );

  return (
    <Box
      sx={{
        width: '100%' 
      }}
    >
      <Paper 
        sx={{ 
          borderBottom: `1px solid ${GREY_600} !important`,
          mb: 2,
          width: '100%',
        }}
      >
        <TableContainer>
          <Table
            aria-labelledby='mui-table'
          >
            <MuiTableHeader<T>
              headerCells={headerCells}
              onFilterClick={onFilterClick}
              onFilterDelete={onFilterDelete}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {visibleRowsData.map((rowData, rowIndex) => {
                return (
                  <TableRow
                    hover
                    key={`table-row-${rowIndex}`}
                    onClick={handleRowClick(rowData)}
                    sx={{ 
                      cursor: 'pointer',
                      '&:nth-of-type(even)': {
                        backgroundColor: GREY_50 
                      },
                      '&.MuiTableRow-root:hover': {
                        backgroundColor: GREY_200 
                      }
                    }}
                    tabIndex={-1}
                  > 
                    {
                      headerCellsMap.map((key, cellIndex) => {
                        return (
                          <TableCell
                            key={`mui-table-row-${rowIndex}-cell-${key}`}
                            sx={{
                              maxWidth: headerCells[cellIndex]?.width ? `${headerCells[cellIndex]?.width}px` : 'none',
                              minWidth: headerCells[cellIndex]?.width ? `${headerCells[cellIndex]?.width}px` : 'auto',
                              overflow: 'hidden',
                              padding: '16px 10px',
                              textOverflow: 'ellipsis',
                              width: headerCells[cellIndex]?.width ? `${headerCells[cellIndex]?.width}px` : 'auto',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {(key !== 'actions') 
                              ? (() => {
                                const cellValue = rowData[key as keyof T];
                                if (cellValue === null || cellValue === undefined) return '-';
                                if (typeof cellValue === 'string' || typeof cellValue === 'number') {
                                  return String(cellValue);
                                }
                                // Only allow ReactNodes explicitly passed by the caller; avoid HTML strings
                                return (cellValue as React.ReactNode) ?? '-';
                              })()
                              : (
                                // TODO: Add edit button
                                <DeleteButton
                                  dataToDelete={rowData}
                                  id={`${rowData['id' as keyof T]}-delete-button`}
                                  onDelete={onDelete ? onDelete : () => {}}
                                />
                              )
                            }
                          </TableCell>
                        );
                      })
                    }
                  </TableRow>
                );
              })}
              {emptyRows > 0
                ? (
                  <TableRow
                    style={{
                      height: 53 * emptyRows 
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )
                : null
              }
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component='div'
          count={rowsData.length}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[ 10, 20, 25 ]}
        />
      </Paper>
    </Box>
  );
};
