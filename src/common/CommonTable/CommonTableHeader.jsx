import React from 'react';
import PropTypes from 'prop-types';
import { Thead, Th, Tr } from '@chakra-ui/react';
import styles from './CommonTable.module.css';

const CommonTableHeader = ({ children, loading, headerStyle }) => {
  const styledHeaders = React.Children.map(children, child => {
    return React.cloneElement(child, headerStyle);
  });

  return (
    <Thead>
      {loading ? (
        <Tr className={styles['table-head']}>
          <Th {...headerStyle}>
            <>&nbsp;</>
          </Th>
          <Th {...headerStyle}>
            <>&nbsp;</>
          </Th>
        </Tr>
      ) : (
        <Tr className={styles['table-head']}>{styledHeaders}</Tr>
      )}
    </Thead>
  );
};

CommonTableHeader.defaultProps = {
  loading: false,
  headerStyle: {
    textTransform: 'none',
    bgColor: 'ochGrey',
    color: 'white',
  },
};

CommonTableHeader.propTypes = {
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool,
  headerStyle: PropTypes.objectOf(String),
};

export default CommonTableHeader;
