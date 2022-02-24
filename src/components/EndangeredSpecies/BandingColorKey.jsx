import { React } from 'react';
import { Box, HStack, VStack, Text } from '@chakra-ui/react';

const BandingColorKey = () => {
  const createRow = (colorName, colorCode) => {
    const bc = colorName === 'White (W)' ? 'gray.200' : colorCode;
    return (
      <HStack spacing={3}>
        <Text>{colorName}</Text>
        <Box borderRadius="md" bg={colorCode} borderWidth={1} borderColor={bc} px={7} h={5} />
      </HStack>
    );
  };

  return (
    <Box>
      <Box textAlign="end" w="max-content" position="absolute" marginTop="60px" right="60px">
        <Text as="b">Banding Color Key</Text>
        <VStack spacing={3} alignItems="end" pt={4}>
          {createRow('Aqua (A)', 'teal.200')}
          {createRow('Blue (B)', 'blue.400')}
          {createRow('Green (G)', 'green.500')}
          {createRow('Black (K)', 'black')}
          {createRow('Lime (L)', '#B7D368')}
          {createRow('Brown/Tan (N)', 'yellow.800')}
          {createRow('Orange (O)', 'orange.400')}
          {createRow('Pink (P)', 'pink.400')}
          {createRow('Red (R)', 'red.600')}
          {createRow('Silver (S)', 'gray.200')}
          {createRow('Violet (V)', 'purple.400')}
          {createRow('White (W)', 'white')}
          {createRow('Yellow (Y)', 'yellow.200')}
        </VStack>
      </Box>
    </Box>
  );
};

export default BandingColorKey;
