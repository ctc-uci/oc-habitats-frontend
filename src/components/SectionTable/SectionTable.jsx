import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Text,
  Spinner,
  VStack,
  useMediaQuery,
  Flex,
} from '@chakra-ui/react';
import { useTable, usePagination } from 'react-table';
import SectionTableHeader from './SectionTableHeader';
import {
  SectionTableRow,
  SegmentNameColumn,
  ParkingColumn,
  UpdateSegmentPopupColumn,
  MapLinkColumn,
} from './SectionTableRow';

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
      <VStack justifyContent="center" alignContent="center" my={4}>
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

const SectionTable = ({ loading, segments, allSections, updateSections, sectionId, role }) => {
  const [isMobile] = useMediaQuery('(max-width: 768px)');

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
        id: 'mapLink',
        accessor: 'mapLink',
        Header: 'Map',
        Cell: props => <MapLinkColumn data={props.value} />,
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

  const { getTableProps, headerGroups, prepareRow, page, setHiddenColumns } = useTable(
    {
      columns,
      data,
      initialState: {
        pageSize: segments.length,
      },
    },
    usePagination,
  );

  // set hidden table columns, depending on user role and mobile
  useEffect(() => {
    const hiddenColumns = [];
    if (role === 'volunteer') {
      hiddenColumns.push('delete');
    }
    if (isMobile) {
      hiddenColumns.push('mapLink', 'parking');
    }
    setHiddenColumns(hiddenColumns);
  }, [isMobile]);

  return (
    <>
      <Table variant="striped" {...getTableProps()}>
        <Thead>
          <SectionTableHeader headerGroups={headerGroups} loading={loading} />
        </Thead>
        <Tbody>{tableContent(loading, page, prepareRow)}</Tbody>
      </Table>
      <Flex
        w="100%"
        bgColor="ochGrey"
        h="40px"
        borderBottomEndRadius={10}
        borderBottomStartRadius={10}
        paddingX={6}
        align="center"
      >
        <Text fontWeight="600" color="white">
          Total: {segments.length} segments
        </Text>
      </Flex>
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
  role: PropTypes.string.isRequired,
};

export default SectionTable;
