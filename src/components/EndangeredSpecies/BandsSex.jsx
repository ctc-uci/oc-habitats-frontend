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
import footNotes from '../../common/FootNotes';

// eslint-disable-next-line no-unused-vars
function BandsSex({ totalAdults, totalFledges }) {
  const title = 'Bands & Sex';

  // console.log('BandsSex');
  const addRows = (amount, type) => {
    return [...Array(amount)].map((e, i) => {
      return (
        // eslint-disable-next-line react/no-array-index-key
        <HStack key={i} w="100%" spacing={12}>
          <Text fontWeight={500} w="10%" marginTop="1.5em">{`${type} ${i + 1}`}</Text>

          <FormControl w="22%">
            <FormLabel htmlFor={`band${i}`}>Bands</FormLabel>
            <Input id={`band${i}`} defaultValue="xx:xx" />
          </FormControl>

          <FormControl w="22%">
            <FormLabel htmlFor={`sex${i}`}>Sex</FormLabel>
            <Select id={`sex${i}`} placeholder="Unknown">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </Select>
          </FormControl>

          <FormControl w="37%">
            <FormLabel htmlFor={`note${i}`}>Notes (Optional)</FormLabel>
            <Input id={`note${i}`} defaultValue="" />
          </FormControl>
        </HStack>
      );
    });
  };

  return (
    <VStack align="start" w="80%" spacing="1.5em">
      <HStack spacing="2em" align="center">
        <Heading as="h5" size="md">
          {title}
        </Heading>
        <Tooltip label={footNotes.banding} fontSize="md">
          <InfoIcon boxSize={5} />
        </Tooltip>
      </HStack>
      <>
        <VStack spacing="1em" w="100%">
          {addRows(totalAdults, 'Adult')}
        </VStack>
        {totalFledges ? (
          <VStack spacing="1em" w="100%">
            {addRows(totalFledges, 'Fledge')}
          </VStack>
        ) : (
          <></>
        )}
      </>
    </VStack>
  );
}

BandsSex.defaultProps = {
  totalAdults: PropTypes.number,
  totalFledges: PropTypes.number,
};
BandsSex.propTypes = {
  totalAdults: PropTypes.number,
  totalFledges: PropTypes.number,
};

export default BandsSex;
