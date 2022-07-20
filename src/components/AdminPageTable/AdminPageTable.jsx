/* eslint-disable react/jsx-key */
import React, { useEffect, useMemo } from 'react';
import { Button, Table, Tr, Td, Tbody, Spinner, Box, Flex, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useTable, usePagination, useSortBy } from 'react-table';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import AdminPageHeader from './AdminPageHeader';
import Pagination from '../../common/TablePagination';
import CellStructure from './AdminPageStructure';

/* eslint-enable react/destructuring-assignment, react/prop-types */

const AdminPageTable = ({
  tableData,
  pageCount: controlledPageCount,
  checked,
  isLoading,
  setChecked,
  allChecked,
  setAllChecked,
  setFetchSettings,
}) => {
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
    state: { pageIndex, pageSize, sortBy },
  } = useTable(
    {
      columns,
      data: tableData.results,
      initialState: { pageIndex: 0, pageSize: 10, sortBy: [{ id: 'date', desc: true }] },
      manualPagination: true,
      manualSortBy: true,
      showPagination: false,
      pageCount: controlledPageCount,
    },
    useSortBy,
    usePagination,
  );

  const handleShowMore = () => {
    setPageSize(pageSize + 10);
  };

  const handleShowLess = () => {
    if (pageSize > 10) {
      setPageSize(pageSize - 10);
    }
  };

  useEffect(() => {
    setFetchSettings({ pageIndex, pageSize, sortBy });
  }, [pageIndex, pageSize, sortBy]);

  return (
    <>
      <Table variant="striped" {...getTableProps()}>
        <AdminPageHeader headerGroups={headerGroups} />
        <Tbody {...getTableBodyProps()}>
          {isLoading && (
            <Tr>
              <Td colSpan="6" textAlign="center" py="10">
                <Spinner />
              </Td>
            </Tr>
          )}
          {!isLoading && page.length === 0 && (
            <Tr>
              <Td colSpan="6" textAlign="center" py="10">
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
          {pageSize < 100 && (
            <Button m={2} size="sm" leftIcon={<FiChevronDown />} onClick={handleShowMore}>
              Show More
            </Button>
          )}
          {pageSize > 0 && (
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

AdminPageTable.propTypes = {
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
};

export default AdminPageTable;
