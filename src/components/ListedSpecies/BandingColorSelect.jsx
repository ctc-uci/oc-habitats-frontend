import React, { useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import { BsFillCircleFill } from 'react-icons/bs';
import { useFormContext } from 'react-hook-form';
import { chakraComponents, Select } from 'chakra-react-select';
import { chakra } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import BandColors from '../../common/BandColors';

// setup custom rendering to show the band color in color select dropdown
/* eslint-disable react/prop-types, react/jsx-props-no-spreading */
const customComponents = {
  Option: ({ children, ...props }) => (
    <chakraComponents.Option {...props}>
      <chakra.span
        marginRight={2}
        borderWidth="1px"
        borderColor={props.data.value === 'W' ? 'gray.600' : props.data.realColor}
        borderRadius="3xl"
      >
        <IconContext.Provider value={{ color: props.data.realColor }}>
          <BsFillCircleFill />
        </IconContext.Provider>
      </chakra.span>{' '}
      {children}
    </chakraComponents.Option>
  ),
};
/* eslint-enable react/prop-types, react/jsx-props-no-spreading */

// component for selecting banding colors that handles custom rendering, storing just value in form context, and allowing multiple of any color
const BandingColorSelect = ({ name }) => {
  const { setValue, getValues } = useFormContext();

  const getSelectObject = colorId => {
    const option = BandColors[colorId];
    return {
      ...option,
      colorScheme: option.selectColor,
      realValue: option.value,
      // trick react-select into thinking nothing gets selected so we can have duplicate colors
      value: Math.random(),
    };
  };
  const mappedColorOptions = Object.keys(BandColors).map(getSelectObject);

  const defaultValue = (getValues(name) || []).map(getSelectObject);

  const [selectedColors, setSelectedColors] = useState(defaultValue || []);
  useEffect(() => {
    setValue(
      name,
      selectedColors.map(color => color.realValue),
    );
  }, [selectedColors]);

  return (
    <Select
      onChange={v => setSelectedColors(v)}
      isMulti
      options={mappedColorOptions}
      closeMenuOnSelect={false}
      components={customComponents}
      value={selectedColors}
    />
  );
};

BandingColorSelect.propTypes = {
  name: PropTypes.string.isRequired,
};

export default BandingColorSelect;
