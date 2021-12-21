import { React } from 'react';
import { InfoIcon } from '@chakra-ui/icons';
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
import footNotes from './FootNotes';

function Location() {
  // console.log('Location');
  return (
    <VStack w="40%" align="start">
      <Heading as="h3" size="md">
        Location
      </Heading>
      <br />
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
      <br />
      <HStack w="100%">
        <FormControl>
          <FormLabel htmlFor="cross-street">
            <Flex justify="space-between" aling="center">
              Cross Street/Towers
              <Tooltip label={footNotes.streets} fontSize="md">
                <InfoIcon />
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
