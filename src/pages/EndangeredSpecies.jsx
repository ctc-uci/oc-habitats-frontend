/* eslint-disable no-unused-vars */
import { React } from 'react';
import { Container, Heading, Text, Textarea, VStack } from '@chakra-ui/react';

import SectionName from '../components/EndangeredSpecies/SectionName';
import Location from '../components/EndangeredSpecies/Location';
import BandsSex from '../components/EndangeredSpecies/BandsSex';
import AttributeList from '../components/EndangeredSpecies/AttributeList';

function EndangeredSpecies() {
  return (
    <Container>
      <VStack>
        <Heading as="h1">Add Adult Snowy Plover</Heading>
        <SectionName />
        <Location />
        <BandsSex />
        <AttributeList title="Nesting & Eggs" />
        <AttributeList title="Observed Behaviors" />
        <VStack>
          <Heading as="h5" size="md">
            Additional Notes (Optional)
          </Heading>
          <Textarea placeholder="Type Here..." />
        </VStack>
      </VStack>
    </Container>
  );
}

export default EndangeredSpecies;
