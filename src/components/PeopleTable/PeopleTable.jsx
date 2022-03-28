import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Table, Thead, Tbody, Tr, Text, Spinner, VStack } from '@chakra-ui/react';

import { useTable, usePagination, useFilters, useSortBy } from 'react-table';
import PeopleTableDescription from './PeopleTableDescription';
import PeopleTableFilters from './PeopleTableFilters';
import PeopleTableHeader from './PeopleTableHeader';
import PeopleTableFooter from './PeopleTableFooter';
import { PeopleTableRow, NameColumn, SegmentColumn } from './PeopleTableRow';
import { RowModalContextProvider } from './RowModalContext';

const rowsPerPageSelect = [6, 10, 20, 30];
const sortOptions = {
  nameDesc: [{ id: 'name', desc: true }],
  nameAsc: [{ id: 'name', desc: false }],
  lastUpdated: [{ id: 'lastUpdated', desc: false }],
};

// Custom filter functions
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

const segmentFilterFn = (rows, id, filterValue) => {
  return rows.filter(row => {
    const { segments } = row.values[id];
    return segments !== undefined ? segments.some(segment => segment.id === filterValue) : true;
  });
};
segmentFilterFn.autoRemove = val => !val;

// Custom sorting functions
const nameSortFn = (rowA, rowB, id, desc) => {
  const activeSort = desc
    ? +rowA.values[id].isActive - +rowB.values[id].isActive
    : +rowB.values[id].isActive - +rowA.values[id].isActive;
  return activeSort || rowB.values[id].name.localeCompare(rowA.values[id].name);
};

/* eslint-disable react/destructuring-assignment, react/prop-types */
const cellStructure = [
  {
    id: 'name',
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
    id: 'lastUpdated',
    Header: 'Last Updated',
    accessor: 'temp-date',
    Cell: <p>XX-XX-20XX</p>,
  },
  {
    id: 'assignedSegments',
    Header: 'Assigned Segment(s)',
    accessor: d => ({
      segments: d.segments,
      userId: d.id,
      registered: d.registered,
      isActive: d.isActive,
    }),
    filter: 'segmentFilter',
    Cell: props => <SegmentColumn data={props.value} />,
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

const PeopleTable = ({ variant, userData, segments, loading }) => {
  const columns = useMemo(() => cellStructure, []);
  const data = useMemo(() => userData, [loading]);
  const filterTypes = useMemo(
    () => ({
      nameFilter: nameFilterFn,
      segmentFilter: segmentFilterFn,
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
    setFilter,
    setSortBy,
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
    },
    useFilters,
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
        setNameFilter={value => setFilter('name', value)}
        setSegmentFilter={value => setFilter('assignedSegments', value)}
        sortOptions={sortOptions}
        setSortBy={setSortBy}
      />
      <Table variant="striped" {...getTableProps()}>
        <Thead>
          <PeopleTableHeader headerGroups={headerGroups} loading={loading} />
        </Thead>
        <Tbody {...getTableBodyProps()}>
          <RowModalContextProvider>
            {tableContent(loading, page, prepareRow)}
          </RowModalContextProvider>
        </Tbody>
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
  userData: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  segments: PropTypes.object.isRequired,
};

export default PeopleTable;
