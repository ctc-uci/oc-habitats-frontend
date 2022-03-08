import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: 'Inter',
    body: 'Inter',
  },
  colors: {
    ochBlue: '#2BC0E3',
    ochGrey: '#4E4E4E',
    ochOrange: '#F49923',
    ochBlack: '#231F20',
  },
});

export default theme;
