/* eslint-disable react/jsx-key */
import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTable, usePagination, useSortBy } from 'react-table';
import { Button, Flex, Table, Text, Tr, Td, Tbody, Spinner, useMediaQuery } from '@chakra-ui/react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import VolunteerLogsTableHeader from './VolunteerLogsTableHeader';
// import Pagination from '../../common/TablePagination';
import CellStructure from './VolunteerLogsStructure';

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
  useChecks,
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
    setPageSize,
    setHiddenColumns,
    state: { pageIndex, pageSize, sortBy },
  } = useTable(
    {
      columns,
      data: tableData.results,
      initialState: {
        hiddenColumns: ['statusAndEdit', ''],
        pageIndex: 0,
        pageSize: 10,
        sortBy: [{ id: 'date', desc: true }],
      },
      manualPagination: true,
      manualSortBy: true,
      pageCount: controlledPageCount,
    },
    useSortBy,
    usePagination,
  );

  const handleShowMore = () => {
    setPageSize(pageSize + 10);
    setAllChecked(false);
  };

  const handleShowLess = () => {
    setPageSize(pageSize - 10);
    setAllChecked(false);
  };

  useEffect(() => {
    setFetchSettings({ pageIndex, pageSize, sortBy });
  }, [pageIndex, pageSize, sortBy]);

  // set hidden table columns, depending on user role and mobile
  useEffect(() => {
    const hiddenColumns = [];
    if (isMobile) {
      hiddenColumns.push('segmentName', 'submittedAt', 'status', 'partners', 'edit', 'date');
    } else {
      // hide combined column?
      hiddenColumns.push('statusAndEdit');
    }
    if (!useChecks) {
      hiddenColumns.push('checkbox');
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
      <Flex
        bgColor="ochGrey"
        w="100%"
        align="center"
        justify="space-between"
        direction="row"
        px={4}
        h="50px"
        borderBottomStartRadius={10}
        borderBottomEndRadius={10}
      >
        <Flex align="center" justify="center" direction="row">
          {pageSize < tableData.total && (
            <Button m={2} size="sm" leftIcon={<FiChevronDown />} onClick={handleShowMore}>
              Show More
            </Button>
          )}
          {pageSize > 10 && (
            <Button m={2} size="sm" rightIcon={<FiChevronUp />} onClick={handleShowLess}>
              Show Less
            </Button>
          )}
        </Flex>
        <Text color="white">
          Showing {pageSize > tableData.total ? tableData.total : pageSize} of {tableData.total}{' '}
          rows
        </Text>
      </Flex>
      {/* <Pagination
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        pageIndex={pageIndex}
        pageSize={pageSize}
        setPageSize={setPageSize}
        previousPage={previousPage}
        nextPage={nextPage}
        totalData={tableData.total}
      /> */}
    </>
  );
};

VolunteerLogsTable.defaultProps = {
  useChecks: true,
};

VolunteerLogsTable.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  checked: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  tableData: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  pageCount: PropTypes.number.isRequired,
  allChecked: PropTypes.bool.isRequired,
  setChecked: PropTypes.func.isRequired,
  setAllChecked: PropTypes.func.isRequired,
  setFetchSettings: PropTypes.func.isRequired,
  useChecks: PropTypes.bool,
};

export default VolunteerLogsTable;
