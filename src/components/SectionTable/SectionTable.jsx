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
    Cell: props => (
      // <div>
      //   <VStack>
      //     <div className="segmentname-container">{props.value.name}</div>
      //     <div className="location-container">{props.value.description}</div>
      //   </VStack>
      // </div>
      <SegmentNameColumn data={props.value} />
    ),
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
    Header: 'Delete',
    Cell: props => <UpdateSegmentPopupColumn data={props.value} />,
  },
];

// const tempData = [
//   {
//     name: 'OCH01 Seal Beach',
//     description: '1st St. - North End of Anaheim Bay',
//     map: 'http://example.com',
//     parking: 'here is how you park',
//   },
//   {
//     name: 'OCH02 Seal Beach',
//     description: '1st St. - North End of Anaheim Bay',
//     map: 'http://example.com',
//     parking: 'here is how you park2',
//   },
//   {
//     name: 'OCH03 Seal Beach',
//     description: '1st St. - North End of Anaheim Bay',
//     map: 'http://example.com',
//     parking: 'here is how you park2',
//   },
//   {
//     name: 'OCH04 Seal Beach',
//     description: '1st St. - North End of Anaheim Bay',
//     map: 'http://example.com',
//     parking: 'here is how you park2',
//   },
//   {
//     name: 'OCH05 Seal Beach',
//     description: '1st St. - North End of Anaheim Bay',
//     map: 'http://example.com',
//     parking: 'here is how you park2',
//   },
//   {
//     name: 'OCH06 Seal Beach',
//     description: '1st St. - North End of Anaheim Bay',
//     map: 'http://example.com',
//     parking: 'here is how you park2',
//   },
//   {
//     name: 'OCH07 Seal Beach',
//     description: '1st St. - North End of Anaheim Bay',
//     map: 'http://example.com',
//     parking: 'here is how you park2',
//   },
//   {
//     name: 'OCH08 Seal Beach',
//     description: '1st St. - North End of Anaheim Bay',
//     map: 'http://example.com',
//     parking: 'here is how you park2',
//   },
//   {
//     name: 'OCH09 Seal Beach',
//     description: '1st St. - North End of Anaheim Bay',
//     map: 'http://example.com',
//     parking: 'here is how you park2',
//   },
//   {
//     name: 'OCH10 Seal Beach',
//     description: '1st St. - North End of Anaheim Bay',
//     map: 'http://example.com',
//     parking: 'here is how you park2',
//   },
//   {
//     name: 'OCH11 Seal Beach',
//     description: '1st St. - North End of Anaheim Bay',
//     map: 'http://example.com',
//     parking: 'here is how you park2',
//   },
// ];

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
