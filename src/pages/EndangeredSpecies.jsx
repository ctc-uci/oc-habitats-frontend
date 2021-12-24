/* eslint-disable no-unused-vars */
import { React, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ArrowBackIcon } from '@chakra-ui/icons';
import {
  Container,
  Heading,
  Textarea,
  VStack,
  Stack,
  FormLabel,
  FormControl,
  Button,
  HStack,
  IconButton,
} from '@chakra-ui/react';

import SectionName from '../components/EndangeredSpecies/SectionName';
import Location from '../components/EndangeredSpecies/Location';
import BandsSex from '../components/EndangeredSpecies/BandsSex';
import BehaviorsList from '../components/EndangeredSpecies/BehaviorsList';
import footNotes from '../common/FootNotes';
import options from '../common/DropdownOptions';

function EndangeredSpecies({ adultName }) {
  const [totalAdults, setTotalAdults] = useState(1);
  const [totalFledges, setTotalFledges] = useState(0);
  const [totalChicks, setTotalChicks] = useState(0);

  function handleSubmit(event) {
    event.preventDefault();

    // console.log(event.target);
  }

  // TODO: Save all of the data w/ a button
  return (
    <>
      <HStack w="100%">
        <IconButton icon={<ArrowBackIcon />} bgColor="transparent" size="lg" left="1%" />
      </HStack>
      <Container maxW="container.xl">
        <Stack align="center" mb="3em">
          <Heading as="h1">Add Adult {adultName}</Heading>
        </Stack>
        <form onSubmit={handleSubmit}>
          <VStack align="start" spacing="4em">
            <SectionName
              setTotalAdults={setTotalAdults}
              setTotalFledges={setTotalFledges}
              setTotalChicks={setTotalChicks}
            />
            <Location totalBirds={totalAdults + totalFledges} />
            <BandsSex totalAdults={totalAdults} totalFledges={totalFledges} />
            <BehaviorsList
              title="Nesting & Eggs"
              description={footNotes.nest}
              options={options.nesting}
            />
            <BehaviorsList
              title="Behaviors Observed"
              description={footNotes.behavior}
              options={options.behavior}
            />
            <VStack align="start" w="100%">
              <Heading as="h5" size="md">
                Additional Notes (Optional)
              </Heading>
              <Textarea h="10em" placeholder="Type Here..." />
            </VStack>
          </VStack>
          {/* <Button mt={4} colorScheme="teal" type="submit">
          Submit
        </Button> */}
        </form>
      </Container>
    </>
  );
}

EndangeredSpecies.defaultProps = {
  adultName: PropTypes.string,
};

EndangeredSpecies.propTypes = {
  adultName: PropTypes.string,
};

export default EndangeredSpecies;
