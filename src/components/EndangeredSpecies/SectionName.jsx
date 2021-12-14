import { React } from 'react';
import {
  Text,
  Stack,
  VStack,
  HStack,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  Tooltip,
  Heading,
} from '@chakra-ui/react';
// component/section name not final
function SectionName() {
  return (
    <VStack w="60%" align="start" bgColor="red">
      <HStack>
        <Heading as="h5" size="md">
          Section Name
        </Heading>
      </HStack>
      <Stack direction={['column', 'row']} w="100%" align="start" bgColor="blue">
        <VStack align="start">
          <Text># of Adults</Text>
          <NumberInput defaultValue={1} min={1}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </VStack>
        <VStack align="start">
          <HStack>
            <Text># of Fledges</Text>
            <Tooltip label="info" fontSize="md">
              icon
            </Tooltip>
          </HStack>
          <NumberInput defaultValue={0} min={0}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </VStack>
        <VStack align="start">
          <Text># of Chicks</Text>
          <NumberInput defaultValue={0} min={0}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </VStack>
      </Stack>

      <Stack direction={['column', 'row']} w="100%" justify="space-between" bgColor="purple">
        <VStack align="start">
          <Text>Time</Text>
          <Input defaultValue="07:00" />
        </VStack>
        <VStack align="start">
          <Text>Map #</Text>
          <Input defaultValue="None" />
        </VStack>
        <VStack align="start">
          <HStack>
            <Text>Habitat Description</Text>
            <Tooltip label="info">icon</Tooltip>
          </HStack>
          <Select placeholder="None">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
        </VStack>
      </Stack>
    </VStack>
  );
}

export default SectionName;
