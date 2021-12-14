import { React } from 'react';
import { Text, VStack, HStack, Input, Tooltip, Select, Heading } from '@chakra-ui/react';

function BandsSex() {
  const title = 'Bands & Sex';
  return (
    <VStack align="start" bgColor="teal" w="75%">
      <HStack spacing="2em">
        <Heading as="h5" size="md">
          {title}
        </Heading>
        <Tooltip label="info" fontSize="md">
          icon
        </Tooltip>
      </HStack>
      <HStack w="100%" align="center" justify="space-between" bgColor="palegreen">
        <Text marginTop="1.5em">Adult 1</Text>
        <VStack w="19%" align="start">
          <Text>Bands</Text>
          <Input defaultValue="xx:xx" />
        </VStack>
        <VStack w="19%" align="start">
          <Text>Sex</Text>
          <Select placeholder="Unknown">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </Select>
        </VStack>
        <VStack w="34%" bgColor="firebrick" align="start">
          <Text>Notes (Optional)</Text>
          <Input defaultValue="" />
        </VStack>
      </HStack>
    </VStack>
  );
}

export default BandsSex;
