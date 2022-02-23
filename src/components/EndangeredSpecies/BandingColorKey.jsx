import { React } from 'react';
import { Box, HStack, VStack, Text } from '@chakra-ui/react';

const BandingColorKey = () => {
  const createRow = (colorName, colorCode) => {
    return (
      <HStack spacing={3}>
        <Text>{colorName}</Text>
        <Box borderRadius="md" bg={colorCode} px={7} h={5} />
      </HStack>
    );
  };

  return (
    <Box textAlign="end" w="max-content">
      <Text as="b">Banding Color Key</Text>
      <VStack>{createRow('Aqua (A)', 'teal.200')}</VStack>
    </Box>
  );
};

export default BandingColorKey;
