import PropTypes from 'prop-types';
import React from 'react';
import { Select } from 'chakra-react-select';
import { Controller, useFormContext } from 'react-hook-form';

/* wrapper component that makes it easier to store just a value in the form context rather than the value + label object */
const ReactHookFormSelect = props => {
  const { control, getValues } = useFormContext();
  const { name, options, optionKey, isMulti } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, ref } }) => (
        <Select
          inputRef={ref}
          options={options}
          onBlur={onBlur}
          onChange={isMulti ? val => onChange(val.map(v => v.value)) : v => onChange(v.value)}
          value={
            isMulti
              ? options.filter(o => (getValues(name) || []).includes(o[optionKey]))
              : options.find(o => o[optionKey] === getValues(name))
          }
          {...props}
        />
      )}
    />
  );
};

ReactHookFormSelect.defaultProps = {
  isMulti: false,
};

ReactHookFormSelect.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    }),
  ).isRequired,
  optionKey: PropTypes.string.isRequired,
  isMulti: PropTypes.bool,
};

export default ReactHookFormSelect;
