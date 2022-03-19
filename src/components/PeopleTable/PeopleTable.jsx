import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Select,
  Text,
  Tooltip,
  IconButton,
  Box,
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import styles from './PeopleTable.module.css';

const headerData = [
  { headerText: 'Name' },
  { headerText: 'Last Updated' },
  { headerText: 'Assigned Segment(s)' },
];

const tableData = [
  { name: 'Person A', lastUpdated: '01-01-2022', assignedSegments: 'OC01' },
  { name: 'Person B', lastUpdated: '01-02-2022', assignedSegments: 'OC02' },
  { name: 'Person C', lastUpdated: '01-03-2022', assignedSegments: 'OC03' },
];

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
      <p>Variant: {variant}</p>
      <Table variant="striped">
        <Thead>
          <StyledHeader />
        </Thead>
        <Tbody>
          {tableData.map(row => (
            <Tr key={row.name}>
              <Td>{row.name}</Td>
              <Td>{row.lastUpdated}</Td>
              <Td>{row.assignedSegments}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <StyledFooter />
    </>
  );
};

PeopleTable.propTypes = {
  variant: PropTypes.string.isRequired,
};

export default PeopleTable;
