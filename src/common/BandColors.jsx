import React from 'react';
import { chakra } from '@chakra-ui/react';
import { IconContext } from 'react-icons';
import { BsFillCircleFill } from 'react-icons/bs';

const createColorOption = (label, value, selectColor, realColor) => ({
  label: `${label} (${value})`,
  value,
  selectColor,
  selectIcon: (
    <chakra.span
      marginRight={2}
      borderWidth="1px"
      borderColor={value === 'W' ? 'gray.600' : realColor}
      borderRadius="3xl"
    >
      <IconContext.Provider value={{ color: realColor }}>
        <BsFillCircleFill />
      </IconContext.Provider>
    </chakra.span>
  ),
  realColor,
});

const BandColors = [
  createColorOption('Aqua', 'A', 'teal', '#A2C1E3'),
  createColorOption('Blue', 'B', 'blue', '#315077'),
  createColorOption('Green', 'G', 'green', '#49AC54'),
  createColorOption('Black', 'K', 'blackAlpha', '#231F20'),
  createColorOption('Lime', 'L', 'whatsapp', '#C7DEB3'),
  createColorOption('Brown/Tan', 'N', 'yellow', '#C39721'),
  createColorOption('Orange', 'O', 'orange', '#F5BE2A'),
  createColorOption('Pink', 'P', 'pink', '#F49DFD'),
  createColorOption('Red', 'R', 'red', '#EB271C'),
  createColorOption('Silver', 'S', 'gray', '#E2E8F0'),
  createColorOption('Violet', 'V', 'purple', '#652BFC'),
  createColorOption('White', 'W', 'white', '#FFFFFF'),
  createColorOption('Yellow', 'Y', 'yellow', '#FDFD33'),
];

export default BandColors;
