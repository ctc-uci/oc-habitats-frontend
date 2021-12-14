import { React } from 'react';
import { Text, VStack, HStack, Input, Tooltip, Heading } from '@chakra-ui/react';

function Location() {
  return (
    <VStack w="40%" align="start" bgColor="yellow">
      <Heading as="h5" size="md">
        Location
      </Heading>
      <HStack bgColor="papayawhip">
        <VStack w="100%" align="start">
          <Text>GPS</Text>
          <HStack w="100%">
            <Input defaultValue="000.00000" />
            <Input defaultValue="000.00000" />
          </HStack>
        </VStack>
      </HStack>
      <HStack w="100%" bgColor="darkorchid">
        <VStack w="100%" align="start">
          <HStack w="100%" justify="space-between">
            <Text>Cross Street/Towers</Text>
            <Tooltip label="info" fontSize="md">
              icon
            </Tooltip>
          </HStack>
          <Input defaultValue="Cross Street Names" />
        </VStack>
      </HStack>
    </VStack>
  );
}

export default Location;
