import React from 'react';
import PropTypes from 'prop-types';
import { Tr, VStack, Text, Spinner } from '@chakra-ui/react';

const CommonLoadingRow = ({ colCount }) => {
  return (
    <Tr>
      <td colSpan={colCount}>
        <VStack justifyContent="center" alignContent="center" margin="50px">
          <Text fontWeight="bold">Loading</Text>
          <Spinner size="sm" />
        </VStack>
      </td>
    </Tr>
  );
};

const CommonRowFiller = ({ colCount, children }) => (
  <Tr>
    <td colSpan={colCount}>
      <VStack justifyContent="center" alignContent="center" margin="50px">
        {children}
      </VStack>
    </td>
  </Tr>
);

CommonLoadingRow.propTypes = {
  colCount: PropTypes.number.isRequired,
};

CommonRowFiller.propTypes = {
  colCount: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};

export { CommonLoadingRow, CommonRowFiller };
