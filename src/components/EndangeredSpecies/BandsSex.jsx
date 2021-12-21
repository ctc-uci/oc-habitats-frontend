import { React } from 'react';
import PropTypes from 'prop-types';
import { InfoIcon } from '@chakra-ui/icons';
import {
  Text,
  VStack,
  HStack,
  Input,
  Tooltip,
  Select,
  Heading,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import footNotes from './FootNotes';

// eslint-disable-next-line no-unused-vars
function BandsSex({ totalAdults }) {
  const title = 'Bands & Sex';

  // console.log('BandsSex');
  const adultRows = () => {
    return [...Array(totalAdults)].map((e, i) => {
      return (
        // eslint-disable-next-line react/no-array-index-key
        <HStack key={i} w="100%" justify="space-between">
          <Text marginTop="1.5em">Adult {i + 1}</Text>

          <FormControl w="19%">
            <FormLabel htmlFor={`band${i}`}>Bands</FormLabel>
            <Input id={`band${i}`} defaultValue="xx:xx" />
          </FormControl>

          <FormControl w="19%">
            <FormLabel htmlFor={`sex${i}`}>Sex</FormLabel>
            <Select id={`sex${i}`} placeholder="Unknown">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </Select>
          </FormControl>

          <FormControl w="34%">
            <FormLabel htmlFor={`note${i}`}>Notes (Optional)</FormLabel>
            <Input id={`note${i}`} defaultValue="" />
          </FormControl>
        </HStack>
      );
    });
  };

  return (
    <VStack align="start" w="75%">
      <HStack spacing="2em" align="center">
        <Heading as="h5" size="md">
          {title}
        </Heading>
        <Tooltip label={footNotes.banding} fontSize="md">
          <InfoIcon />
        </Tooltip>
      </HStack>
      <VStack w="100%">{adultRows()}</VStack>
    </VStack>
  );
}

BandsSex.defaultProps = {
  totalAdults: PropTypes.number,
};
BandsSex.propTypes = {
  totalAdults: PropTypes.number,
};

export default BandsSex;
