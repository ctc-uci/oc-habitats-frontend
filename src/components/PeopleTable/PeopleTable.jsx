import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Flex,
  Input,
  Select,
  Text,
  Tooltip,
  IconButton,
  Box,
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import { useTable } from 'react-table';
import PeopleTableDescription from './PeopleTableDescription';
import PeopleTableRow from './PeopleTableRow';
import styles from './PeopleTable.module.css';

const rowsPerPageSelect = [6, 10, 20, 30];
const headerData = [
  {
    Header: 'Name',
    accessor: row => `${row.firstName} ${row.lastName}`,
  },
  {
    Header: 'Last Updated',
    accessor: 'temp-date',
  },
  {
    Header: 'Assigned Segment(s)',
    accessor: 'temp-value',
  },
];

const tableData = [
  {
    name: 'Alexander Adebayo',
    email: 'alexander@chakra-ui.com',
    lastUpdated: '01-01-2022',
    assignedSegments: [
      {
        name: 'OC03',
        description: 'Sunset Beach (19th Street to Warner Ave)',
      },
      {
        name: 'OC19',
        description: 'Seal Beach (1st Street)',
      },
    ],
    active: true,
    training: true,
  },
  {
    name: 'Ophelia Santiago',
    email: 'ophelia@chakra-ui.com',
    lastUpdated: '01-02-2022',
    assignedSegments: [
      {
        name: 'OC17',
        description: 'Laguna Beach',
      },
    ],
    active: true,
    training: false,
  },
  {
    name: 'Emily Sue',
    email: 'emily@chakra-ui.com',
    lastUpdated: '01-03-2022',
    assignedSegments: [
      {
        name: 'OC03',
        description: 'Sunset Beach (19th Street to Warner Ave)',
      },
      {
        name: 'OC19',
        description: 'Seal Beach (1st Street)',
      },
    ],
    active: true,
    training: true,
  },
  {
    name: 'Diana D',
    email: 'd@och.org',
    lastUpdated: '01-03-2022',
    assignedSegments: [
      {
        name: 'OC19',
        description: 'Seal Beach (1st Street)',
      },
    ],
    active: false,
    training: false,
  },
  {
    name: 'Edward Elrich',
    email: 'edward@chakra-ui.com',
    lastUpdated: '01-03-2022',
    assignedSegments: [],
    active: false,
    training: false,
  },
];

const FilterTable = ({ variant }) => {
  return (
    <Flex justifyContent="space-between" m="20px 0">
      <Input placeholder={`Search ${variant}s...`} htmlSize={30} width="auto" />
      <Flex flexDir="row" justifyContent="right" w="50%">
        {variant === 'volunteer' ? (
          <>
            <Text m="auto 10px auto 0" casing="uppercase" w="50%">
              Filter by segment
            </Text>
            <Select className="sort-options" width="30%" mr="30px">
              <option value="option1">Name: A-Z</option>
              <option value="option2">Name: Z-A</option>
            </Select>
          </>
        ) : null}
        <Text m="auto 10px auto 0" casing="uppercase" w="50%">
          Sort by
        </Text>
        <Select className="sort-options" width="30%">
          <option value="option1">Name: A-Z</option>
          <option value="option2">Name: Z-A</option>
        </Select>
      </Flex>
    </Flex>
  );
};

/* eslint-disable react/jsx-key */
const StyledHeader = ({ headerGroups }) => {
  return headerGroups.map(headerGroup => (
    <Tr {...headerGroup.getHeaderGroupProps()} className={styles['table-head']}>
      {headerGroup.headers.map(column => (
        <Th {...column.getHeaderProps()} userSelect="none" color="white" bgColor="ochGrey">
          <Flex alignItems="center">
            {column.render('Header')}
            <ChevronDownIcon ml={1} w={4} h={4} />
          </Flex>
        </Th>
      ))}
    </Tr>
  ));
};
/* eslint-enable react/jsx-key */

const StyledFooter = ({ rowCount, pageIndex, rowsPerPage, setRowsPerPage }) => {
  const rowText = () => {
    const left = pageIndex === 0 ? 1 : (pageIndex + 1) * rowsPerPage;
    const right = Math.min(rowCount, rowsPerPage * (pageIndex + 1));
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
            value={rowsPerPage}
            onChange={e => {
              setRowsPerPage(Number(e.target.value));
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
            <Text as="span" color="#cbd5e0">
              {' '}
              of {rowCount}
            </Text>
          </Text>
          <Tooltip label="Previous Page">
            <IconButton
              background="transparent"
              color="white"
              icon={<ChevronLeftIcon h={6} w={6} />}
            />
          </Tooltip>
          <Tooltip label="Next Page">
            <IconButton
              background="transparent"
              color="white"
              icon={<ChevronRightIcon h={6} w={6} />}
              ml={4}
            />
          </Tooltip>
        </Flex>
      </Flex>
    </Box>
  );
};

const PeopleTable = ({ variant, data }) => {
  const columns = useMemo(() => headerData);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageSelect[0]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { pageIndex, pageSize },
  } = useTable({
    columns,
    data,
    initialState: {
      pageIndex: 0,
    },
  });

  return (
    <>
      <PeopleTableDescription variant={variant} />
      <FilterTable variant={variant} />
      <Table variant="striped" {...getTableProps()}>
        <Thead>
          <StyledHeader headerGroups={headerGroups} />
        </Thead>
        <Tbody>
          {tableData.map(row => (
            <PeopleTableRow key={row.name} data={row} />
          ))}
        </Tbody>
      </Table>
      <StyledFooter
        rowCount={rows.length}
        pageIndex={pageIndex}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
      />
    </>
  );
};

FilterTable.propTypes = {
  variant: PropTypes.string.isRequired,
};

StyledFooter.propTypes = {
  rowCount: PropTypes.number.isRequired,
  pageIndex: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  setRowsPerPage: PropTypes.func.isRequired,
};

PeopleTable.propTypes = {
  variant: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
};

export default PeopleTable;
