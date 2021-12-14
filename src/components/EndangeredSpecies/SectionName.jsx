/* eslint-disable no-unused-vars */
import { React } from 'react';
import {
  Container,
  Text,
  Stack,
  VStack,
  HStack,
  Input,
  Button,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Flex,
  Select,
  Tooltip,
  Heading,
} from '@chakra-ui/react';
// component/section name not final
function SectionName() {
  return (
    <>
      <VStack>
        <Heading as="h5" size="md">
          Section Name
        </Heading>

        <HStack>
          <VStack>
            <Text># of Adults</Text>
            <NumberInput defaultValue={1} min={1}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </VStack>
          <VStack>
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
          <VStack>
            <Text># of Chicks</Text>
            <NumberInput defaultValue={0} min={0}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </VStack>
        </HStack>
        <VStack>
          <HStack>
            <VStack>
              <Text>Time</Text>
              <Input defaultValue="07:00" />
            </VStack>
            <VStack>
              <Text>Map #</Text>
              <Input defaultValue="None" />
            </VStack>
            <VStack>
              <HStack>
                <Text>Habitat Description</Text>
                <Tooltip label="info" fontSize="md">
                  icon
                </Tooltip>
              </HStack>
              <Select placeholder="None">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
            </VStack>
          </HStack>
        </VStack>
      </VStack>
    </>
  );
}

export default SectionName;
