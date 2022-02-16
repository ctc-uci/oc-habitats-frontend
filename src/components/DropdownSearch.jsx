import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

const DropdownSearch = ({ options, highlightSearch }) => (
  <Select options={options} onChange={highlightSearch} isClearable />
);

DropdownSearch.defaultProps = {
  highlightSearch: PropTypes.func,
};

DropdownSearch.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  highlightSearch: PropTypes.func,
};

export default DropdownSearch;
