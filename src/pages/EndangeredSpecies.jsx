import { React } from 'react';
import { Container, Heading, Textarea, VStack, Stack } from '@chakra-ui/react';

import SectionName from '../components/EndangeredSpecies/SectionName';
import Location from '../components/EndangeredSpecies/Location';
import BandsSex from '../components/EndangeredSpecies/BandsSex';
import AttributeList from '../components/EndangeredSpecies/AttributeList';

function EndangeredSpecies() {
  return (
    <Container maxW="container.xl">
      <Stack align="center">
        <Heading as="h1">Add Adult Snowy Plover</Heading>
      </Stack>
      <VStack align="start" bgColor="olive" spacing={4}>
        <SectionName />
        <Location />
        <BandsSex />
        <AttributeList title="Nesting & Eggs" />
        <AttributeList title="Behaviors Observed" />
        <VStack align="start" bgColor="seashell" w="100%">
          <Heading as="h5" size="md">
            Additional Notes (Optional)
          </Heading>
          <Textarea h="10em" placeholder="Type Here..." />
        </VStack>
      </VStack>
    </Container>
  );
}

export default EndangeredSpecies;
