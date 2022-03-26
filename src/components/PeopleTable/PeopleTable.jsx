import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Flex,
  Input,
  Select,
  Text,
  Tooltip,
  IconButton,
  Box,
  Spinner,
  VStack,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { Search2Icon, ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import {
  useTable,
  usePagination,
  useFilters,
  useSortBy,
  useRowSelect,
  useGlobalFilter,
} from 'react-table';
import PeopleTableDescription from './PeopleTableDescription';
import { PeopleTableRow, NameColumn, SegmentColumn } from './PeopleTableRow';
import styles from './PeopleTable.module.css';

const rowsPerPageSelect = [6, 10, 20, 30];
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
    Cell: props => <NameColumn data={props.value} />,
  },
  {
    Header: 'Last Updated',
    accessor: 'temp-date',
    Cell: <p>XX-XX-20XX</p>,
  },
  {
    Header: 'Assigned Segment(s)',
    accessor: 'segments',
    Cell: props => <SegmentColumn data={props.value} />,
  },
];
/* eslint-enable react/destructuring-assignment, react/prop-types */

const FilterTable = ({ variant, segments }) => {
  return (
    <Flex direction="row" justifyContent="space-between" m="20px 0 30px">
      <Box>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Search2Icon color="ochGrey" />
          </InputLeftElement>
          <Input placeholder={`Search ${variant}s...`} htmlSize={30} width="auto" />
        </InputGroup>
      </Box>
      <Flex direction="row">
        {variant === 'volunteer' ? (
          <Flex flexDir="row" justifyItems="center" mr="30px">
            <Text fontWeight="bold" color="ochGrey" mr="15px" alignSelf="center">
              FILTER BY SEGMENT
            </Text>
            <Select placeholder=" " w={40}>
              {segments.map(segment => {
                return (
                  <option key={segment.id} value={segment.id}>
                    {segment.name}
                  </option>
                );
              })}
            </Select>
          </Flex>
        ) : null}
        <Flex flexDir="row" justifyItems="center">
          <Text fontWeight="bold" color="ochGrey" mr="15px" alignSelf="center">
            SORT BY
          </Text>
          <Select placeholder=" " w={40}>
            <option value="option1">Name: A - Z</option>
            <option value="option2">Name: Z - A</option>
            <option value="option3">Last Updated</option>
          </Select>
        </Flex>
      </Flex>
    </Flex>
  );
};

/* eslint-disable react/jsx-key */
const StyledHeader = ({ headerGroups, loading }) => {
  return headerGroups.map(headerGroup => (
    <Tr className={styles['table-head']} {...headerGroup.getHeaderGroupProps()}>
      {headerGroup.headers.map(column => (
        <Th {...column.getHeaderProps()} color="white" bgColor="ochGrey">
          <Flex alignItems="center" textTransform="none">
            {loading ? <>&nbsp;</> : column.render('Header')}
          </Flex>
        </Th>
      ))}
    </Tr>
  ));
};
/* eslint-enable react/jsx-key */

const StyledFooter = ({ rowCount, pageIndex, pageSize, pageControl }) => {
  const rowText = () => {
    const left = pageIndex === 0 ? 1 : pageIndex * pageSize + 1;
    const right = Math.min(rowCount, pageSize * (pageIndex + 1));
    return `${left}-${right}`;
  };
  return (
    <Box
      className={styles['footer-container']}
      backgroundColor="ochGrey"
      color="white"
      style={{ margin: 0 }}
    >
      <Flex justifyContent="space-between" m={4} alignItems="center">
        <Flex alignItems="center">
          <Text flexShrink="0">Show rows per page: </Text>{' '}
          <Select
            backgroundColor="white"
            color="ochGrey"
            ml={2}
            w={32}
            value={pageSize}
            onChange={e => {
              pageControl.setPageSize(Number(e.target.value));
            }}
          >
            {rowsPerPageSelect.map(rowVal => (
              <option key={rowVal} value={rowVal}>
                {rowVal}
              </option>
            ))}
          </Select>
        </Flex>

        <Flex alignItems="center">
          <Text flexShrink="0" mr={8}>
            <Text as="span">{rowText()}</Text>
            <Text as="span" color="gray.300">
              {' '}
              of {rowCount}
            </Text>
          </Text>
          <Tooltip label="Previous Page">
            <IconButton
              background="transparent"
              color="white"
              icon={<ChevronLeftIcon h={6} w={6} />}
              isDisabled={!pageControl.canPreviousPage}
              onClick={() => pageControl.previousPage()}
            />
          </Tooltip>
          <Tooltip label="Next Page">
            <IconButton
              background="transparent"
              _hover={null}
              color="white"
              icon={<ChevronRightIcon h={6} w={6} />}
              ml={4}
              isDisabled={!pageControl.canNextPage}
              onClick={() => pageControl.nextPage()}
            />
          </Tooltip>
        </Flex>
      </Flex>
    </Box>
  );
};

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

const PeopleTable = ({ variant, peopleData, segments, loading }) => {
  const columns = useMemo(() => cellStructure, []);
  // Memoizing data
  const data = useMemo(() => peopleData, [loading]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    setPageSize,
    rows,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageSize: rowsPerPageSelect[0],
      },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
  );

  return (
    <>
      <PeopleTableDescription variant={variant} />
      <FilterTable variant={variant} segments={segments} />
      <Table variant="striped" {...getTableProps()}>
        <Thead>
          <StyledHeader headerGroups={headerGroups} loading={loading} />
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {loading ? (
            <LoadingRow />
          ) : (
            page?.map(row => {
              prepareRow(row);
              return <PeopleTableRow key={row.name} row={row} />;
            })
          )}
        </Tbody>
      </Table>
      <StyledFooter
        rowCount={rows.length}
        pageIndex={pageIndex}
        pageSize={pageSize}
        pageControl={{ setPageSize, nextPage, previousPage, canNextPage, canPreviousPage }}
      />
    </>
  );
};

FilterTable.propTypes = {
  variant: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  segments: PropTypes.object.isRequired,
};

StyledHeader.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  headerGroups: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

StyledFooter.propTypes = {
  rowCount: PropTypes.number.isRequired,
  pageIndex: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  pageControl: PropTypes.object.isRequired,
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
