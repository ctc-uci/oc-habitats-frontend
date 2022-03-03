import React, { useState } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

const DropdownSearch = ({ options, value, handleSelectedValue }) => {
  const [selected, setSelected] = useState(value);

  const getSelected = e => {
    if (e) {
      setSelected(e.value);
      handleSelectedValue(e.value);
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
      value={{ value, label: selected }}
      isClearable
    />
  );
};

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
