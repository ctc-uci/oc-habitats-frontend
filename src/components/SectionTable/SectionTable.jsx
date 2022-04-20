/* eslint-disable react/jsx-key */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Table, Thead, Tbody, Tr, Td, Link, VStack } from '@chakra-ui/react';
import { useTable, usePagination } from 'react-table';
import SectionTableFooter from './SectionTableFooter';
import SectionTableHeader from './SectionTableHeader';
import { SegmentNameColumn, ParkingColumn, UpdateSegmentPopupColumn } from './SectionTableRow';

const rowsPerPageSelect = [6, 10, 20, 30];

const cellStructure = [
  {
    id: 'segmentName',
    Header: 'Segment Name',
    accessor: d => ({
      segmentId: d.segmentId,
      segment: d.segment,
      name: d.name,
      streets: d.streets,
    }),
    Cell: props => <SegmentNameColumn data={props.value} />,
  },
  {
    id: 'map',
    accessor: 'map',
    Header: 'Map',
    Cell: props => (
      <div>
        <Link href={`${props.value}`} isExternal>
          <u>Link</u>
        </Link>
      </div>
    ),
  },
  {
    id: 'parking',
    accessor: 'parking',
    Header: 'Parking',
    Cell: props => <ParkingColumn data={props.value} />,
  },
  {
    id: 'delete',
    accessor: 'id',
    Header: '',
    Cell: props => <UpdateSegmentPopupColumn data={props.value} />,
  },
];

const SectionTable = ({ sectionId, loading, segments }) => {
  const columns = useMemo(() => cellStructure, []);
  const data = useMemo(() => segments, []);
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
          <SectionTableHeader headerGroups={headerGroups} loading={loading} />
          {/* {headerGroups.map(headerGroup => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <Th {...column.getHeaderProps()}>{column.render('Header')}</Th>
              ))}
            </Tr>
          ))} */}
        </Thead>
        <Tbody>
          {page.map((row, i) => {
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
      <div>
        <SectionTableFooter
          rowCount={rows.length}
          pageIndex={pageIndex}
          rowsPerPageSelect={rowsPerPageSelect}
          pageSize={pageSize}
          pageControl={{ setPageSize, nextPage, previousPage, canNextPage, canPreviousPage }}
        />
      </div>
    </>
  );
};

SectionTable.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default SectionTable;
