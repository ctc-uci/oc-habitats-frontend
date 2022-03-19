import React from 'react';
import PropTypes from 'prop-types';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

const PeopleTable = ({ variant }) => {
  return (
    <>
      <p>Variant: {variant}</p>
      <Table>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Last Updated</Th>
            <Th>Assigned Segment(s)</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Person A</Td>
            <Td>01-20-2022</Td>
            <Td>OC17</Td>
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
