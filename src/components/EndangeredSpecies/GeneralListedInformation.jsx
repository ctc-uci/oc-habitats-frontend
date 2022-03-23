import { React, useState, useEffect } from 'react';
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
import { useFormContext } from 'react-hook-form';
import footNotes from './FootNotes';
import options from './DropdownOptions';
import './GeneralListedInformation.css';

// component/section name not final
const GeneralListedInformation = ({ speciesName }) => {
  const { register, setValue, getValues } = useFormContext();
  const [meridiem, setMeridiem] = useState(getValues().meridiem || 'AM');

  useEffect(() => {
    setValue('meridiem', meridiem);
  }, [meridiem]);

  console.log('values', getValues());
  console.log(register('totalAdults'));

  const toggleTime = () => {
    if (meridiem === 'AM') {
      setMeridiem('PM');
    } else {
      setMeridiem('AM');
    }
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
    <VStack w="100%" maxW="900px" align="start">
      <HStack>
        <Heading as="h3" size="md">
          General {speciesName} Information
        </Heading>
      </HStack>
      <br />

      <Stack direction={['column', 'row']} w="100%" spacing="2em">
        <FormControl>
          <FormLabel>
            # of Adults
            <NumberInput
              min={1}
              defaultValue={getValues().totalAdults}
              onChange={val => setValue('totalAdults', parseInt(val, 10))}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormLabel>
        </FormControl>

        <FormControl>
          <FormLabel>
            <Flex justify="space-between" align="center">
              # of Fledges
              <Tooltip label={footNotes.fledge} fontSize="md">
                <InfoIcon />
              </Tooltip>
            </Flex>
            <NumberInput
              min={0}
              onChange={val => setValue('totalFledges', parseInt(val, 10))}
              defaultValue={getValues().totalFledges}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormLabel>
        </FormControl>

        <FormControl>
          <FormLabel>
            # of Chicks
            <NumberInput
              min={0}
              onChange={val => setValue('totalChicks', parseInt(val, 10))}
              defaultValue={getValues().totalChicks}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormLabel>
        </FormControl>
      </Stack>

      <br />

      <Stack direction={['column', 'row']} w="100%" spacing="2em">
        <FormControl>
          <FormLabel>
            Time
            <InputGroup>
              <Input
                className="without-meridiem"
                defaultValue="07:00"
                type="time"
                {...register('time')}
              />
              <InputRightElement w="4.5rem">
                <Button
                  h="2rem"
                  w="3.9rem"
                  size="sm"
                  id="meridiem"
                  value={meridiem}
                  onClick={toggleTime}
                >
                  {meridiem}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormLabel>
        </FormControl>

        <FormControl>
          <FormLabel>
            Map #
            <Input disabled placeholder="None" {...register('map')} />
          </FormLabel>
        </FormControl>
        <FormControl>
          <FormLabel>
            <Flex justify="space-between" align="center">
              Habitat Decription
              <Tooltip label={footNotes.habitat} fontSize="md">
                <InfoIcon />
              </Tooltip>
            </Flex>
            <Select placeholder="None" {...register('habitat')}>
              {createOptions()}
            </Select>
          </FormLabel>
        </FormControl>
      </Stack>
    </VStack>
  );
};

GeneralListedInformation.propTypes = {
  speciesName: PropTypes.string.isRequired,
};

export default GeneralListedInformation;
