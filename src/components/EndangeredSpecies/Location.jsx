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
import footNotes from '../../common/FootNotes';

function Location({ totalBirds }) {
  // console.log('Location');

  const createGPS = () => {
    if (totalBirds > 4) {
      return [...Array(4)].map((e, i) => {
        return (
          <GridItem rowStart={1} key={e}>
            <FormControl>
              <FormLabel htmlFor={`latitude ${i}`}>{i ? `GPS ${i + 1}` : 'GPS'}</FormLabel>
              <FormLabel htmlFor={`latitude ${i}`} />
              <HStack w="75%">
                <Input id={`latitude ${i}`} defaultValue="000.00000" />
                <Input id={`latitude ${i}`} defaultValue="000.00000" />
              </HStack>
            </FormControl>
          </GridItem>
        );
      });
    }

    return (
      <GridItem rowStart={1}>
        <FormControl>
          <FormLabel htmlFor="latitude">GPS</FormLabel>
          <FormLabel htmlFor="longitude" />
          <HStack w="75%">
            <Input id="latitude" defaultValue="000.00000" />
            <Input id="longitude" defaultValue="000.00000" />
          </HStack>
        </FormControl>
      </GridItem>
    );
  };

  return (
    <VStack w="100%" align="start" spacing="2em">
      <Heading selfAlign="flex-end" as="h3" size="md">
        Location
      </Heading>
      <Grid
        w="100%"
        h="25vh"
        templateColumns="repeat(4, 25%)"
        columnGap={0}
        templateRows="repeat(1, 1fr)"
        rowGap={0}
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
            <Input id="cross-street" defaultValue="Cross Street Names" />
          </FormControl>
        </GridItem>
      </Grid>
    </VStack>
  );
}

Location.defaultProps = {
  totalBirds: PropTypes.number,
};
Location.propTypes = {
  totalBirds: PropTypes.number,
};
export default Location;
