import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

const DropdownSearch = ({ options, value, handleSelectedValue }) => (
  <Select
    placeholder="Enter species name..."
    options={options}
    onChange={handleSelectedValue}
    isClearable
    value={value ? { value, label: value } : { value: null, label: null }}
  />
);

DropdownSearch.defaultProps = {
  handleSelectedValue: PropTypes.func,
  value: PropTypes.string,
};

DropdownSearch.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  handleSelectedValue: PropTypes.func,
  value: PropTypes.string,
};

export default DropdownSearch;
