import { React } from 'react';
import {
  VStack,
  HStack,
  Input,
  Tooltip,
  Heading,
  FormControl,
  FormLabel,
  Flex,
} from '@chakra-ui/react';

function Location() {
  // console.log('Location');
  return (
    <VStack w="40%" align="start">
      <Heading as="h5" size="md">
        Location
      </Heading>

      <HStack>
        <FormControl>
          <FormLabel htmlFor="latitude">GPS</FormLabel>
          <FormLabel htmlFor="longitude" />
          <HStack w="75%">
            <Input id="latitude" defaultValue="000.00000" />
            <Input id="longitude" defaultValue="000.00000" />
          </HStack>
        </FormControl>
      </HStack>

      <HStack w="100%">
        <FormControl>
          <FormLabel htmlFor="cross-street">
            <Flex justify="space-between">
              Cross Street/Towers
              <Tooltip label="info" fontSize="md">
                icon
              </Tooltip>
            </Flex>
          </FormLabel>
          <Input id="cross-street" defaultValue="Cross Street Names" />
        </FormControl>
      </HStack>
    </VStack>
  );
}

export default Location;
