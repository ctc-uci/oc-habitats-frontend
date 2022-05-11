/* eslint-disable react/jsx-key */

import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Table, Thead, Tbody, Tr, Link, Text, Spinner, VStack } from '@chakra-ui/react';
import { useTable, usePagination } from 'react-table';
import SectionTableFooter from './SectionTableFooter';
import SectionTableHeader from './SectionTableHeader';
import {
  SectionTableRow,
  SegmentNameColumn,
  ParkingColumn,
  UpdateSegmentPopupColumn,
} from './SectionTableRow';

const rowsPerPageSelect = [6, 10, 20, 30];

/* eslint-disable react/destructuring-assignment, react/prop-types */
const LoadingRow = () => (
  <Tr>
    <td colSpan={4}>
      <VStack justifyContent="center" alignContent="center">
        <Text fontWeight="bold">Loading</Text>
        <Spinner size="sm" />
      </VStack>
    </td>
  </Tr>
);

const EmptyRow = () => (
  <Tr>
    <td colSpan={4}>
      <VStack justifyContent="center" alignContent="center">
        <Text fontWeight="bold">No segments found</Text>
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
      return <SectionTableRow key={row.name} row={row} />;
    });
  }
  return <EmptyRow />;
};

const SectionTable = ({ loading, segments, allSections, updateSections, sectionId }) => {
  const columns = useMemo(
    () => [
      {
        id: 'segmentName',
        Header: 'Segment Name',
        accessor: d => ({
          segmentId: d.segmentId,
          segment: d.segment,
          name: d.name,
          description: d.description,
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
        accessor: d => d,
        Header: '',
        Cell: props => (
          <UpdateSegmentPopupColumn
            data={props.value}
            allSections={allSections}
            updateSections={updateSections}
            currentSection={sectionId}
          />
        ),
      },
    ],
    [allSections],
  );
  const data = useMemo(() => segments, [segments, loading]);
  const {
    getTableProps,
    // getTableBodyProps,
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
        </Thead>
        <Tbody>{tableContent(loading, page, prepareRow)}</Tbody>
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
  segments: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      segmentId: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      streets: PropTypes.string.isRequired,
      mapLink: PropTypes.string.isRequired,
      parking: PropTypes.string.isRequired,
    }),
  ).isRequired,
  allSections: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  updateSections: PropTypes.func.isRequired,
};

export default SectionTable;
