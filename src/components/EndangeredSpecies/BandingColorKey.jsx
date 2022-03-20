import { React } from 'react';
import { Box, HStack, VStack, Text } from '@chakra-ui/react';
import BandColors from '../../common/BandColors';

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
          {BandColors.map(color => createRow(color.label, color.realColor))}
        </VStack>
      </Box>
    </Box>
  );
};

export default BandingColorKey;
