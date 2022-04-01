import React from 'react';
import PropTypes from 'prop-types';
import { Thead, Tfoot, Th, Tr } from '@chakra-ui/react';
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

const CommonTableFooter = ({ children, loading, footerStyle }) => {
  const styledFooters = React.Children.map(children, child => {
    return React.cloneElement(child, footerStyle);
  });

  return (
    <Tfoot>
      {loading ? (
        <Tr className={styles['table-foot']}>
          <Th {...footerStyle}>
            <>&nbsp;</>
          </Th>
          <Th {...footerStyle}>
            <>&nbsp;</>
          </Th>
        </Tr>
      ) : (
        <Tr className={styles['table-foot']}>{styledFooters}</Tr>
      )}
    </Tfoot>
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

CommonTableFooter.defaultProps = {
  loading: false,
  footerStyle: {
    textTransform: 'none',
    bgColor: 'ochGrey',
    color: 'white',
  },
};

CommonTableFooter.propTypes = {
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool,
  footerStyle: PropTypes.objectOf(String),
};

export { CommonTableHeader, CommonTableFooter };
