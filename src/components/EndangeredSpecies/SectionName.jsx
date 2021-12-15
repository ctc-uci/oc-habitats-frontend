import { React } from 'react';
import PropTypes from 'prop-types';
import {
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
  FormLabel,
  FormControl,
  Flex,
} from '@chakra-ui/react';
// component/section name not final
function SectionName({ childName, setTotalAdults }) {
  // console.log('ChildName: ', childName);
  return (
    <VStack w="60%" align="start">
      <HStack>
        <Heading as="h5" size="md">
          Section Name
        </Heading>
      </HStack>
      <Stack direction={['column', 'row']} w="100%">
        <FormControl>
          <FormLabel htmlFor="adult"># of Adults</FormLabel>
          <NumberInput
            id="adult"
            onChange={e => {
              setTotalAdults(parseInt(e, 10));
            }}
            defaultValue={1}
            min={1}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="children">
            <Flex justify="space-between">
              # of {childName}
              <Tooltip label="info" fontSize="md">
                icon
              </Tooltip>
            </Flex>
          </FormLabel>
          <NumberInput id="children" defaultValue={0} min={0}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="chicks"># of Chicks</FormLabel>
          <NumberInput id="chicks" defaultValue={0} min={0}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
      </Stack>

      <Stack direction={['column', 'row']} w="100%">
        <FormControl>
          <FormLabel htmlFor="time">Time</FormLabel>
          <Input id="time" defaultValue="07:00" />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="map">Map #</FormLabel>
          <Input id="map" defaultValue="None" />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="habitat">
            <Flex justify="space-between">
              Habitat Decription
              <Tooltip label="info" fontSize="md">
                icon
              </Tooltip>
            </Flex>
          </FormLabel>
          <Select id="habitat" placeholder="None">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
        </FormControl>
      </Stack>
    </VStack>
  );
}

SectionName.defaultProps = {
  childName: PropTypes.string,
  setTotalAdults: PropTypes.func,
};

SectionName.propTypes = {
  childName: PropTypes.string,
  setTotalAdults: PropTypes.func,
};

export default SectionName;
