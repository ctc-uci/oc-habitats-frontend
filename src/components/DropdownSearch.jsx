import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

const DropdownSearch = ({ options }) => <Select options={options} isClearable />;

DropdownSearch.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default DropdownSearch;
