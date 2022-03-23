import { React } from 'react';
import PropTypes from 'prop-types';
import { InfoIcon } from '@chakra-ui/icons';
import {
  VStack,
  HStack,
  Input,
  Tooltip,
  Heading,
  FormControl,
  FormLabel,
  Flex,
  Grid,
  GridItem,
  Box,
} from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import footNotes from './FootNotes';

const Location = () => {
  const { register, watch } = useFormContext();

  const totalAdults = watch('totalAdults') || 0;
  const totalFledges = watch('totalFledges') || 0;
  const totalBirds = totalAdults + totalFledges;
  console.log(totalBirds);

  const createGPS = () => {
    if (totalBirds > 4) {
      return ['Top Left', 'Top Right', 'Bottom Left', 'Bottom Right'].map((position, i) => {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <GridItem key={`GPS${i}`}>
            <FormControl>
              <FormLabel>
                {`GPS (${position})`}
                <HStack w="100%">
                  <Input placeholder="000.00000 N" {...register(`gps[${i}].latitude`)} />
                  <Input placeholder="000.00000 W" {...register(`gps[${i}].longitude`)} />
                </HStack>
              </FormLabel>
            </FormControl>
          </GridItem>
        );
      });
    }

    return (
      <GridItem key="gps">
        <FormControl>
          <FormLabel htmlFor="latitude">GPS</FormLabel>
          <FormLabel htmlFor="longitude" />
          <HStack w="100%">
            <Input id="latitude 0" placeholder="000.00000" {...register('gps[0].latitude')} />
            <Input id="longitude 0" placeholder="000.00000" {...register('gps[0].longitude')} />
          </HStack>
        </FormControl>
      </GridItem>
    );
  };

  return (
    <VStack w="100%" align="start" spacing="2em" maxW="900px">
      <Heading as="h3" size="md">
        Location
      </Heading>

      <Grid templateColumns="repeat(2, 1fr)" w="100%" gap="4">
        {createGPS()}
        <GridItem colSpan="2">
          <FormControl>
            <FormLabel>
              <Flex justify="space-between" aling="center">
                Cross Street/Towers
                <Tooltip label={footNotes.streets} fontSize="md">
                  <InfoIcon />
                </Tooltip>
              </Flex>
              <Input placeholder="Cross Street Names" {...register('crossStreet')} />
            </FormLabel>
          </FormControl>
        </GridItem>
      </Grid>
    </VStack>
  );
};

Location.defaultProps = {
  totalBirds: PropTypes.number,
};

Location.propTypes = {
  totalBirds: PropTypes.number,
};
export default Location;
