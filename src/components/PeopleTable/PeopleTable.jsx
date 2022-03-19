import React from 'react';
import PropTypes from 'prop-types';
import { Table, Thead, Tbody, Tr, Th, Td, Flex } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import styles from './PeopleTable.module.css';

const headerData = [
  { headerText: 'Name' },
  { headerText: 'Last Updated' },
  { headerText: 'Assigned Segment(s)' },
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

const PeopleTable = ({ variant }) => {
  return (
    <>
      <p>Variant: {variant}</p>
      <Table variant="striped">
        <Thead>
          <StyledHeader />
        </Thead>
        <Tbody>
          <Tr>
            <Td>Person A</Td>
            <Td>01-20-2022</Td>
            <Td>OC01</Td>
          </Tr>
          <Tr>
            <Td>Person B</Td>
            <Td>01-20-2022</Td>
            <Td>OC02</Td>
          </Tr>
        </Tbody>
      </Table>
    </>
  );
};

PeopleTable.propTypes = {
  variant: PropTypes.string.isRequired,
};

export default PeopleTable;
