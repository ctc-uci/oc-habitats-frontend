/* eslint-disable react/jsx-key */
import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTable, usePagination, useSortBy } from 'react-table';
import { Table, Tr, Td, Tbody, Spinner, useMediaQuery } from '@chakra-ui/react';
import VolunteerLogsTableHeader from './VolunteerLogsTableHeader.jsx';
import Pagination from '../../common/TablePagination';
import CellStructure from './VolunteerLogsStructure.jsx';

/* eslint-enable react/destructuring-assignment, react/prop-types */

const VolunteerLogsTable = ({
  tableData,
  pageCount: controlledPageCount,
  checked,
  isLoading,
  setChecked,
  allChecked,
  setAllChecked,
  setFetchSettings,
}) => {
  const [isMobile] = useMediaQuery('(max-width: 768px)');

  const columns = useMemo(
    () => CellStructure(checked, setChecked, allChecked, setAllChecked),
    [checked, setChecked, allChecked, setAllChecked],
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    setPageSize,
    setHiddenColumns,
    state: { pageIndex, pageSize, sortBy },
  } = useTable(
    {
      columns,
      data: tableData.results,
      initialState: {
        hiddenColumns: ['statusAndEdit'],
        pageIndex: 0,
        pageSize: 10,
        sortBy: [{ id: 'submittedAt', desc: false }],
      },
      manualPagination: true,
      manualSortBy: true,
      pageCount: controlledPageCount,
    },
    useSortBy,
    usePagination,
  );

  useEffect(() => {
    setFetchSettings({ pageIndex, pageSize, sortBy });
  }, [pageIndex, pageSize, sortBy]);

  // set hidden table columns, depending on user role and mobile
  useEffect(() => {
    const hiddenColumns = [];
    if (isMobile) {
      hiddenColumns.push('segmentName', 'submittedAt', 'status', 'partners', 'edit');
    } else {
      // hide combined column?
      hiddenColumns.push('statusAndEdit');
    }
    setHiddenColumns(hiddenColumns);
  }, [isMobile, checked, allChecked]);

  return (
    <>
      <Table variant="striped" {...getTableProps()}>
        <VolunteerLogsTableHeader headerGroups={headerGroups} />
        <Tbody {...getTableBodyProps()}>
          {isLoading && (
            <Tr>
              <Td colSpan="100%" textAlign="center" py="10">
                <Spinner />
              </Td>
            </Tr>
          )}
          {!isLoading && page.length === 0 && (
            <Tr>
              <Td colSpan="100%" textAlign="center" py="10">
                No results
              </Td>
            </Tr>
          )}
          {!isLoading &&
            page.map(row => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <Td fontSize="14px" key={row.id} {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
        </Tbody>
      </Table>
      <Pagination
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        pageIndex={pageIndex}
        pageSize={pageSize}
        setPageSize={setPageSize}
        previousPage={previousPage}
        nextPage={nextPage}
        totalData={tableData.total}
      />
    </>
  );
};

VolunteerLogsTable.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  checked: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  tableData: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  pageCount: PropTypes.number.isRequired,
  allChecked: PropTypes.bool.isRequired,
  setChecked: PropTypes.func.isRequired,
  setAllChecked: PropTypes.func.isRequired,
  setFetchSettings: PropTypes.func.isRequired,
};

export default VolunteerLogsTable;
