/* eslint-disable react/jsx-key */
import React from 'react';
import PropTypes from 'prop-types';
import { Th, Tr, Flex } from '@chakra-ui/react';
import styles from './SectionTable.module.css';

const SectionTableHeader = ({ headerGroups, loading }) => {
  return headerGroups.map(headerGroup => (
    <Tr className={styles['table-head']} {...headerGroup.getHeaderGroupProps()}>
      {headerGroup.headers.map(column => (
        <Th color="white" bgColor="ochGrey">
          <Flex alignItems="center" textTransform="none">
            {loading ? <>&nbsp;</> : column.render('Header')}
          </Flex>
        </Th>
      ))}
    </Tr>
  ));
};

SectionTableHeader.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  headerGroups: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default SectionTableHeader;
