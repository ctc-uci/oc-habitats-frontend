import React from 'react';
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
import PeopleTableDescription from './PeopleTableDescription';
import PeopleTableRow from './PeopleTableRow';
import styles from './PeopleTable.module.css';

const headerData = [
  { headerText: 'Name' },
  { headerText: 'Last Updated' },
  { headerText: 'Assigned Segment(s)' },
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

const StyledHeader = () => {
  return (
    <Tr className={styles['table-head']}>
      {headerData.map(header => (
        <Th key={header.headerText} userSelect="none" color="white" bgColor="ochGrey">
          <Flex alignItems="center">
            <p>{header.headerText}</p>
            <ChevronDownIcon ml={1} w={4} h={4} />
          </Flex>
        </Th>
      ))}
    </Tr>
  );
};

const StyledFooter = () => {
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
          <Select backgroundColor="white" color="ochGrey" ml={2} w={32}>
            {[10, 20, 30, 40, 50].map(size => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </Select>
        </Flex>

        <Flex alignItems="center">
          <Text flexShrink="0" mr={8}>
            <Text fontWeight="bold" as="span">
              X of X
            </Text>
          </Text>
          <Tooltip label="Previous Page">
            <IconButton
              backgroundColor="ochGrey"
              color="white"
              icon={<ChevronLeftIcon h={6} w={6} />}
            />
          </Tooltip>
          <Tooltip label="Next Page">
            <IconButton
              backgroundColor="ochGrey"
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

const PeopleTable = ({ variant }) => {
  return (
    <>
      <PeopleTableDescription variant={variant} />
      <FilterTable variant={variant} />
      <Table variant="striped">
        <Thead>
          <StyledHeader />
        </Thead>
        <Tbody>
          {tableData.map(row => (
            <PeopleTableRow key={row.name} data={row} />
          ))}
        </Tbody>
      </Table>
      <StyledFooter />
    </>
  );
};

FilterTable.propTypes = {
  variant: PropTypes.string.isRequired,
};

PeopleTable.propTypes = {
  variant: PropTypes.string.isRequired,
};

export default PeopleTable;
