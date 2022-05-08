const BandColors = {};

const addColorOption = (label, value, selectColor, realColor) => {
  BandColors[value] = {
    label: `${label} (${value})`,
    value,
    selectColor,
    realColor,
  };
};

addColorOption('Aqua', 'A', 'teal', '#A2C1E3');
addColorOption('Blue', 'B', 'blue', '#315077');
addColorOption('Green', 'G', 'green', '#49AC54');
addColorOption('Black', 'K', 'blackAlpha', '#231F20');
addColorOption('Lime', 'L', 'whatsapp', '#C7DEB3');
addColorOption('Brown/Tan', 'N', 'yellow', '#C39721');
addColorOption('Orange', 'O', 'orange', '#F5BE2A');
addColorOption('Pink', 'P', 'pink', '#F49DFD');
addColorOption('Red', 'R', 'red', '#EB271C');
addColorOption('Silver', 'S', 'gray', '#E2E8F0');
addColorOption('Violet', 'V', 'purple', '#652BFC');
addColorOption('White', 'W', 'white', '#FFFFFF');
addColorOption('Yellow', 'Y', 'yellow', '#FDFD33');

export default BandColors;
