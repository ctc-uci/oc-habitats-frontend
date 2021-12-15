/* eslint-disable no-unused-vars */
import { React, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Heading,
  Textarea,
  VStack,
  Stack,
  FormLabel,
  FormControl,
  Button,
} from '@chakra-ui/react';

import SectionName from '../components/EndangeredSpecies/SectionName';
import Location from '../components/EndangeredSpecies/Location';
import BandsSex from '../components/EndangeredSpecies/BandsSex';
import AttributeList from '../components/EndangeredSpecies/AttributeList';

function EndangeredSpecies({ adultName, childName }) {
  const [totalAdults, setTotalAdults] = useState(1);

  function handleSubmit(event) {
    event.preventDefault();
    // console.log(event.target);
  }

  // console.log('EdangeredSpecies');
  return (
    <Container maxW="container.xl">
      <Stack align="center">
        <Heading as="h1">Add Adult {adultName}</Heading>
      </Stack>
      <form onSubmit={handleSubmit}>
        <VStack align="start" spacing={4}>
          <SectionName childName={childName} setTotalAdults={setTotalAdults} />
          <Location />
          <BandsSex totalAdults={totalAdults} />
          <AttributeList title="Nesting & Eggs" />
          <AttributeList title="Behaviors Observed" />
          <VStack align="start" w="100%">
            <Heading as="h5" size="md">
              Additional Notes (Optional)
            </Heading>
            <Textarea h="10em" placeholder="Type Here..." />
          </VStack>
        </VStack>
        <Button mt={4} colorScheme="teal" type="submit">
          Submit
        </Button>
      </form>
    </Container>
  );
}

EndangeredSpecies.defaultProps = {
  childName: PropTypes.string,
  adultName: PropTypes.string,
};

EndangeredSpecies.propTypes = {
  childName: PropTypes.string,
  adultName: PropTypes.string,
};

export default EndangeredSpecies;
