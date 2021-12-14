/* eslint-disable no-unused-vars */
import { React } from 'react';
import {
  Container,
  Text,
  Stack,
  VStack,
  HStack,
  Input,
  Flex,
  Tooltip,
  Heading,
} from '@chakra-ui/react';

function Location() {
  return (
    <VStack>
      <Heading as="h5" size="md">
        Location
      </Heading>
      <HStack>
        <VStack>
          <Text>GPS</Text>
          <HStack>
            <Input defaultValue="000.00000" />
            <Input defaultValue="000.00000" />
          </HStack>
        </VStack>
      </HStack>
      <HStack>
        <VStack>
          <HStack>
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
