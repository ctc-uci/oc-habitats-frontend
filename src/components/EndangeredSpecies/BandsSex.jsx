/* eslint-disable no-unused-vars */
import { React } from 'react';
import {
  Container,
  Text,
  Stack,
  VStack,
  HStack,
  Input,
  Tooltip,
  Select,
  Heading,
} from '@chakra-ui/react';

function BandsSex() {
  const title = 'Bands & Sex';
  return (
    <VStack>
      <HStack>
        <Heading as="h5" size="md">
          {title}
        </Heading>
        <Tooltip label="info" fontSize="md">
          icon
        </Tooltip>
      </HStack>
      <HStack>
        <Text>Adult 1</Text>
        <VStack>
          <Text>Bands</Text>
          <Input defaultValue="xx:xx" />
        </VStack>
        <VStack>
          <Text>Sex</Text>
          <Select placeholder="Unknown">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </Select>
        </VStack>
        <VStack>
          <Text>Notes (Optional)</Text>
          <Input defaultValue="" />
        </VStack>
      </HStack>
    </VStack>
  );
}

export default BandsSex;
