import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Table, Thead, Tbody, Tr, Text, Spinner, VStack } from '@chakra-ui/react';

import { useTable, usePagination, useFilters, useSortBy, useGlobalFilter } from 'react-table';
import PeopleTableDescription from './PeopleTableDescription';
import PeopleTableFilters from './PeopleTableFilters';
import PeopleTableHeader from './PeopleTableHeader';
import PeopleTableFooter from './PeopleTableFooter';
import { PeopleTableRow, NameColumn, SegmentColumn } from './PeopleTableRow';

const rowsPerPageSelect = [6, 10, 20, 30];
const sortOptions = {
  nameDesc: [{ id: 'Name', desc: true }],
  nameAsc: [{ id: 'Name', desc: false }],
  lastUpdated: [{ id: 'Last Updated', desc: false }],
};

// Custom filter for searching name column
const nameFilterFn = (rows, id, filterValue) => {
  return rows.filter(row => {
    const rowValue = row.values[id];
    const searchKeys = ['name', 'email'];
    return rowValue !== undefined
      ? searchKeys.some(key =>
          String(rowValue[key]).toLowerCase().includes(String(filterValue).toLowerCase()),
        )
      : true;
  });
};
nameFilterFn.autoRemove = val => !val;

// Custom filter for sorting name column
// eslint-disable-next-line no-unused-vars
const nameSortFn = (rowA, rowB, id, desc) => {
  if (rowA.values[id].name > rowB.values[id].name) return -1;
  if (rowB.values[id].name > rowA.values[id].name) return 1;
  return 0;
};

/* eslint-disable react/destructuring-assignment, react/prop-types */
const cellStructure = [
  {
    Header: 'Name',
    accessor: d => ({
      name: `${d.firstName} ${d.lastName}`,
      email: d.email,
      registered: d.registered,
      isTrainee: d.isTrainee,
      isActive: d.isActive,
    }),
    filter: 'nameFilter',
    sortType: nameSortFn,
    Cell: props => <NameColumn data={props.value} />,
  },
  {
    Header: 'Last Updated',
    accessor: 'temp-date',
    Cell: <p>XX-XX-20XX</p>,
    disableGlobalFilter: true,
  },
  {
    Header: 'Assigned Segment(s)',
    accessor: d => ({
      segments: d.segments,
      userId: d.id,
      registered: d.registered,
      isActive: d.isActive,
    }),
    Cell: props => <SegmentColumn data={props.value} />,
    disableGlobalFilter: true,
  },
];
/* eslint-enable react/destructuring-assignment, react/prop-types */

const LoadingRow = () => (
  <Tr>
    <td colSpan={3}>
      <VStack justifyContent="center" alignContent="center" margin="50px">
        <Text fontWeight="bold">Loading</Text>
        <Spinner size="sm" />
      </VStack>
    </td>
  </Tr>
);

const EmptyRow = () => (
  <Tr>
    <td colSpan={3}>
      <VStack justifyContent="center" alignContent="center" margin="50px">
        <Text fontWeight="bold">No users found</Text>
      </VStack>
    </td>
  </Tr>
);

const tableContent = (loading, page, prepareRow) => {
  if (loading) {
    return <LoadingRow />;
  }
  if (page?.length) {
    return page.map(row => {
      prepareRow(row);
      return <PeopleTableRow key={row.name} row={row} />;
    });
  }
  return <EmptyRow />;
};

// TODO: remove
JSON.safeStringify = (obj, indent = 2) => {
  let cache = [];
  const retVal = JSON.stringify(
    obj,
    (key, value) =>
      // eslint-disable-next-line no-nested-ternary
      typeof value === 'object' && value !== null
        ? cache.includes(value)
          ? undefined // Duplicate reference found, discard key
          : cache.push(value) && value // Store value in our collection
        : value,
    indent,
  );
  cache = null;
  return retVal;
};

const PeopleTable = ({ variant, peopleData, segments, loading }) => {
  const columns = useMemo(() => cellStructure, []);
  const data = useMemo(() => peopleData, [loading]);
  const filterTypes = useMemo(
    () => ({
      nameFilter: nameFilterFn,
    }),
    [],
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    setPageSize,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    setGlobalFilter,
    setSortBy,
    state,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      filterTypes,
      initialState: {
        pageSize: rowsPerPageSelect[0],
        sortBy: sortOptions.nameDesc,
      },
      globalFilter: 'nameFilter',
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
  );

  return (
    <>
      {/* <pre>{JSON.safeStringify(rows)}</pre> */}
      <PeopleTableDescription variant={variant} />
      <PeopleTableFilters
        variant={variant}
        segments={segments}
        globalFilter={state.globalFilter || ''}
        setGlobalFilter={setGlobalFilter}
        sortOptions={sortOptions}
        setSortBy={setSortBy}
      />
      <Table variant="striped" {...getTableProps()}>
        <Thead>
          <PeopleTableHeader headerGroups={headerGroups} loading={loading} />
        </Thead>
        <Tbody {...getTableBodyProps()}>{tableContent(loading, page, prepareRow)}</Tbody>
      </Table>
      <PeopleTableFooter
        rowCount={rows.length}
        pageIndex={pageIndex}
        rowsPerPageSelect={rowsPerPageSelect}
        pageSize={pageSize}
        pageControl={{ setPageSize, nextPage, previousPage, canNextPage, canPreviousPage }}
      />
    </>
  );
};

PeopleTable.propTypes = {
  variant: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  peopleData: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  segments: PropTypes.object.isRequired,
};

export default PeopleTable;
