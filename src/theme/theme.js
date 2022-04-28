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
    ochRed: '#C53030',
    ochLightGrey: '#EDF2F7',
    ochBluePress: '#156071',
  },
  components: {
    Badge: {
      variants: {
        capitalize: props => ({
          ...theme.components.Badge.variants.solid(props),
          textTransform: 'capitalize',
          width: 'min-content',
        }),
      },
    },
    Button: {
      variants: {
        solidNoHover: props => ({
          ...theme.components.Button.variants.solid(props),
          _hover: {},
          _active: {},
        }),
      },
    },
    IconButton: {
      variants: {
        noHover: {
          _hover: {},
          _active: {},
        },
      },
    },
  },
});

export default theme;
