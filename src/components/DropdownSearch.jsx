import React, { useState } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

const DropdownSearch = ({ options, value, handleSelectedValue }) => {
  const [selected, setSelected] = useState(value);

  const getSelected = e => {
    if (e) {
      setSelected(e);
      handleSelectedValue(e);
    } else {
      setSelected(null);
      handleSelectedValue(null);
    }
  };

  return (
    <Select
      placeholder="Enter species name..."
      options={options}
      onChange={getSelected}
      value={selected}
      isClearable
    />
  );
};

DropdownSearch.defaultProps = {
  value: null,
};

DropdownSearch.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  handleSelectedValue: PropTypes.func.isRequired,
  value: PropTypes.string,
};

export default DropdownSearch;
