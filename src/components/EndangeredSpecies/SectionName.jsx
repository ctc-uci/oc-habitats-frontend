import { React, useState } from 'react';
import PropTypes from 'prop-types';
import { InfoIcon } from '@chakra-ui/icons';
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
  InputGroup,
  InputRightElement,
  Button,
} from '@chakra-ui/react';
import footNotes from '../../common/FootNotes';
import options from '../../common/DropdownOptions';

// component/section name not final
function SectionName({ setTotalAdults, setTotalFledges, setTotalChicks }) {
  const [isAM, setIsAM] = useState(true);

  const handleTime = () => {
    setIsAM(!isAM);
  };

  const createOptions = () => {
    return options.habitat.map(option => {
      return (
        <option key={option} value={option}>
          {option}
        </option>
      );
    });
  };

  return (
    <VStack w="70%" align="start">
      <HStack>
        <Heading as="h4" size="md" fontWeight={600}>
          Section Name
        </Heading>
      </HStack>
      <br />

      <Stack direction={['column', 'row']} w="100%" spacing="5em">
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
            <Flex justify="space-between" align="center">
              # of Fledges
              <Tooltip label={footNotes.fledge} fontSize="md">
                <InfoIcon />
              </Tooltip>
            </Flex>
          </FormLabel>
          <NumberInput
            id="children"
            onChange={e => {
              setTotalFledges(parseInt(e, 10));
            }}
            defaultValue={0}
            min={0}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="chicks"># of Chicks</FormLabel>
          <NumberInput
            id="chicks "
            onChange={e => {
              setTotalChicks(parseInt(e, 10));
            }}
            defaultValue={0}
            min={0}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
      </Stack>

      <br />

      <Stack direction={['column', 'row']} w="100%" spacing="5em">
        <FormControl>
          <FormLabel htmlFor="time">Time</FormLabel>
          <InputGroup>
            <Input id="time" defaultValue="07:00" />
            <InputRightElement w="4.5rem">
              <Button h="2rem" w="3.9rem" size="sm" onClick={handleTime}>
                {isAM ? 'AM' : 'PM'}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="map">Map #</FormLabel>
          <Input id="map" defaultValue="None" />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="habitat">
            <Flex justify="space-between" align="center">
              Habitat Decription
              <Tooltip label={footNotes.habitat} fontSize="md">
                <InfoIcon />
              </Tooltip>
            </Flex>
          </FormLabel>
          <Select id="habitat" placeholder="None">
            {createOptions()}
          </Select>
        </FormControl>
      </Stack>
    </VStack>
  );
}

SectionName.defaultProps = {
  setTotalAdults: PropTypes.func,
  setTotalFledges: PropTypes.func,
  setTotalChicks: PropTypes.func,
};

SectionName.propTypes = {
  setTotalAdults: PropTypes.func,
  setTotalFledges: PropTypes.func,
  setTotalChicks: PropTypes.func,
};

export default SectionName;
