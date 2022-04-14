import { InfoIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Stack,
  Tooltip,
} from '@chakra-ui/react';
import { React, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import CollapsibleSection from '../CollapsibleSection/CollapsibleSection';
import options from './DropdownOptions';
import footNotes from './FootNotes';
import './GeneralListedInformation.css';

// component/section name not final
const GeneralListedInformation = () => {
  const { register, setValue, getValues } = useFormContext();
  const [meridiem, setMeridiem] = useState(getValues().meridiem || 'AM');

  useEffect(() => {
    setValue('meridiem', meridiem);
  }, [meridiem]);

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
    <CollapsibleSection title="General Information">
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
    </CollapsibleSection>
  );
};

export default GeneralListedInformation;
