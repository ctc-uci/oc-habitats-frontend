/* eslint-disable react/jsx-key */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Table, Thead, Tbody, Th, Tr, Td } from '@chakra-ui/react';
import { useTable, usePagination } from 'react-table';

const rowsPerPageSelect = [6, 10, 20, 30];

const cellStructure = [
  {
    id: 'segmentName',
    accessor: 'segmentName',
    Header: 'Segment Name',
  },
  {
    id: 'map',
    accessor: 'map',
    Header: 'Map',
  },
  {
    id: 'parking',
    accessor: 'parking',
    Header: 'Parking',
  },
];

const tempData = [
  {
    segmentName: 'OCH01',
    map: 'example.com',
    parking: 'here is how you park',
  },
  {
    segmentName: 'OCH02',
    map: 'example.com',
    parking: 'here is how you park2',
  },
];

const SectionTable = () => {
  const columns = useMemo(() => cellStructure, []);
  const data = useMemo(() => tempData, []);
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
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageSize: rowsPerPageSelect[0],
      },
    },
    usePagination,
  );

  return (
    <>
      <Table variant="striped" {...getTableProps()}>
        <Thead>
          {headerGroups.map(headerGroup => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <Th {...column.getHeaderProps()}>{column.render('Header')}</Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>;
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </>
  );
};

SectionTable.propTypes = {};

export default SectionTable;
