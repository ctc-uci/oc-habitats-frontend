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
} from '@chakra-ui/react';
import footNotes from './FootNotes';

const Location = ({ totalBirds }) => {
  const createGPS = () => {
    if (totalBirds > 4) {
      return [...Array(4)].map((element, i) => {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <GridItem rowStart={1} key={`GPS${i}`}>
            <FormControl>
              <FormLabel htmlFor={`latitude ${i}`}>{i ? `GPS ${i + 1}` : 'GPS'}</FormLabel>
              <HStack w="90%">
                <Input id={`latitude ${i}`} placeholder="000.00000" />
                <Input id={`longitude ${i}`} placeholder="000.00000" />
              </HStack>
            </FormControl>
          </GridItem>
        );
      });
    }

    return (
      <GridItem rowStart={1} key="gps">
        <FormControl>
          <FormLabel htmlFor="latitude">GPS</FormLabel>
          <FormLabel htmlFor="longitude" />
          <HStack w="90%">
            <Input id="latitude 0" placeholder="000.00000" />
            <Input id="longitude 0" placeholder="000.00000" />
          </HStack>
        </FormControl>
      </GridItem>
    );
  };

  return (
    <VStack w="100%" align="start" spacing="2em">
      <Heading as="h3" size="md">
        Location
      </Heading>
      <Grid
        w="100%"
        h="20vh"
        templateColumns="repeat(4, 25%)"
        templateRows="repeat(1, 1fr)"
        rowGap={6}
      >
        {createGPS()}
        <GridItem rowStart={2}>
          <FormControl>
            <FormLabel htmlFor="cross-street">
              <Flex justify="space-between" aling="center">
                Cross Street/Towers
                <Tooltip label={footNotes.streets} fontSize="md">
                  <InfoIcon />
                </Tooltip>
              </Flex>
            </FormLabel>
            <Input id="cross-street" placeholder="Cross Street Names" />
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
