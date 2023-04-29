import React from 'react';
import PropTypes from 'prop-types';
import { Th, Tr, Flex } from '@chakra-ui/react';
import styles from './SectionTable.module.css';

const SectionTableHeader = ({ headerGroups, loading }) => {
  return headerGroups.map((headerGroup, index) => (
    <Tr className={styles['table-head']} {...headerGroup.getHeaderGroupProps()} key={index}>
      {headerGroup.headers.map(column => (
        <Th color="white" bgColor="ochGrey" key={`column_${column.id}`}>
          <Flex alignItems="center" textTransform="none">
            {loading ? <>&nbsp;</> : column.render('Header')}
          </Flex>
        </Th>
      ))}
    </Tr>
  ));
};

SectionTableHeader.propTypes = {
  headerGroups: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default SectionTableHeader;
