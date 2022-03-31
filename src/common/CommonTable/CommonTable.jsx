import React from 'react';
import PropTypes from 'prop-types';
import { Table } from '@chakra-ui/react';

const CommonTable = ({ variant, children }) => {
  return <Table variant={variant}>{children}</Table>;
};

CommonTable.defaultProps = {
  variant: 'striped',
};

CommonTable.propTypes = {
  variant: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default CommonTable;
